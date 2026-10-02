import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { isSupabaseConfigured, requireSupabase } from "../lib/supabase";

const initial = { firstName: "", lastName: "", email: "", password: "", confirm: "", country: "Argentina", terms: false };
const statusNames = { pending: "Pendiente", paid: "Pagado", cancelled: "Cancelado", refunded: "Reembolsado" };

export default function Account() {
  const { user, profile, signIn, signUp, signOut, resetPassword } = useAuth();
  const location = useLocation();
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState(initial);
  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const set = (event) => setForm({ ...form, [event.target.name]: event.target.type === "checkbox" ? event.target.checked : event.target.value });

  useEffect(() => {
    if (!user) return;
    requireSupabase().from("orders").select("id,order_number,total,currency,status,payment_status,created_at,order_items(product_name,quantity)").order("created_at", { ascending: false }).then(({ data }) => setOrders(data || []));
  }, [user]);

  const submit = async (event) => {
    event.preventDefault(); setMessage("");
    try {
      if (mode === "register") {
        if (form.password !== form.confirm) throw new Error("Las contraseñas no coinciden.");
        if (!form.terms) throw new Error("Debés aceptar los términos y la política de privacidad.");
        const { error } = await signUp(form); if (error) throw error;
        setMessage("Cuenta creada. Revisá tu correo para confirmarla.");
      } else if (mode === "reset") {
        const { error } = await resetPassword(form.email); if (error) throw error;
        setMessage("Te enviamos las instrucciones para recuperar tu contraseña.");
      } else { const { error } = await signIn(form.email, form.password); if (error) throw error; }
    } catch (error) { setMessage(error.message); }
  };

  if (!isSupabaseConfigured) return <CommerceNotice />;
  if (user && new URLSearchParams(location.search).get("reset") === "1") return <div className="commerce-page narrow"><section className="commerce-card"><div className="commerce-heading"><p>SEGURIDAD</p><h1>Crear nueva contraseña</h1></div><form className="commerce-form" onSubmit={async (event) => { event.preventDefault(); const { error } = await requireSupabase().auth.updateUser({ password: newPassword }); setMessage(error ? error.message : "Contraseña actualizada correctamente."); }}><label>Nueva contraseña<input type="password" minLength="8" value={newPassword} onChange={(event) => setNewPassword(event.target.value)} required /></label><button className="button-primary" type="submit">Guardar contraseña</button>{message && <p className="form-message">{message}</p>}</form></section></div>;
  if (user) return <div className="commerce-page"><section className="commerce-card"><div className="commerce-heading"><p>MI CUENTA</p><h1>{profile?.first_name} {profile?.last_name}</h1></div><dl className="profile-data"><div><dt>Email</dt><dd>{user.email}</dd></div><div><dt>País</dt><dd>{profile?.country || "—"}</dd></div></dl><button className="button-secondary" onClick={signOut}>Cerrar sesión</button></section><section className="commerce-card"><h2>Mis compras</h2>{orders.length ? <div className="orders-list">{orders.map((order) => <article key={order.id}><div><strong>{order.order_items?.map((item) => item.product_name).join(", ") || "Compra"}</strong><span>{new Date(order.created_at).toLocaleDateString("es-AR")} · {order.order_number}</span></div><div><strong>{order.currency} {Number(order.total).toLocaleString("es-AR")}</strong><span className={`status status-${order.payment_status}`}>{statusNames[order.payment_status] || order.payment_status}</span></div></article>)}</div> : <p className="empty-copy">Todavía no realizaste compras.</p>}{profile?.role === "admin" && <Link className="button-primary inline" to="/admin/ordenes">Ver panel de ventas</Link>}</section></div>;

  return <div className="commerce-page narrow"><section className="commerce-card"><div className="commerce-heading"><p>MI CUENTA</p><h1>{mode === "register" ? "Crear cuenta" : mode === "reset" ? "Recuperar contraseña" : "Iniciar sesión"}</h1></div><form className="commerce-form" onSubmit={submit}>{mode === "register" && <div className="form-grid"><label>Nombre<input name="firstName" value={form.firstName} onChange={set} required /></label><label>Apellido<input name="lastName" value={form.lastName} onChange={set} required /></label></div>}<label>Correo electrónico<input name="email" type="email" value={form.email} onChange={set} required /></label>{mode !== "reset" && <label>Contraseña<input name="password" type="password" minLength="8" value={form.password} onChange={set} required /></label>}{mode === "register" && <><label>Confirmación de contraseña<input name="confirm" type="password" minLength="8" value={form.confirm} onChange={set} required /></label><label>País<input name="country" value={form.country} onChange={set} required /></label><label className="check"><input name="terms" type="checkbox" checked={form.terms} onChange={set} /> Acepto los términos y la política de privacidad.</label></>}<button className="button-primary" type="submit">{mode === "register" ? "Crear cuenta" : mode === "reset" ? "Enviar instrucciones" : "Iniciar sesión"}</button>{message && <p className="form-message" role="status">{message}</p>}</form><div className="auth-switch">{mode !== "login" && <button onClick={() => setMode("login")}>Iniciar sesión</button>}{mode !== "register" && <button onClick={() => setMode("register")}>Crear cuenta</button>}{mode !== "reset" && <button onClick={() => setMode("reset")}>Olvidé mi contraseña</button>}</div>{location.state?.from && <p className="empty-copy">Iniciá sesión para continuar con tu compra.</p>}</section></div>;
}

export function CommerceNotice() { return <div className="commerce-page narrow"><section className="commerce-card"><div className="commerce-heading"><p>COMERCIO ELECTRÓNICO</p><h1>Configuración pendiente</h1></div><p>La interfaz está preparada, pero las cuentas y compras permanecerán desactivadas hasta configurar las variables seguras de Supabase.</p></section></div>; }
