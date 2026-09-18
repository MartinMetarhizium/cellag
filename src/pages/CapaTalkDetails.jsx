import { useLayoutEffect } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import capaTalks from "../data/capaTalks";
import { useI18n } from "../i18n/I18nContext";
import { getOrganizationLogo } from "../data/organizationLogos";

const categoryNames = {
  es: { PB: "Proteínas vegetales", CA: "Agricultura celular", FE: "Fermentación", PP: "Políticas públicas", IS: "Innovation Spotlight", UN: "Universidades", AD: "Divulgación", GE: "Programa general" },
  en: { PB: "Plant-based proteins", CA: "Cellular agriculture", FE: "Fermentation", PP: "Public policy", IS: "Innovation Spotlight", UN: "Universities", AD: "Advocacy", GE: "General program" },
};
const languageNames = {
  es: { ES: "Español", EN: "Inglés", PT: "Portugués" },
  en: { ES: "Spanish", EN: "English", PT: "Portuguese" },
};

export default function CapaTalkDetails() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const { locale } = useI18n();

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [id]);

  const talk = capaTalks.find((item) => item.id === id);
  const returnDay = ["wednesday", "thursday", "friday"].includes(searchParams.get("day")) ? searchParams.get("day") : talk?.day || "wednesday";
  const returnRoom = ["D", "E"].includes(searchParams.get("room")) ? searchParams.get("room") : talk?.room || "D";
  const returnTo = `/capa?day=${returnDay}&room=${returnRoom}#programa`;
  const c = locale === "en" ? { back: "Back to the CAPA program", notFound: "Talk not found", speaker: "Speaker", schedule: "Schedule", room: "Room", mode: "Format", language: "Language", inPerson: "In person", remote: "Remote", about: "About the talk", topics: "Key topics", keywords: "Keywords", participations: "Block presentations" } : { back: "Volver al programa de CAPA", notFound: "Charla no encontrada", speaker: "Disertante", schedule: "Horario", room: "Salón", mode: "Modalidad", language: "Idioma", inPerson: "Presencial", remote: "Remoto", about: "Sobre la charla", topics: "Temas clave", keywords: "Etiquetas", participations: "Participaciones del bloque" };
  if (!talk) return <div className="capa-talk-detail"><Link to="/capa">← {c.back}</Link><h1>{c.notFound}</h1></div>;
  const speakers = talk.speakers?.length ? talk.speakers : [talk];

  return (
    <article className="capa-talk-detail">
      <Link className="talk-detail-back" to={returnTo} state={{ restoreCapaScroll: true }}>← {c.back}</Link>
      <header className={`talk-detail-hero category-accent-${talk.category.toLowerCase()}`}><div className="talk-detail-meta"><span>{(typeof talk.categoryLabel === "object" ? talk.categoryLabel[locale] : talk.categoryLabel) || categoryNames[locale][talk.category] || talk.category}</span><span>{(Array.isArray(talk.language) ? talk.language : [talk.language]).map((language) => languageNames[locale][language] || language).join(" · ")}</span><span>{talk.mode === "remoto" ? "💻" : "🎤"} {talk.mode === "remoto" ? c.remote : c.inPerson}</span></div><h1>{talk.title}</h1></header>
      <div className="talk-detail-layout">
        <div className="talk-speaker-panels">{speakers.map((speaker) => { const organizationLogo = getOrganizationLogo(speaker.company || talk.company, speaker.logo); return <aside className="talk-speaker-panel" key={speaker.name}>{speaker.photo ? <img className={speaker.photoFit === "contain" ? "contain" : ""} src={speaker.photo} alt={speaker.name} /> : <div className="talk-photo-placeholder large"><span>{speaker.name.split(" ").map((part) => part[0]).slice(0,2).join("")}</span></div>}<p>{c.speaker}</p><h2>{speaker.name}</h2><h3>{speaker.company || talk.company}</h3><div className="talk-speaker-logo">{organizationLogo ? <img src={organizationLogo} alt={`Logo de ${speaker.company || talk.company}`} /> : <span>{speaker.company || talk.company}</span>}</div><dl><div><dt>{c.schedule}</dt><dd>{talk.date} · {talk.time}{talk.timezone ? ` · ${talk.timezone}` : ""}</dd></div><div><dt>{c.room}</dt><dd>{talk.room}</dd></div><div><dt>{c.mode}</dt><dd>{talk.mode === "remoto" ? c.remote : c.inPerson}</dd></div><div><dt>{c.language}</dt><dd>{(Array.isArray(talk.language) ? talk.language : [talk.language]).map((language) => languageNames[locale][language] || language).join(" · ")}</dd></div></dl></aside>; })}{talk.detailLogo && <div className="talk-detail-institution-logo"><img src={talk.detailLogo} alt={`Logo de ${talk.company}`} /></div>}</div>
        <main className="talk-detail-content"><section><p className="talk-detail-kicker">{c.about}</p>{talk.description.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</section><section><p className="talk-detail-kicker">{c.topics}</p><ul>{talk.topics.map((topic) => <li key={topic}>{topic}</li>)}</ul></section>{talk.participations?.length > 0 && <section><p className="talk-detail-kicker">{c.participations}</p><div className="talk-participations">{talk.participations.map((participation) => <article key={participation.company}><h2>{participation.company}</h2>{participation.name !== participation.company && <h3>{participation.name}</h3>}<p>{participation.description}</p><div className="talk-detail-keywords">{participation.keywords.map((keyword) => <span key={keyword}>{keyword}</span>)}</div></article>)}</div></section>}<section><p className="talk-detail-kicker">{c.keywords}</p><div className="talk-detail-keywords">{talk.keywords.map((keyword) => <span key={keyword}>{keyword}</span>)}</div></section></main>
      </div>
    </article>
  );
}
