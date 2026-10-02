import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";
import { requireSupabase } from "../lib/supabase";

export default function Checkout() {
  const { profile, user } = useAuth(); const { items, total, clear } = useCart(); const [result, setResult] = useState(null); const [busy, setBusy] = useState(false);
  const paymentLink = import.meta.env.VITE_PAYMENT_LINK || "https://mpago.la/2tSPMv4";
  const createOrder = async () => { setBusy(true); const { data, error } = await requireSupabase().rpc("create_order_from_active_cart"); if (error) setResult({ error: error.message }); else { setResult(data); await clear(); } setBusy(false); };
  if (!items.length && !result) return <div className="commerce-page narrow"><section className="commerce-card"><h1>No hay productos para comprar</h1><Link to="/carrito">Volver al carrito</Link></section></div>;
  return <div className="commerce-page"><section className="commerce-card"><div className="commerce-heading"><p>CHECKOUT</p><h1>Confirmar compra</h1></div><p><strong>Comprador:</strong> {profile?.first_name} {profile?.last_name} · {user.email}</p>{items.map((item) => <div className="checkout-line" key={item.product.id}><span>{item.product.name} × {item.quantity}</span><strong>{item.product.currency} {(Number(item.product.price) * item.quantity).toLocaleString("es-AR")}</strong></div>)}{items.length > 0 && <div className="cart-total"><span>Total</span><strong>{items[0].product.currency} {total.toLocaleString("es-AR")}</strong></div>}{result ? <div className="checkout-result"><h2>{result.error ? "No pudimos crear la orden" : "Orden creada"}</h2><p>{result.error || `Número de orden: ${result.order_number}. Conservá este número. Confirmaremos manualmente el pago y luego te enviaremos el acceso a Zoom.`}</p>{!result.error && <a className="button-primary inline" href={paymentLink} target="_blank" rel="noopener noreferrer">Pagar con Mercado Pago ↗</a>}<Link className="button-link" to="/mi-cuenta">Ver mis compras</Link></div> : <><button className="button-primary" disabled={busy} onClick={createOrder}>{busy ? "Creando orden…" : "Continuar a Mercado Pago"}</button><p className="checkout-warning">Primero se generará una orden pendiente asociada a tu cuenta. El pago de ARS 44.999 se realizará en Mercado Pago y será confirmado manualmente antes de habilitar el acceso a Zoom.</p></>}</section></div>;
}
