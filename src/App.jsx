// src/App.jsx
import Header from "./components/Header";
import Hero from "./components/Hero";
import Mission from "./components/Mission";
import Events from "./components/Events";
import News from "./components/News";
import About from "./components/About";
import Process from "./components/Process";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="font-sans text-gray-800">
      <Header />
      <Hero />
      <Mission />
      <Events />   {/* Carrusel */}
      <News />     {/* Noticias desde JSON local */}
      <About />
      <Process />
      <Footer />
    </div>
  );
}
