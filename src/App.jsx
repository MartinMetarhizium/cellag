import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Team from "./pages/Team";
import Events from "./pages/Events";
import News from "./pages/News";
import Associate from "./pages/Associate";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="team" element={<Team />} />
        <Route path="events" element={<Events />} />
        <Route path="news" element={<News />} />
        <Route path="associate" element={<Associate />} />
      </Route>
    </Routes>
  );
}