import { Link, useParams } from "react-router-dom";
import capaTalks from "../data/capaTalks";
import { useI18n } from "../i18n/I18nContext";

export default function CapaTalkDetails() {
  const { id } = useParams();
  const { locale } = useI18n();
  const talk = capaTalks.find((item) => item.id === id);
  const c = locale === "en" ? { back: "Back to the CAPA program", notFound: "Talk not found", speaker: "Speaker", schedule: "Schedule", room: "Room", mode: "Format", language: "Language", inPerson: "In person", remote: "Remote", about: "About the talk", topics: "Key topics" } : { back: "Volver al programa de CAPA", notFound: "Charla no encontrada", speaker: "Disertante", schedule: "Horario", room: "Salón", mode: "Modalidad", language: "Idioma", inPerson: "Presencial", remote: "Remoto", about: "Sobre la charla", topics: "Temas clave" };
  if (!talk) return <div className="capa-talk-detail"><Link to="/capa">← {c.back}</Link><h1>{c.notFound}</h1></div>;

  return (
    <article className="capa-talk-detail">
      <Link className="talk-detail-back" to="/capa#programa">← {c.back}</Link>
      <header className="talk-detail-hero"><div className="talk-detail-meta"><span>{talk.category}</span><span>{talk.language}</span><span>{talk.mode === "remoto" ? "💻" : "🎤"} {talk.mode === "remoto" ? c.remote : c.inPerson}</span></div><h1>{talk.title}</h1></header>
      <div className="talk-detail-layout">
        <aside className="talk-speaker-panel">{talk.photo ? <img src={talk.photo} alt={talk.name} /> : <div className="talk-photo-placeholder large"><span>{talk.name.split(" ").map((part) => part[0]).slice(0,2).join("")}</span></div>}<p>{c.speaker}</p><h2>{talk.name}</h2><h3>{talk.company}</h3><dl><div><dt>{c.schedule}</dt><dd>{talk.date} · {talk.time}</dd></div><div><dt>{c.room}</dt><dd>{talk.room}</dd></div><div><dt>{c.mode}</dt><dd>{talk.mode === "remoto" ? c.remote : c.inPerson}</dd></div><div><dt>{c.language}</dt><dd>{talk.language}</dd></div></dl></aside>
        <main className="talk-detail-content"><section><p className="talk-detail-kicker">{c.about}</p>{talk.description.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</section><section><p className="talk-detail-kicker">{c.topics}</p><ul>{talk.topics.map((topic) => <li key={topic}>{topic}</li>)}</ul></section></main>
      </div>
    </article>
  );
}
