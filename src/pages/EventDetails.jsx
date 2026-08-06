import { Link, useParams } from "react-router-dom";
import events from "../data/events.json";
import { useI18n } from "../i18n/I18nContext";

const eventEn = { title: "Argentine Alternative Protein Congress", category: "Congress", time: "Time to be confirmed", location: "Buenos Aires Convention Center (CEC) – Recoleta", content: ["CAPA 2026 will be held on October 21, 22 and 23 at the Buenos Aires Convention Center.", "The event brings together science, industry, investment and public policy to grow Argentina’s alternative protein ecosystem.", "Over three days, it will offer networking, exhibitions and experiences focused on innovation, regulation, nutrition and food culture.", "The full schedule will be announced soon."] };

function formatEventDate(start, end) {
  if (!start) return "";
  if (!end || start === end) return start;
  return `${start} to ${end}`;
}

export default function EventDetail() {
  const { locale } = useI18n();
  const c = locale === "en" ? { notFound: "Event not found", back: "Back to events", date: "Date", time: "Time", location: "Location" } : { notFound: "Evento no encontrado", back: "Volver a eventos", date: "Fecha", time: "Hora", location: "Ubicación" };
  const { id } = useParams();
  const event = events.find((item) => item.id === id);

  if (!event) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold text-green-900 mb-4">{c.notFound}</h1>
        <Link to="/events" className="text-green-700 hover:underline">
          {c.back}
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <Link to="/events" className="text-green-700 hover:underline mb-6 inline-block">
        ← {c.back}
      </Link>

      <img
        src={event.image}
        alt={event.title}
        className="w-full h-auto max-h-[450px] object-cover rounded-2xl mb-8"
      />

      <p className="text-sm text-green-700 font-semibold mb-2">{locale === "en" ? eventEn.category : event.category}</p>
      <h1 className="text-4xl font-bold text-green-900 mb-2">{locale === "en" ? eventEn.title : event.title}</h1>

      {event.subtitle && (
        <p className="text-xl text-gray-700 mb-6">{event.subtitle}</p>
      )}

      <div className="space-y-2 text-gray-700 mb-8">
        <p><strong>{c.date}:</strong> {formatEventDate(event.date, event.endDate)}</p>
        <p><strong>{c.time}:</strong> {locale === "en" ? eventEn.time : event.time}</p>
        <p><strong>{c.location}:</strong> {locale === "en" ? eventEn.location : event.location}</p>
      </div>

      <div className="space-y-5 text-gray-700 leading-relaxed">
        {(locale === "en" ? eventEn.content : event.content)?.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </div>
  );
}
