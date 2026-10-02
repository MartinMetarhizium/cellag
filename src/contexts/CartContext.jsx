/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import { requireSupabase, supabase } from "../lib/supabase";
import { useAuth } from "./AuthContext";

const CartContext = createContext(null);
const GUEST_KEY = "cellag-guest-cart";
const readGuest = () => { try { return JSON.parse(localStorage.getItem(GUEST_KEY) || "[]"); } catch { return []; } };

export function CartProvider({ children }) {
  const { user } = useAuth();
  const [items, setItems] = useState(readGuest);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user || !supabase) { setItems(readGuest()); return; }
    let active = true;
    setLoading(true);
    (async () => {
      const guest = readGuest();
      let { data: cart } = await supabase.from("carts").select("id").eq("user_id", user.id).eq("status", "active").maybeSingle();
      if (!cart) ({ data: cart } = await supabase.from("carts").insert({ user_id: user.id }).select("id").single());
      for (const item of guest) await supabase.from("cart_items").upsert({ cart_id: cart.id, product_id: item.product.id, quantity: item.quantity }, { onConflict: "cart_id,product_id" });
      localStorage.removeItem(GUEST_KEY);
      const { data } = await supabase.from("cart_items").select("id,quantity,product:products(*)").eq("cart_id", cart.id);
      if (active) { setItems(data || []); setLoading(false); }
    })();
    return () => { active = false; };
  }, [user]);

  const persistGuest = (next) => { setItems(next); localStorage.setItem(GUEST_KEY, JSON.stringify(next)); };
  const add = async (product, quantity = 1) => {
    if (!user || !supabase) {
      const found = items.find((item) => item.product.id === product.id);
      persistGuest(found ? items.map((item) => item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item) : [...items, { product, quantity }]);
      return;
    }
    const { data: cart } = await requireSupabase().from("carts").select("id").eq("user_id", user.id).eq("status", "active").single();
    const found = items.find((item) => item.product.id === product.id);
    await supabase.from("cart_items").upsert({ cart_id: cart.id, product_id: product.id, quantity: (found?.quantity || 0) + quantity }, { onConflict: "cart_id,product_id" });
    setItems(found ? items.map((item) => item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item) : [...items, { product, quantity }]);
  };
  const remove = async (productId) => {
    const item = items.find((entry) => entry.product.id === productId);
    if (user && item?.id) await requireSupabase().from("cart_items").delete().eq("id", item.id);
    else persistGuest(items.filter((entry) => entry.product.id !== productId));
    setItems((current) => current.filter((entry) => entry.product.id !== productId));
  };
  const clear = async () => { if (user) { const { data: cart } = await requireSupabase().from("carts").select("id").eq("user_id", user.id).eq("status", "active").single(); await supabase.from("cart_items").delete().eq("cart_id", cart.id); } else localStorage.removeItem(GUEST_KEY); setItems([]); };
  const value = { items, loading, add, remove, clear, count: items.reduce((sum, item) => sum + item.quantity, 0), total: items.reduce((sum, item) => sum + Number(item.product.price || 0) * item.quantity, 0) };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => useContext(CartContext);
