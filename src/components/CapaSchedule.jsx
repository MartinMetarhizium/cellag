import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import capaTalks from "../data/capaTalks";
import capaProgram from "../data/capaProgram";
import { useI18n } from "../i18n/I18nContext";
import CountryFlag from "./CountryFlag";

const days = ["wednesday", "thursday", "friday"];
const rooms = ["D", "E"];
const dayCopy = {
  es: { wednesday: ["Miércoles", "21 OCT"], thursday: ["Jueves", "22 OCT"], friday: ["Viernes", "23 OCT"] },
  en: { wednesday: ["Wednesday", "OCT 21"], thursday: ["Thursday", "OCT 22"], friday: ["Friday", "OCT 23"] },
};

const categoryNames = {
  es: { PB: "Proteínas vegetales", CA: "Agricultura celular", FE: "Fermentación", PP: "Políticas públicas", IS: "Innovation Spotlight", UN: "Universidades", AD: "Divulgación", GE: "Programa general" },
  en: { PB: "Plant-based proteins", CA: "Cellular agriculture", FE: "Fermentation", PP: "Public policy", IS: "Innovation Spotlight", UN: "Universities", AD: "Advocacy", GE: "General program" },
};

const languageNames = {
  ES: "Spanish",
  EN: "English",
  PT: "Portuguese",
};

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

  const talks = useMemo(() => capaProgram
    .filter((item) => item.day === activeDay)
    .map((item) => {
      const details = item.detailsId ? capaTalks.find((talk) => talk.id === item.detailsId) : null;
      return { ...details, ...item, id: item.detailsId || null };
    })
    .sort((a, b) => a.time.localeCompare(b.time)), [activeDay]);

  return (
    <section className="capa-program" id="programa">
      <div className="capa-program-heading"><p>{copy.kicker}</p><h3>{copy.title}</h3><span>{copy.intro}</span></div>
      <div className="capa-day-tabs" role="tablist" aria-label={copy.title}>
        {days.map((day) => <button key={day} role="tab" aria-selected={activeDay === day} className={activeDay === day ? "active" : ""} onClick={() => setActiveDay(day)}><strong>{dayCopy[locale][day][0]}</strong><small>{dayCopy[locale][day][1]}</small><em>{capaProgram.filter((talk) => talk.day === day && talk.kind !== "pause").length}</em></button>)}
      </div>
      <div className="capa-room-groups" role="tabpanel">
        {rooms.map((room) => {
          const roomTalks = talks.filter((talk) => talk.room === room);
          if (!roomTalks.length) return null;
          return <section className="capa-room-group" key={room}>
            <div className="capa-room-heading"><span>{copy.room}</span><strong>{room}</strong><em>{roomTalks.filter((talk) => talk.kind !== "pause").length}</em></div>
            <div className="capa-talk-grid">
              {roomTalks.map((talk) => {
                if (talk.kind === "pause") return <div className="capa-program-break" key={`${talk.room}-${talk.time}-${talk.name}`}><strong>{talk.time}</strong><span>{talk.name}</span></div>;
                const Card = talk.id ? Link : "article";
                const cardProps = talk.id ? { to: `/capa/charlas/${talk.id}` } : {};
                return (
                <Card className={`capa-talk-card category-border-${talk.category.toLowerCase()}`} {...cardProps} key={`${talk.room}-${talk.time}-${talk.name}`}>
                  <div className="capa-talk-photo">{talk.photo ? <img src={talk.photo} alt={talk.name} /> : <TalkPlaceholder name={talk.name} />}<span className={`talk-mode ${talk.mode}`}>{talk.mode === "remoto" ? "💻" : "🎤"} {talk.mode === "remoto" ? copy.remote : copy.inPerson}</span></div>
                  <div className="capa-talk-body">
                    <div className="capa-talk-time"><strong>{talk.time}</strong><span>{copy.room} {talk.room}</span></div>
                    <div className="capa-talk-person"><div><h4>{talk.name}</h4><p>{talk.company}</p></div><div className="talk-origin"><span className={`talk-flag ${Array.isArray(talk.country) ? "multiple" : ""}`} title={Array.isArray(talk.country) ? talk.country.join(" · ") : talk.country || "País no informado"}><CountryFlag country={talk.country} /></span><small>{languageNames[talk.language] || talk.language}</small></div></div>
                    <h5>{talk.title || talk.name}</h5>
                    <div className="capa-talk-footer"><span className={`talk-category category-${talk.category.toLowerCase()}`}>{categoryNames[locale][talk.category] || talk.category}</span>{talk.id && <strong>{copy.details} →</strong>}</div>
                  </div>
                </Card>
              );})}
            </div>
          </section>;
        })}
      </div>
    </section>
  );
}
