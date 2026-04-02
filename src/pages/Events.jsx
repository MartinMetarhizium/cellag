import { useMemo, useState } from "react";
import events from "../data/events.json";

export default function Eventos() {
  const [category, setCategory] = useState("Todos");
  const today = new Date("2026-04-02"); // o new Date()

  const categories = ["Todos", ...new Set(events.map((e) => e.category))];

  const filtered = useMemo(() => {
    if (category === "Todos") return events;
    return events.filter((e) => e.category === category);
  }, [category]);

  const upcoming = filtered.filter((e) => new Date(e.date) >= today);
  const past = filtered.filter((e) => new Date(e.date) < today);

  const Card = ({ event }) => (
    <article className="rounded-2xl overflow-hidden border bg-white shadow-sm">
      <img src={event.image} alt={event.title} className="h-48 w-full object-cover" />
      <div className="p-5">
        <p className="text-sm text-green-700 font-semibold mb-2">{event.category}</p>
        <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
        <p className="text-gray-600 mb-1">{event.date} · {event.time}</p>
        <p className="text-gray-600 mb-4">{event.location}</p>
        <a
          href={event.link}
          className="inline-block bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800"
        >
          Ver más
        </a>
      </div>
    </article>
  );

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold text-green-900 mb-4">Eventos</h1>
      <p className="text-gray-700 max-w-3xl mb-8">
        Explorá las actividades de Cell Ag Argentina y encontrá los eventos que te interesan.
      </p>

      <div className="flex flex-wrap gap-3 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-2 rounded-full border ${
              category === cat
                ? "bg-green-700 text-white border-green-700"
                : "bg-white text-gray-700 border-gray-300"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <section className="mb-14">
        <h2 className="text-2xl font-bold text-green-800 mb-6">Próximos eventos</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcoming.length ? upcoming.map((e) => <Card key={e.id} event={e} />) : <p>No hay eventos próximos.</p>}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-green-800 mb-6">Eventos pasados</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {past.length ? past.map((e) => <Card key={e.id} event={e} />) : <p>No hay eventos pasados.</p>}
        </div>
      </section>
    </div>
  );
}