import { Navigate, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import News from "./pages/News";
import NewsDetail from "./pages/NewsDetails";
import Associate from "./pages/Associate";
import Capa from "./pages/Capa";
import Mission from "./pages/Mission";
import CapaTalkDetails from "./pages/CapaTalkDetails";
import Account from "./pages/Account";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import AdminOrders from "./pages/AdminOrders";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/capa" replace />} />
        <Route path="capa" element={<Capa />} />
        <Route path="capa/charlas/:id" element={<CapaTalkDetails />} />
        <Route path="home" element={<Home />} />
        <Route path="team" element={<Navigate to="/mission#equipo" replace />} />
        <Route path="mission" element={<Mission />} />
        <Route path="news" element={<News />} />
        <Route path="news/:id" element={<NewsDetail />} />
        <Route path="associate" element={<Associate />} />
        <Route path="mi-cuenta" element={<Account />} />
        <Route path="productos/:slug" element={<ProductDetails />} />
        <Route path="carrito" element={<Cart />} />
        <Route path="checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
        <Route path="admin/ordenes" element={<ProtectedRoute admin><AdminOrders /></ProtectedRoute>} />
      </Route>
    </Routes>
  );
}
