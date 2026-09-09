import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import capaTalks from "../data/capaTalks";
import capaProgram from "../data/capaProgram";
import { useI18n } from "../i18n/I18nContext";
import CountryFlag from "./CountryFlag";
import OrganizationLogo from "./OrganizationLogo";

const days = ["wednesday", "thursday", "friday"];
const rooms = ["D", "E"];
const timeSlots = [
  { start: "09:00", label: "09:00–09:30" },
  { start: "09:35", label: "09:35–10:20" },
  { start: "10:20", label: "10:20–10:50", common: "Break" },
  { start: "10:50", label: "10:50–11:20" },
  { start: "11:25", label: "11:25–11:55" },
  { start: "12:00", label: "12:00–12:30" },
  { start: "12:30", label: "12:30–14:00", common: "Lunch" },
  { start: "14:00", label: "14:00–14:30" },
  { start: "14:35", label: "14:35–15:05" },
  { start: "15:10", label: "15:10–15:40" },
  { start: "15:40", label: "15:40–16:10", common: "Break" },
  { start: "16:10", label: "16:10–16:40" },
  { start: "16:45", label: "16:45–17:15" },
  { start: "17:20", label: "17:20–17:50" },
];
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
  const initials = (name || "?").split(" ").map((part) => part[0]).slice(0, 2).join("");
  return <div className="talk-photo-placeholder" aria-hidden="true"><span>{initials}</span></div>;
}

function SpeakerPortrait({ speaker }) {
  const [failed, setFailed] = useState(false);
  return <div className="talk-speaker-portrait">
    {speaker.photo && !failed
      ? <img src={speaker.photo} alt={speaker.name} onError={() => setFailed(true)} />
      : <TalkPlaceholder name={speaker.name} />}
  </div>;
}

function getSpeakers(talk) {
  if (talk.speakers?.length) return talk.speakers;
  return [{ name: talk.name, company: talk.company, country: talk.country, photo: talk.photo }];
}

function getOrganizations(talk, speakers) {
  const organizations = talk.organizations?.length
    ? talk.organizations
    : speakers.map((speaker) => ({ name: speaker.company, logo: speaker.logo }));
  const seen = new Set();
  return organizations.filter((organization) => {
    const name = typeof organization === "string" ? organization : organization.name;
    const key = name?.trim().toLocaleLowerCase();
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function TalkCard({ talk, copy, locale }) {
  const Card = talk.id ? Link : "article";
  const cardProps = talk.id ? { to: `/capa/charlas/${talk.id}` } : {};
  const speakers = getSpeakers(talk);
  const organizations = getOrganizations(talk, speakers);
  const countries = [...new Set(speakers.flatMap((speaker) => Array.isArray(speaker.country) ? speaker.country : [speaker.country]).filter(Boolean))];
  return <Card className={`capa-talk-card category-border-${talk.category.toLowerCase()}`} {...cardProps}>
    <div className={`capa-talk-photo speaker-count-${Math.min(speakers.length, 4)}`}>
      {speakers.map((speaker, index) => <SpeakerPortrait speaker={speaker} key={`${speaker.name}-${index}`} />)}
      <span className={`talk-mode ${talk.mode}`}>{talk.mode === "remoto" ? "💻" : "🎤"} {talk.mode === "remoto" ? copy.remote : copy.inPerson}</span>
    </div>
    <div className="capa-talk-body">
      <div className="capa-talk-time"><strong>{talk.time}</strong><span>{copy.room} {talk.room}</span></div>
      <div className="capa-talk-person"><div className="talk-person-copy">
        {speakers.map((speaker, index) => <div className="talk-speaker-copy" key={`${speaker.name}-${index}`}><h4>{speaker.name}</h4>{speaker.company && <p>{speaker.company}</p>}</div>)}
        <div className="talk-company-logos">{organizations.map((organization) => {
          const company = typeof organization === "string" ? organization : organization.name;
          const logo = typeof organization === "string" ? null : organization.logo;
          return <OrganizationLogo company={company} logo={logo} key={company} />;
        })}</div>
      </div><div className="talk-origin"><span className={`talk-flag ${countries.length > 1 ? "multiple" : ""}`} title={countries.join(" · ") || "País no informado"}><CountryFlag country={countries.length > 1 ? countries : countries[0]} /></span><small>{languageNames[talk.language] || talk.language}</small></div></div>
      <h5>{talk.title || talk.name}</h5>
      <div className="capa-talk-footer"><span className={`talk-category category-${talk.category.toLowerCase()}`}>{categoryNames[locale][talk.category] || talk.category}</span>{talk.id && <strong>{copy.details} →</strong>}</div>
    </div>
  </Card>;
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
      <div className="capa-agenda-scroll" role="tabpanel">
        <div className="capa-agenda-grid">
          <div className="capa-agenda-header">{locale === "en" ? "Time" : "Horario"}</div>
          {rooms.map((room) => <div className="capa-agenda-header" key={room}>{copy.room} {room}</div>)}
          {timeSlots.map((slot) => {
            if (slot.common) return <div className="capa-agenda-row capa-agenda-row-common" key={slot.start}>
              <time>{slot.label}</time><div className="capa-common-activity"><span>{slot.common === "Lunch" ? "🍽️" : "☕"}</span><strong>{slot.common}</strong></div>
            </div>;
            return <div className="capa-agenda-row" key={slot.start}>
              <time>{slot.label}</time>
              {rooms.map((room) => {
                const cellTalks = talks.filter((talk) => talk.room === room && talk.time.startsWith(slot.start));
                return <div className={`capa-agenda-cell ${cellTalks.length ? "has-talk" : "is-tbd"}`} key={room}>
                  {cellTalks.length ? cellTalks.map((talk) => <TalkCard talk={talk} copy={copy} locale={locale} key={`${talk.room}-${talk.time}-${talk.name}`} />) : <span>TBD</span>}
                </div>;
              })}
            </div>;
          })}
        </div>
      </div>
    </section>
  );
}
