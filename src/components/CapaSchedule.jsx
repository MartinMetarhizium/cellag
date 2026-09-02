import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import capaTalks from "../data/capaTalks";
import { useI18n } from "../i18n/I18nContext";

const days = ["wednesday", "thursday", "friday"];
const rooms = ["D", "E"];
const dayCopy = {
  es: { wednesday: ["Miércoles", "21 OCT"], thursday: ["Jueves", "22 OCT"], friday: ["Viernes", "23 OCT"] },
  en: { wednesday: ["Wednesday", "OCT 21"], thursday: ["Thursday", "OCT 22"], friday: ["Friday", "OCT 23"] },
};

const categoryNames = {
  es: { PB: "Proteínas vegetales", CA: "Agricultura celular", FE: "Fermentación", PP: "Políticas públicas", IS: "Innovation Spotlight" },
  en: { PB: "Plant-based proteins", CA: "Cellular agriculture", FE: "Fermentation", PP: "Public policy", IS: "Innovation Spotlight" },
};

const languageNames = {
  ES: "Spanish",
  EN: "English",
  PT: "Portuguese",
};

function Flag({ country }) {
  const props = { viewBox: "0 0 36 24", role: "img", "aria-label": country };
  if (country === "Argentina") return <svg {...props}><rect width="36" height="24" fill="#74acdf"/><rect y="8" width="36" height="8" fill="#fff"/><circle cx="18" cy="12" r="2.2" fill="#f6b40e"/></svg>;
  if (country === "Brasil") return <svg {...props}><rect width="36" height="24" fill="#009c3b"/><path d="M18 3 32 12 18 21 4 12Z" fill="#ffdf00"/><circle cx="18" cy="12" r="5" fill="#002776"/></svg>;
  if (country === "Chile") return <svg {...props}><rect width="36" height="24" fill="#d52b1e"/><rect width="36" height="12" fill="#fff"/><rect width="12" height="12" fill="#0039a6"/><circle cx="6" cy="6" r="2" fill="#fff"/></svg>;
  if (country === "Reino Unido") return <svg {...props}><rect width="36" height="24" fill="#012169"/><path d="M0 0 36 24M36 0 0 24" stroke="#fff" strokeWidth="5"/><path d="M0 0 36 24M36 0 0 24" stroke="#c8102e" strokeWidth="2"/><path d="M18 0v24M0 12h36" stroke="#fff" strokeWidth="7"/><path d="M18 0v24M0 12h36" stroke="#c8102e" strokeWidth="4"/></svg>;
  if (country === "Países Bajos") return <svg {...props}><rect width="36" height="8" fill="#ae1c28"/><rect y="8" width="36" height="8" fill="#fff"/><rect y="16" width="36" height="8" fill="#21468b"/></svg>;
  return <span aria-label={country}>🌎</span>;
}

function TalkPlaceholder({ name }) {
  const initials = name.split(" ").map((part) => part[0]).slice(0, 2).join("");
  return <div className="talk-photo-placeholder" aria-hidden="true"><span>{initials}</span></div>;
}

export default function CapaSchedule() {
  const { locale } = useI18n();
  const [activeDay, setActiveDay] = useState("wednesday");
  const copy = locale === "en"
    ? { kicker: "CAPA 2026 PROGRAM", title: "Confirmed talks", intro: "Browse the program by day and open each talk to read its full description.", inPerson: "In person", remote: "Remote", room: "Room", details: "View talk" }
    : { kicker: "PROGRAMA CAPA 2026", title: "Charlas confirmadas", intro: "Navegá el programa por día y abrí cada charla para conocer su descripción completa.", inPerson: "Presencial", remote: "Remoto", room: "Salón", details: "Ver charla" };

  const talks = useMemo(() => capaTalks.filter((talk) => talk.day === activeDay).sort((a, b) => a.time.localeCompare(b.time)), [activeDay]);

  return (
    <section className="capa-program" id="programa">
      <div className="capa-program-heading"><p>{copy.kicker}</p><h3>{copy.title}</h3><span>{copy.intro}</span></div>
      <div className="capa-day-tabs" role="tablist" aria-label={copy.title}>
        {days.map((day) => <button key={day} role="tab" aria-selected={activeDay === day} className={activeDay === day ? "active" : ""} onClick={() => setActiveDay(day)}><strong>{dayCopy[locale][day][0]}</strong><small>{dayCopy[locale][day][1]}</small><em>{capaTalks.filter((talk) => talk.day === day).length}</em></button>)}
      </div>
      <div className="capa-room-groups" role="tabpanel">
        {rooms.map((room) => {
          const roomTalks = talks.filter((talk) => talk.room === room);
          if (!roomTalks.length) return null;
          return <section className="capa-room-group" key={room}>
            <div className="capa-room-heading"><span>{copy.room}</span><strong>{room}</strong><em>{roomTalks.length}</em></div>
            <div className="capa-talk-grid">
              {roomTalks.map((talk) => (
                <Link className="capa-talk-card" to={`/capa/charlas/${talk.id}`} key={talk.id}>
                  <div className="capa-talk-photo">{talk.photo ? <img src={talk.photo} alt={talk.name} /> : <TalkPlaceholder name={talk.name} />}<span className={`talk-mode ${talk.mode}`}>{talk.mode === "remoto" ? "💻" : "🎤"} {talk.mode === "remoto" ? copy.remote : copy.inPerson}</span></div>
                  <div className="capa-talk-body">
                    <div className="capa-talk-time"><strong>{talk.time}</strong><span>{copy.room} {talk.room}</span></div>
                    <div className="capa-talk-person"><div><h4>{talk.name}</h4><p>{talk.company}</p></div><div className="talk-origin"><span className="talk-flag" title={talk.country}><Flag country={talk.country} /></span><small>{languageNames[talk.language] || talk.language}</small></div></div>
                    <h5>{talk.title}</h5>
                    <div className="capa-talk-footer"><span className={`talk-category category-${talk.category.toLowerCase()}`}>{categoryNames[locale][talk.category] || talk.category}</span><strong>{copy.details} →</strong></div>
                  </div>
                </Link>
              ))}
            </div>
          </section>;
        })}
      </div>
    </section>
  );
}
