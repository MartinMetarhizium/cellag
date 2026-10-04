import { useCallback, useEffect, useState } from "react";
import { requireSupabase } from "../lib/supabase";
const statusNames = { pending: "Pendiente", paid: "Pagado", cancelled: "Cancelado", refunded: "Reembolsado" };

export default function AdminOrders() {
  const [orders, setOrders] = useState([]); const [query, setQuery] = useState(""); const [status, setStatus] = useState(""); const [busyId, setBusyId] = useState(null); const [message, setMessage] = useState("");
  const loadOrders = useCallback(async () => { const { data, error } = await requireSupabase().from("admin_orders").select("*").order("created_at", { ascending: false }); if (error) setMessage(error.message); else setOrders(data || []); }, []);
  useEffect(() => { loadOrders(); }, [loadOrders]);
  const confirmPayment = async (order) => {
    const transactionId = window.prompt(`ID de operación de Mercado Pago para ${order.order_number} (opcional):`, "");
    if (transactionId === null || !window.confirm(`¿Confirmar manualmente el pago de ${order.currency} ${Number(order.total).toLocaleString("es-AR")} de ${order.buyer_name}?`)) return;
    setBusyId(order.id); setMessage("");
    const { error } = await requireSupabase().rpc("admin_confirm_manual_payment", { p_order_id: order.id, p_provider_transaction_id: transactionId || null });
    if (error) setMessage(`No se pudo confirmar: ${error.message}`); else { setMessage(`Pago de ${order.order_number} confirmado. Ya podés enviar la invitación a ${order.buyer_email}.`); await loadOrders(); }
    setBusyId(null);
  };
  const filtered = orders.filter((order) => (!status || order.payment_status === status) && `${order.order_number} ${order.buyer_name} ${order.buyer_email}`.toLowerCase().includes(query.toLowerCase()));
  return <div className="commerce-page"><section className="commerce-card"><div className="commerce-heading"><p>ADMINISTRACIÓN</p><h1>Ventas</h1></div><p className="empty-copy">Verificá los datos del comprador y el ingreso en Mercado Pago antes de confirmar. Luego enviá manualmente la invitación de Zoom al correo indicado.</p>{message && <p className="admin-message" role="status">{message}</p>}<div className="admin-filters"><input placeholder="Nombre, email o número de orden" value={query} onChange={(event) => setQuery(event.target.value)} /><select value={status} onChange={(event) => setStatus(event.target.value)}><option value="">Todos los estados</option><option value="paid">Pagado</option><option value="pending">Pendiente</option><option value="cancelled">Cancelado</option><option value="refunded">Reembolsado</option></select></div><div className="admin-table"><div className="admin-row header"><span>Orden</span><span>Comprador</span><span>Producto</span><span>Fecha</span><span>Importe</span><span>Acciones</span></div>{filtered.map((order) => <div className="admin-row" key={order.id}><span>{order.order_number}</span><span><strong>{order.buyer_name}</strong><small>{order.buyer_email}</small><small>{order.buyer_country || "País no informado"}</small></span><span>{order.products}</span><span>{new Date(order.created_at).toLocaleDateString("es-AR")}</span><span>{order.currency} {Number(order.total).toLocaleString("es-AR")}</span><span className="admin-actions"><span className={`status status-${order.payment_status}`}>{statusNames[order.payment_status] || order.payment_status}</span>{order.payment_status === "pending" ? <button className="button-primary" disabled={busyId === order.id} onClick={() => confirmPayment(order)}>{busyId === order.id ? "Confirmando…" : "Confirmar pago"}</button> : <a className="button-secondary" href={`mailto:${order.buyer_email}?subject=${encodeURIComponent("Acceso Zoom · Streaming CAPA 2026")}`}>Enviar invitación</a>}</span></div>)}</div></section></div>;
}
