-- Promote the designated operational account. If its profile was not created yet,
-- build it from the metadata stored by Supabase Auth.
insert into public.profiles (id, first_name, last_name, country, role, terms_accepted_at)
select
  u.id,
  coalesce(nullif(u.raw_user_meta_data->>'first_name', ''), 'Administrador'),
  coalesce(nullif(u.raw_user_meta_data->>'last_name', ''), 'CAPA'),
  coalesce(nullif(u.raw_user_meta_data->>'country', ''), 'Argentina'),
  'admin',
  now()
from auth.users u
where lower(u.email) = 'fedeh1997@gmail.com'
on conflict (id) do update set role = 'admin';

drop view if exists public.admin_orders;

create view public.admin_orders with (security_invoker = true) as
select
  o.id,
  o.order_number,
  (o.buyer_first_name || ' ' || o.buyer_last_name) as buyer_name,
  o.buyer_email,
  pr.country as buyer_country,
  string_agg(oi.product_name, ', ' order by oi.product_name) as products,
  o.created_at,
  o.updated_at,
  o.total,
  o.currency,
  o.status as order_status,
  o.payment_status
from public.orders o
join public.order_items oi on oi.order_id = o.id
left join public.profiles pr on pr.id = o.user_id
group by o.id, pr.country;

create or replace function public.admin_confirm_manual_payment(
  p_order_id uuid,
  p_provider_transaction_id text default null
) returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_order public.orders;
begin
  if not public.is_admin() then
    raise exception 'Acceso denegado';
  end if;

  select * into v_order
  from public.orders
  where id = p_order_id
  for update;

  if v_order.id is null then
    raise exception 'Orden inexistente';
  end if;

  update public.orders
  set status = 'confirmed', payment_status = 'paid', updated_at = now()
  where id = v_order.id;

  if not exists (
    select 1 from public.payments
    where order_id = v_order.id and status = 'paid'
  ) then
    insert into public.payments (
      order_id,
      provider,
      provider_transaction_id,
      status,
      amount,
      currency,
      provider_payload
    ) values (
      v_order.id,
      'mercado_pago_manual',
      nullif(trim(p_provider_transaction_id), ''),
      'paid',
      v_order.total,
      v_order.currency,
      jsonb_build_object(
        'confirmation', 'manual',
        'confirmed_by', auth.uid(),
        'confirmed_at', now()
      )
    );
  end if;

  insert into public.entitlements (user_id, product_id, order_id, access_key, active)
  select
    v_order.user_id,
    oi.product_id,
    v_order.id,
    p.access_key,
    true
  from public.order_items oi
  join public.products p on p.id = oi.product_id
  where oi.order_id = v_order.id
    and oi.product_id is not null
    and p.access_key is not null
  on conflict (user_id, product_id, order_id)
  do update set active = true;

  return jsonb_build_object(
    'id', v_order.id,
    'order_number', v_order.order_number,
    'payment_status', 'paid',
    'buyer_email', v_order.buyer_email
  );
end;
$$;

revoke all on function public.admin_confirm_manual_payment(uuid, text) from public;
grant execute on function public.admin_confirm_manual_payment(uuid, text) to authenticated;
