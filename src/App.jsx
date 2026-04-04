import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Team from "./pages/Team";
import Events from "./pages/Events";
import News from "./pages/News";
import EventDetail from "./pages/EventDetails";
import NewsDetail from "./pages/NewsDetails";
import Associate from "./pages/Associate";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="team" element={<Team />} />
        <Route path="events" element={<Events />} />
        <Route path="events/:id" element={<EventDetail />} />
        <Route path="news" element={<News />} />
        <Route path="news/:id" element={<NewsDetail />} />
        <Route path="associate" element={<Associate />} />
      </Route>
    </Routes>
  );
}