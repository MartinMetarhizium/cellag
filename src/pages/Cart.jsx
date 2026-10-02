import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";

export default function Cart() {
  const { items, total, remove, clear } = useCart(); const { user } = useAuth(); const navigate = useNavigate();
  const checkout = () => navigate(user ? "/checkout" : "/mi-cuenta", { state: { from: "/checkout" } });
  return <div className="commerce-page"><section className="commerce-card"><div className="commerce-heading"><p>COMPRA</p><h1>Carrito</h1></div>{items.length ? <><div className="cart-list">{items.map((item) => <article key={item.product.id}><div><strong>{item.product.name}</strong><span>Cantidad: {item.quantity}</span></div><div><strong>{item.product.currency} {(Number(item.product.price) * item.quantity).toLocaleString("es-AR")}</strong><button onClick={() => remove(item.product.id)}>Eliminar</button></div></article>)}</div><div className="cart-total"><span>Total</span><strong>{items[0]?.product.currency} {total.toLocaleString("es-AR")}</strong></div><div className="product-actions"><button className="button-primary" onClick={checkout}>Finalizar compra</button><button className="button-secondary" onClick={clear}>Vaciar carrito</button><Link className="button-link" to="/capa">Continuar comprando</Link></div></> : <><p className="empty-copy">Tu carrito está vacío.</p><Link className="button-primary inline" to="/productos/streaming-capa-2026">Ver Streaming CAPA 2026</Link></>}</section></div>;
}
