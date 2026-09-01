import { Navigate, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Team from "./pages/Team";
import News from "./pages/News";
import NewsDetail from "./pages/NewsDetails";
import Associate from "./pages/Associate";
import Capa from "./pages/Capa";
import Mission from "./pages/Mission";
import CapaTalkDetails from "./pages/CapaTalkDetails";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/capa" replace />} />
        <Route path="capa" element={<Capa />} />
        <Route path="capa/charlas/:id" element={<CapaTalkDetails />} />
        <Route path="home" element={<Home />} />
        <Route path="team" element={<Team />} />
        <Route path="mission" element={<Mission />} />
        <Route path="news" element={<News />} />
        <Route path="news/:id" element={<NewsDetail />} />
        <Route path="associate" element={<Associate />} />
      </Route>
    </Routes>
  );
}
