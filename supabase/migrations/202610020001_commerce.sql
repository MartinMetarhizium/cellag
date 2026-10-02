create extension if not exists pgcrypto;

create type public.order_status as enum ('pending','confirmed','cancelled','refunded');
create type public.payment_status as enum ('pending','paid','cancelled','refunded');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  first_name text not null,
  last_name text not null,
  country text not null,
  role text not null default 'customer' check (role in ('customer','admin')),
  terms_accepted_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create table public.products (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  description text not null,
  image_url text,
  price numeric(12,2) not null check (price >= 0),
  currency text not null check (char_length(currency) = 3),
  active boolean not null default false,
  product_type text not null,
  includes_text text,
  terms_text text,
  access_key text unique,
  created_at timestamptz not null default now()
);

create table public.carts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  status text not null default 'active' check (status in ('active','converted','abandoned')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create unique index one_active_cart_per_user on public.carts(user_id) where status = 'active';

create table public.cart_items (
  id uuid primary key default gen_random_uuid(),
  cart_id uuid not null references public.carts(id) on delete cascade,
  product_id uuid not null references public.products(id),
  quantity integer not null default 1 check (quantity > 0),
  unique(cart_id, product_id)
);

create table public.orders (
  id uuid primary key default gen_random_uuid(),
  order_number text unique not null default ('CAPA-' || upper(substr(replace(gen_random_uuid()::text,'-',''),1,10))),
  user_id uuid not null references public.profiles(id),
  buyer_first_name text not null,
  buyer_last_name text not null,
  buyer_email text not null,
  currency text not null,
  subtotal numeric(12,2) not null,
  total numeric(12,2) not null,
  status public.order_status not null default 'pending',
  payment_status public.payment_status not null default 'pending',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id uuid references public.products(id),
  product_name text not null,
  product_type text not null,
  quantity integer not null check (quantity > 0),
  unit_price numeric(12,2) not null,
  line_total numeric(12,2) not null,
  currency text not null
);

create table public.payments (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  provider text not null,
  provider_transaction_id text unique,
  status public.payment_status not null default 'pending',
  amount numeric(12,2) not null,
  currency text not null,
  provider_payload jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.entitlements (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  product_id uuid not null references public.products(id),
  order_id uuid not null references public.orders(id),
  access_key text not null,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  unique(user_id, product_id, order_id)
);

create or replace function public.handle_new_user() returns trigger language plpgsql security definer set search_path = public as $$
begin
  if coalesce(new.raw_user_meta_data->>'first_name','') = '' or coalesce(new.raw_user_meta_data->>'last_name','') = '' or coalesce(new.raw_user_meta_data->>'country','') = '' or coalesce((new.raw_user_meta_data->>'terms_accepted')::boolean,false) is not true then
    raise exception 'Datos de registro incompletos o términos no aceptados';
  end if;
  insert into public.profiles(id, first_name, last_name, country)
  values(new.id, coalesce(new.raw_user_meta_data->>'first_name',''), coalesce(new.raw_user_meta_data->>'last_name',''), coalesce(new.raw_user_meta_data->>'country',''));
  return new;
end $$;
create trigger on_auth_user_created after insert on auth.users for each row execute procedure public.handle_new_user();

create or replace function public.is_admin() returns boolean language sql stable security definer set search_path = public as $$
  select exists(select 1 from profiles where id = auth.uid() and role = 'admin');
$$;

create or replace function public.create_order_from_active_cart() returns jsonb language plpgsql security definer set search_path = public as $$
declare v_cart carts; v_profile profiles; v_email text; v_order orders; v_currency text; v_total numeric(12,2);
begin
  select * into v_cart from carts where user_id = auth.uid() and status = 'active' for update;
  if v_cart.id is null then raise exception 'No hay un carrito activo'; end if;
  if not exists(select 1 from cart_items where cart_id = v_cart.id) then raise exception 'El carrito está vacío'; end if;
  if exists(select 1 from cart_items ci join products p on p.id=ci.product_id where ci.cart_id=v_cart.id and not p.active) then raise exception 'El carrito contiene productos no disponibles'; end if;
  select p.currency, sum(p.price * ci.quantity) into v_currency, v_total from cart_items ci join products p on p.id=ci.product_id where ci.cart_id=v_cart.id group by p.currency;
  if (select count(distinct p.currency) from cart_items ci join products p on p.id=ci.product_id where ci.cart_id=v_cart.id) <> 1 then raise exception 'La orden debe utilizar una sola moneda'; end if;
  select * into v_profile from profiles where id=auth.uid(); select email into v_email from auth.users where id=auth.uid();
  insert into orders(user_id,buyer_first_name,buyer_last_name,buyer_email,currency,subtotal,total) values(auth.uid(),v_profile.first_name,v_profile.last_name,v_email,v_currency,v_total,v_total) returning * into v_order;
  insert into order_items(order_id,product_id,product_name,product_type,quantity,unit_price,line_total,currency)
    select v_order.id,p.id,p.name,p.product_type,ci.quantity,p.price,p.price*ci.quantity,p.currency from cart_items ci join products p on p.id=ci.product_id where ci.cart_id=v_cart.id;
  update carts set status='converted',updated_at=now() where id=v_cart.id;
  return jsonb_build_object('id',v_order.id,'order_number',v_order.order_number,'payment_status',v_order.payment_status);
end $$;

create or replace view public.admin_orders with (security_invoker=true) as
select o.id,o.order_number,(o.buyer_first_name||' '||o.buyer_last_name) buyer_name,o.buyer_email,string_agg(oi.product_name,', ') products,o.created_at,o.total,o.currency,o.payment_status
from orders o join order_items oi on oi.order_id=o.id group by o.id;

alter table profiles enable row level security; alter table products enable row level security; alter table carts enable row level security; alter table cart_items enable row level security; alter table orders enable row level security; alter table order_items enable row level security; alter table payments enable row level security; alter table entitlements enable row level security;
create policy "profile own read" on profiles for select using (id=auth.uid() or is_admin());
create policy "active products public" on products for select using (active or is_admin());
create policy "admins manage products" on products for all using (is_admin()) with check (is_admin());
create policy "own carts" on carts for all using (user_id=auth.uid()) with check (user_id=auth.uid());
create policy "own cart items" on cart_items for all using (exists(select 1 from carts c where c.id=cart_id and c.user_id=auth.uid())) with check (exists(select 1 from carts c where c.id=cart_id and c.user_id=auth.uid()));
create policy "own orders read" on orders for select using (user_id=auth.uid() or is_admin());
create policy "own order items read" on order_items for select using (exists(select 1 from orders o where o.id=order_id and (o.user_id=auth.uid() or is_admin())));
create policy "own payments read" on payments for select using (exists(select 1 from orders o where o.id=order_id and (o.user_id=auth.uid() or is_admin())));
create policy "own entitlements read" on entitlements for select using (user_id=auth.uid() or is_admin());

insert into products(slug,name,description,image_url,price,currency,active,product_type,includes_text,terms_text,access_key)
values('streaming-capa-2026','Streaming CAPA 2026','Acceso virtual por Zoom al Congreso Argentino de Proteínas Alternativas 2026.','/capa-assets/capa home.png',44999,'ARS',true,'digital_event','Transmisión en vivo por Zoom durante las jornadas habilitadas. El acceso se enviará luego de confirmar manualmente el pago.','Acceso personal. La acreditación del pago y la habilitación del acceso se realizan manualmente.','streaming-capa-2026');
