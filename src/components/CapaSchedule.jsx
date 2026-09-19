import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import capaTalks from "../data/capaTalks";
import capaProgram from "../data/capaProgram";
import { useI18n } from "../i18n/I18nContext";
import CountryFlag from "./CountryFlag";
import { getOrganizationLogo } from "../data/organizationLogos";

const days = ["wednesday", "thursday", "friday"];
const rooms = ["D", "E"];
const dayLastSlot = { wednesday: "17:20", thursday: "17:20", friday: "12:00" };
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
  ES: "Español",
  EN: "Inglés",
  PT: "Portugués",
};

function TalkPlaceholder({ name }) {
  const initials = (name || "?").split(" ").map((part) => part[0]).slice(0, 2).join("");
  return <div className="talk-photo-placeholder" aria-hidden="true"><span>{initials}</span></div>;
}

function SpeakerPortrait({ speaker }) {
  const cleanPhoto = speaker.useCleanPhoto ? speaker.cleanPhoto : null;
  const [photoSource, setPhotoSource] = useState(cleanPhoto || speaker.photo || null);

  useEffect(() => {
    setPhotoSource(cleanPhoto || speaker.photo || null);
  }, [cleanPhoto, speaker.photo]);

  const handlePhotoError = () => {
    if (photoSource === cleanPhoto && speaker.photo) setPhotoSource(speaker.photo);
    else setPhotoSource(null);
  };

  return <div className="talk-speaker-portrait">
    {photoSource
      ? <img src={photoSource} alt={speaker.name} onError={handlePhotoError} />
      : <TalkPlaceholder name={speaker.name} />}
  </div>;
}

function TalkVisualCarousel({ visuals, fallbackName }) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setActiveIndex(0);
    if (visuals.length < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const interval = window.setInterval(() => setActiveIndex((current) => (current + 1) % visuals.length), 3000);
    return () => window.clearInterval(interval);
  }, [visuals.length]);

  const activeVisual = visuals[activeIndex];
  if (!activeVisual) return <TalkPlaceholder name={fallbackName} />;
  return <>
    {activeVisual.type === "paired"
      ? <div className="talk-paired-visual" key={`${activeVisual.name}-${activeIndex}`}><SpeakerPortrait speaker={activeVisual} /><div className="talk-paired-logo">{activeVisual.logo ? <img src={activeVisual.logo} alt={`Logo de ${activeVisual.company}`} /> : <span>{activeVisual.company}</span>}</div></div>
      : activeVisual.type === "photo"
        ? <SpeakerPortrait speaker={activeVisual} key={`${activeVisual.name}-${activeIndex}`} />
        : <div className="talk-organization-visual" key={`${activeVisual.name}-${activeIndex}`}><img src={activeVisual.src} alt={`Logo de ${activeVisual.name}`} /></div>}
    {visuals.length > 1 && <span className="talk-visual-dots" aria-label={`Elemento ${activeIndex + 1} de ${visuals.length}`}>{visuals.map((visual, index) => <i className={index === activeIndex ? "active" : ""} key={`${visual.type}-${visual.name}-${index}`} />)}</span>}
  </>;
}

function getSpeakers(talk) {
  if (talk.speakers?.length) return talk.speakers;
  return [{ name: talk.name, company: talk.company, country: talk.country, photo: talk.photo, cleanPhoto: talk.cleanPhoto, logo: talk.logo, photoFit: talk.photoFit }];
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

function AutoFitTitle({ children }) {
  const titleRef = useRef(null);

  useLayoutEffect(() => {
    const title = titleRef.current;
    if (!title) return undefined;

    const fitTitle = () => {
      title.style.fontSize = "";
      const styles = window.getComputedStyle(title);
      const initialSize = Number.parseFloat(styles.fontSize);
      const minimumSize = Number.parseFloat(styles.getPropertyValue("--talk-title-min-size")) || 17;
      let size = initialSize;

      title.style.fontSize = `${size}px`;
      while (title.scrollHeight > title.clientHeight + 1 && size > minimumSize) {
        size = Math.max(minimumSize, size - 0.5);
        title.style.fontSize = `${size}px`;
      }
    };

    fitTitle();
    const observer = new ResizeObserver(fitTitle);
    observer.observe(title.parentElement);
    return () => observer.disconnect();
  }, [children]);

  return <h5 ref={titleRef}>{children}</h5>;
}

function TalkCard({ talk, copy, locale, selectedRoom }) {
  const Card = talk.id ? Link : "article";
  const returnRoom = talk.common ? selectedRoom : talk.room;
  const cardProps = talk.id ? {
    to: `/capa/charlas/${talk.id}?day=${talk.day}&room=${returnRoom || "D"}`,
    onClick: () => window.sessionStorage.setItem("capa-return-scroll", String(window.scrollY)),
  } : {};
  const speakers = getSpeakers(talk);
  const organizations = getOrganizations(talk, speakers);
  const countries = [...new Set(speakers.flatMap((speaker) => Array.isArray(speaker.country) ? speaker.country : [speaker.country]).filter(Boolean))];
  const representedOrganizations = new Set(speakers.map((speaker) => (speaker.company || talk.company || "").trim().toLocaleLowerCase()));
  const speakerVisuals = talk.logoOnly ? [{ type: "logo", name: talk.company, src: getOrganizationLogo(talk.company, talk.logo) }] : speakers.map((speaker) => ({
    ...speaker,
    type: "paired",
    useCleanPhoto: talk.day === "wednesday",
    logo: getOrganizationLogo(speaker.company || talk.company, speaker.logo),
  }));
  const additionalOrganizationVisuals = organizations.map((organization) => {
    const name = typeof organization === "string" ? organization : organization.name;
    const explicitLogo = typeof organization === "string" ? null : organization.logo;
    return { type: "logo", name, src: getOrganizationLogo(name, explicitLogo) };
  }).filter((visual) => visual.src && !representedOrganizations.has(visual.name.trim().toLocaleLowerCase()));
  const visuals = [...speakerVisuals, ...additionalOrganizationVisuals];
  return <Card className={`capa-talk-card category-border-${talk.category.toLowerCase()} ${talk.durationSlots > 1 ? `duration-slots-${talk.durationSlots}` : ""}`} {...cardProps}>
    <div className="capa-talk-photo">
      <TalkVisualCarousel visuals={visuals} fallbackName={talk.name} />
    </div>
    <div className="capa-talk-body">
      <AutoFitTitle>{talk.title || talk.name}</AutoFitTitle>
      {talk.keywords?.length > 0 && <div className="talk-card-keywords">{talk.keywords.map((keyword) => <span key={keyword}>{keyword}</span>)}</div>}
      <div className="capa-talk-person"><div className="talk-person-copy">
        <div className="talk-speaker-names">{speakers.map((speaker, index) => <h4 key={`${speaker.name}-${index}`}>{speaker.name}</h4>)}</div>
        <div className="talk-company-origin">
          <p className="talk-company-text">{organizations.map((organization) => typeof organization === "string" ? organization : organization.name).join(" · ")}</p>
          <span className={`talk-flag ${countries.length > 1 ? "multiple" : ""}`} title={countries.join(" · ") || "País no informado"}><CountryFlag country={countries.length > 1 ? countries : countries[0]} /></span>
        </div>
      </div></div>
      <div className="talk-card-meta">
        <span className="capa-talk-time"><strong>🕒 {talk.time}</strong></span>
        <span className="talk-language"><strong>{(Array.isArray(talk.language) ? talk.language : [talk.language]).map((language) => languageNames[language] || language).join(" · ")}</strong></span>
        <span className={`talk-format ${talk.mode}`}><strong>{talk.mode === "TBD" ? "TBD" : `${talk.mode === "remoto" ? "💻" : "🎤"} ${talk.mode === "remoto" ? copy.remote : copy.inPerson}`}</strong></span>
      </div>
      <div className="capa-talk-footer"><span className={`talk-category category-${talk.category.toLowerCase()}`}>{(typeof talk.categoryLabel === "object" ? talk.categoryLabel[locale] : talk.categoryLabel) || categoryNames[locale][talk.category] || talk.category}</span>{talk.id && <strong>{copy.details} →</strong>}</div>
    </div>
  </Card>;
}

export default function CapaSchedule() {
  const { locale } = useI18n();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const requestedDay = searchParams.get("day");
  const requestedRoom = searchParams.get("room");
  const [activeDay, setActiveDay] = useState(() => days.includes(requestedDay) ? requestedDay : "wednesday");
  const [activeRoom, setActiveRoom] = useState(() => rooms.includes(requestedRoom) ? requestedRoom : "D");

  useLayoutEffect(() => {
    if (!location.state?.restoreCapaScroll) return undefined;
    const savedScroll = Number(window.sessionStorage.getItem("capa-return-scroll"));
    if (!Number.isFinite(savedScroll)) return undefined;
    window.sessionStorage.removeItem("capa-return-scroll");
    const firstFrame = window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => window.scrollTo({ top: savedScroll, behavior: "auto" }));
    });
    return () => window.cancelAnimationFrame(firstFrame);
  }, [location.state]);

  const selectDay = (day) => {
    setActiveDay(day);
    setSearchParams({ day, room: activeRoom }, { replace: true });
  };

  const selectRoom = (room) => {
    setActiveRoom(room);
    setSearchParams({ day: activeDay, room }, { replace: true });
  };
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
  const visibleTimeSlots = timeSlots.filter((slot) => slot.start <= dayLastSlot[activeDay]);

  return (
    <section className="capa-program" id="programa">
      <div className="capa-program-heading"><p>{copy.kicker}</p><h3>{copy.title}</h3><span>{copy.intro}</span></div>
      <div className="capa-day-tabs" role="tablist" aria-label={copy.title}>
        {days.map((day) => <button key={day} role="tab" aria-selected={activeDay === day} className={activeDay === day ? "active" : ""} onClick={() => selectDay(day)}><strong>{dayCopy[locale][day][0]}</strong><small>{dayCopy[locale][day][1]}</small><em>{capaProgram.filter((talk) => talk.day === day && talk.kind !== "pause").length}</em></button>)}
      </div>
      <div className="capa-mobile-room-tabs" role="tablist" aria-label={locale === "en" ? "Choose a room" : "Elegir salón"}>
        {rooms.map((room) => <button type="button" role="tab" aria-selected={activeRoom === room} className={activeRoom === room ? "active" : ""} onClick={() => selectRoom(room)} key={room}>{copy.room} {room}</button>)}
      </div>
      <div className="capa-agenda-scroll" role="tabpanel">
        <div className="capa-agenda-grid">
          {rooms.map((room) => <div className="capa-agenda-header" key={room}>{copy.room} {room}</div>)}
          {visibleTimeSlots.map((slot) => {
            if (slot.common) return <div className="capa-agenda-row capa-agenda-row-common" key={slot.start}>
              <time>{slot.label}</time><div className="capa-common-activity"><span>{slot.common === "Lunch" ? "🍽️" : "☕"}</span><strong>{slot.common}</strong></div>
            </div>;
            const sharedTalk = talks.find((talk) => talk.common && talk.time.startsWith(slot.start));
            if (sharedTalk) return <div className="capa-agenda-row capa-agenda-row-shared" key={slot.start}>
              <time>{slot.label}</time><div className="capa-agenda-shared"><span className="capa-shared-label">{copy.room} D + E</span><TalkCard talk={sharedTalk} copy={copy} locale={locale} selectedRoom={activeRoom} /></div>
            </div>;
            return <div className="capa-agenda-row" key={slot.start}>
              <time>{slot.label}</time>
              {rooms.map((room) => {
                const cellTalks = talks.filter((talk) => talk.room === room && (talk.slotStart || talk.time.slice(0, 5)) === slot.start);
                const coveredByTalk = talks.some((talk) => talk.room === room && (talk.slotStart || talk.time.slice(0, 5)) < slot.start && talk.time.slice(-5) > slot.start);
                return <div className={`capa-agenda-cell ${cellTalks.length ? "has-talk" : coveredByTalk ? "is-covered" : "is-tbd"} ${activeRoom === room ? "mobile-room-active" : ""}`} data-room={`${copy.room} ${room}`} key={room}>
                  {cellTalks.length ? cellTalks.map((talk) => <TalkCard talk={talk} copy={copy} locale={locale} selectedRoom={activeRoom} key={`${talk.room}-${talk.time}-${talk.name}`} />) : coveredByTalk ? null : <span>TBD</span>}
                </div>;
              })}
            </div>;
          })}
        </div>
      </div>
    </section>
  );
}
