// src/components/Events.jsx
import Carousel from "./Carousel";

export default function Events() {
  const slides = [
    { src: "/slides/slide1.jpg", alt: "Evento 1", href: "https://coapjcc2025.com" },
    { src: "/slides/slide2.jpg", alt: "Evento 2", href: "https://newmeat.com.br/" }
  ];

  const events = [
    { title: "II COAP & II JCC", link: "https://coapjcc2025.com" },
    { title: "New Meat Brazil", link: "https://newmeat.com.br/" }
  ];

  return (
    <section id="events" className="py-16 bg-green-50">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-green-800 mb-8 text-center">
          Eventos Parceiros
        </h2>

        <div className="mb-8">
          <Carousel slides={slides} />
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-6">
          {events.map((ev) => (
            <a
              key={ev.title}
              href={ev.link}
              target="_blank"
              rel="noreferrer"
              className="bg-white shadow-md p-6 rounded-lg w-64 hover:scale-105 transition"
            >
              <h3 className="font-semibold text-green-700">{ev.title}</h3>
              <p className="text-sm text-gray-500 mt-2">Mais informações →</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
