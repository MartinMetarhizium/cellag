import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { isSupabaseConfigured, requireSupabase } from "../lib/supabase";
import { CommerceNotice } from "./Account";

export default function ProductDetails() {
  const { slug } = useParams(); const navigate = useNavigate(); const { add } = useCart();
  const [product, setProduct] = useState(null); const [loading, setLoading] = useState(true);
  useEffect(() => { if (!isSupabaseConfigured) return; requireSupabase().from("products").select("*").eq("slug", slug).eq("active", true).single().then(({ data }) => { setProduct(data); setLoading(false); }); }, [slug]);
  if (!isSupabaseConfigured) return <CommerceNotice />;
  if (loading) return <div className="commerce-status">Cargando producto…</div>;
  if (!product) return <div className="commerce-page narrow"><section className="commerce-card"><h1>Producto no disponible</h1><Link to="/capa">Volver a CAPA</Link></section></div>;
  const addProduct = async (goToCart = false) => { await add(product); if (goToCart) navigate("/carrito"); };
  return <div className="commerce-page"><section className="product-layout commerce-card"><div className="product-image">{product.image_url ? <img src={product.image_url} alt={product.name} /> : <span>CAPA 2026</span>}</div><div><p className="commerce-kicker">ACCESO DIGITAL</p><h1>{product.name}</h1><p className="product-description">{product.description}</p><div className="product-includes"><h2>Qué incluye</h2><p>{product.includes_text}</p></div><p className="product-price">{product.currency} {Number(product.price).toLocaleString("es-AR")}</p><div className="product-actions"><button className="button-primary" onClick={() => addProduct(false)}>Agregar al carrito</button><button className="button-secondary" onClick={() => addProduct(true)}>Comprar</button></div><small>{product.terms_text}</small></div></section></div>;
}
