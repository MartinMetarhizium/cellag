import { Link, useParams } from "react-router-dom";
import events from "../data/events.json";

function formatEventDate(start, end) {
  if (!start) return "";
  if (!end || start === end) return start;
  return `${start} to ${end}`;
}

export default function EventDetail() {
  const { id } = useParams();
  const event = events.find((item) => item.id === id);

  if (!event) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold text-green-900 mb-4">Evento no encontrado</h1>
        <Link to="/events" className="text-green-700 hover:underline">
          Volver a eventos
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <Link to="/events" className="text-green-700 hover:underline mb-6 inline-block">
        ← Volver a eventos
      </Link>

      <img
        src={event.image}
        alt={event.title}
        className="w-full h-auto max-h-[450px] object-cover rounded-2xl mb-8"
      />

      <p className="text-sm text-green-700 font-semibold mb-2">{event.category}</p>
      <h1 className="text-4xl font-bold text-green-900 mb-2">{event.title}</h1>

      {event.subtitle && (
        <p className="text-xl text-gray-700 mb-6">{event.subtitle}</p>
      )}

      <div className="space-y-2 text-gray-700 mb-8">
        <p><strong>Fecha:</strong> {formatEventDate(event.date, event.endDate)}</p>
        <p><strong>Hora:</strong> {event.time}</p>
        <p><strong>Ubicación:</strong> {event.location}</p>
      </div>

      <div className="space-y-5 text-gray-700 leading-relaxed">
        {event.content?.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </div>
  );
}