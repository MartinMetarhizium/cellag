import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import events from "../data/events.json";
import { useI18n } from "../i18n/I18nContext";

const eventEn = { "capa-2026": { title: "Argentine Alternative Protein Congress", category: "Congress", time: "Time to be confirmed", location: "Buenos Aires Convention Center (CEC) – Recoleta", summary: "CAPA brings together leaders in science, industry, investment and policy to advance the sector in Argentina and the region." } };

function formatEventDate(start, end) {
  if (!start) return "";
  if (!end || start === end) return start;
  return `${start} to ${end}`;
}

export default function Events() {
  const { locale } = useI18n();
  const c = locale === "en" ? { all: "All", title: "Events", intro: "Explore Cell Ag Argentina activities and find events near you.", upcoming: "Upcoming events", past: "Past events", noUpcoming: "There are no upcoming events.", noPast: "There are no past events.", details: "View details" } : { all: "Todos", title: "Eventos", intro: "Explorá las actividades de Cell Ag Argentina y encontrá eventos cercanos a vos.", upcoming: "Eventos futuros", past: "Eventos pasados", noUpcoming: "No hay eventos futuros.", noPast: "No hay eventos pasados.", details: "Ver detalles" };
  const [category, setCategory] = useState("Todos");
  const today = new Date();

  const categories = ["Todos", ...new Set(events.map((e) => e.category))];

  const filtered = useMemo(() => {
    if (category === "Todos") return events;
    return events.filter((e) => e.category === category);
  }, [category]);

  const upcoming = filtered.filter((e) => new Date(e.date) >= today);
  const past = filtered.filter((e) => new Date(e.date) < today);

  const Card = ({ event }) => (
    <article className="rounded-2xl overflow-hidden border bg-white shadow-sm h-full flex flex-col">
      <img
        src={event.image}
        alt={event.title}
        className="h-56 w-full object-cover"
      />

      <div className="p-5 flex-1 flex flex-col">
        <p className="text-sm text-green-700 font-semibold mb-2">{locale === "en" ? eventEn[event.id]?.category || event.category : event.category}</p>

        <h3 className="text-xl font-semibold mb-1">{locale === "en" ? eventEn[event.id]?.title || event.title : event.title}</h3>

        {event.subtitle && (
          <p className="text-md font-medium text-gray-800 mb-3">{event.subtitle}</p>
        )}

        <p className="text-gray-600 mb-1">
          {formatEventDate(event.date, event.endDate)}
        </p>

        <p className="text-gray-600 mb-1">{locale === "en" ? eventEn[event.id]?.time || event.time : event.time}</p>
        <p className="text-gray-600 mb-4">{locale === "en" ? eventEn[event.id]?.location || event.location : event.location}</p>

        {event.summary && (
          <p className="text-gray-700 mb-4">{locale === "en" ? eventEn[event.id]?.summary || event.summary : event.summary}</p>
        )}

        <div className="mt-auto">
          <Link
            to={`/events/${event.id}`}
            className="inline-block bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800"
          >
            {c.details}
          </Link>
        </div>
      </div>
    </article>
  );

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-4xl font-bold text-green-900 mb-4">{c.title}</h1><p className="text-gray-700 max-w-3xl mb-8">{c.intro}</p>

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
              {cat === "Todos" ? c.all : (locale === "en" ? eventEn[events.find((event) => event.category === cat)?.id]?.category || cat : cat)}
            </button>
          ))}
        </div>

        <section className="mb-14">
          <h2 className="text-2xl font-bold text-green-800 mb-6">{c.upcoming}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {upcoming.length ? upcoming.map((e) => <Card key={e.id} event={e} />) : <p>{c.noUpcoming}</p>}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-green-800 mb-6">{c.past}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {past.length ? past.map((e) => <Card key={e.id} event={e} />) : <p>{c.noPast}</p>}
          </div>
        </section>
      </div>
    </div>
  );
}
