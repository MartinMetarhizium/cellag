import { useI18n } from "../i18n/I18nContext";

const datesEs = [
  ["15 de julio de 2026", "Apertura de inscripciones"],
  ["31 de agosto de 2026", "Cierre de inscripciones — última fecha para aplicar"],
  ["1–6 de septiembre de 2026", "Evaluación de las aplicaciones recibidas"],
  ["7 de septiembre de 2026", "Comunicación de aceptaciones y armado de equipos"],
  ["28 de agosto de 2026", "Confirmación de participación de las personas aceptadas"],
  ["14 de septiembre de 2026", "Kick-off virtual: presentación del hackathon, los desafíos y los equipos"],
  ["14–23 de septiembre de 2026", "Desarrollo remoto de las propuestas, con mentorías incluidas"],
  ["25 de septiembre de 2026", "Presentación de propuestas"],
  ["28 de septiembre de 2026", "Nominación de los 3 equipos finalistas"],
  ["23 de octubre de 2026", "Final presencial, pitch y premiación en CAPA / Crossing Over LatAm Bioexpo"],
];

const datesEn = [
  ["July 15, 2026", "Registration opens"], ["August 31, 2026", "Registration closes — final application deadline"], ["September 1–6, 2026", "Application review"], ["September 7, 2026", "Acceptance notices and team formation"], ["August 28, 2026", "Accepted participants confirm participation"], ["September 14, 2026", "Virtual kick-off: hackathon, challenges and teams"], ["September 14–23, 2026", "Remote proposal development with mentoring"], ["September 25, 2026", "Proposal submission"], ["September 28, 2026", "Three finalist teams announced"], ["October 23, 2026", "In-person final, pitches and awards at CAPA / Crossing Over LatAm Bioexpo"],
];

const participationSteps = [
  "Completá el formulario de inscripción durante el período de convocatoria.",
  "Si sos aceptado, te sumás a un equipo asignado a uno de los desafíos propuestos por las empresas participantes.",
  "Participás del kick-off virtual, donde conocés el desafío y a tus mentores.",
  "Desarrollás tu propuesta durante las semanas de trabajo remoto, con acompañamiento de mentores.",
  "Entregás tu propuesta antes de la fecha límite.",
  "Si tu equipo queda entre los 3 finalistas, viajás a Buenos Aires para presentar tu pitch y competir por el premio.",
];

const participationStepsEn = ["Complete the registration form during the application period.", "If accepted, you will join a team assigned to one of the challenges proposed by participating companies.", "Attend the virtual kick-off to meet your challenge and mentors.", "Develop your proposal during the remote work period with mentor support.", "Submit your proposal before the deadline.", "If your team is one of the three finalists, travel to Buenos Aires to pitch and compete for the prize."];

const copy = {
  es: { edition: "Primera edición regional", title: "Hackathon de Proteínas Alternativas", subtitle: "LatAm · Sumate y viajá a Buenos Aires", intro: "Cell Ag Argentina, junto con el Good Food Institute, organiza el primer hackathon de proteínas alternativas de Latinoamérica, en el marco de CAPA / Crossing Over LatAm Bioexpo, del 21 al 23 de octubre de 2026 en Buenos Aires.", apply: "Inscribite ahora ↗", call: "La convocatoria", real: "Innovación regional con desafíos reales", callText: "La convocatoria está abierta a estudiantes, investigadores, docentes y profesionales de toda Latinoamérica interesados en innovar en proteínas alternativas. Empresas del sector proponen desafíos reales y aportan mentores para acompañar a los equipos durante todo el proceso.", remote: "Clasificación remota", remoteText: "Abierta a todas las personas inscriptas de la región.", final: "Final en Buenos Aires", finalText: "Los 3 equipos finalistas presentan su propuesta ante un jurado durante el Congreso.", step: "Paso a paso", how: "Cómo participar", agenda: "Agenda", dates: "Fechas clave para participantes", who: "¿Quién puede participar?", talent: "Talento universitario de toda Latinoamérica", talentText: "Estudiantes con interés en proteínas alternativas, biotecnología, innovación alimentaria o desarrollo de negocios en el sector.", backing: "Respaldo institucional", backingText: "Con el respaldo del Good Food Institute y en el marco de CAPA / Crossing Over LatAm Bioexpo.", terms: "Términos y condiciones", full: "Consultá las bases completas", form: "Ver formulario y condiciones ↗" },
  en: { edition: "First regional edition", title: "Alternative Protein Hackathon", subtitle: "LatAm · Join and travel to Buenos Aires", intro: "Cell Ag Argentina and the Good Food Institute are organizing Latin America’s first alternative protein hackathon as part of CAPA / Crossing Over LatAm Bioexpo, held October 21–23, 2026 in Buenos Aires.", apply: "Apply now ↗", call: "Open call", real: "Regional innovation tackling real challenges", callText: "The call is open to students, researchers, educators and professionals throughout Latin America interested in alternative protein innovation. Sector companies propose real challenges and provide mentors to guide teams throughout the process.", remote: "Remote qualifier", remoteText: "Open to all registered participants in the region.", final: "Buenos Aires final", finalText: "The three finalist teams present their proposals to a jury during the Congress.", step: "Step by step", how: "How to participate", agenda: "Schedule", dates: "Key dates for participants", who: "Who can participate?", talent: "University talent from across Latin America", talentText: "Students interested in alternative proteins, biotechnology, food innovation or business development in the sector.", backing: "Institutional support", backingText: "Supported by the Good Food Institute and held within CAPA / Crossing Over LatAm Bioexpo.", terms: "Terms and conditions", full: "Read the complete rules", form: "View form and conditions ↗" },
};

const formUrl = "https://docs.google.com/forms/d/e/1FAIpQLScOtTB88KcgFRIxpaTxmaj9r253b1zDIWDvxJkCBblXfVWM8g/viewform?usp=header";

export default function Hackathon() {
  const { locale } = useI18n();
  const c = copy[locale];
  const dates = locale === "en" ? datesEn : datesEs;
  const steps = locale === "en" ? participationStepsEn : participationSteps;
  return (
    <div className="hackathon-page">
      <header className="hackathon-hero">
        <p>{c.edition}</p><h1>{c.title}</h1><h2>{c.subtitle}</h2><p>{c.intro}</p>
        <a href={formUrl} target="_blank" rel="noreferrer">{c.apply}</a>
      </header>

      <div className="hackathon-content">
        <section>
          <p className="hackathon-eyebrow">{c.call}</p><h3>{c.real}</h3><p>{c.callText}</p>
          <div className="hackathon-stages">
            <article><strong>01</strong><h4>{c.remote}</h4><p>{c.remoteText}</p></article>
            <article><strong>02</strong><h4>{c.final}</h4><p>{c.finalText}</p></article>
          </div>
        </section>

        <section>
          <p className="hackathon-eyebrow">{c.step}</p><h3>{c.how}</h3>
          <ol className="hackathon-steps">
            {steps.map((step, index) => <li key={step}><span>{index + 1}</span><p>{step}</p></li>)}
          </ol>
        </section>

        <section>
          <p className="hackathon-eyebrow">{c.agenda}</p><h3>{c.dates}</h3>
          <div className="hackathon-dates">
            {dates.map(([date, event]) => (
              <div key={`${date}-${event}`}><time>{date}</time><p>{event}</p></div>
            ))}
          </div>
        </section>

        <section className="hackathon-info-grid">
          <article>
            <p className="hackathon-eyebrow">{c.who}</p><h3>{c.talent}</h3><p>{c.talentText}</p>
          </article>
          <article>
            <p className="hackathon-eyebrow">{c.backing}</p>
            <h3>Cell Ag Argentina + GFI</h3>
            <p>{c.backingText}</p>
          </article>
        </section>

        <section className="hackathon-legal">
          <div><p className="hackathon-eyebrow">{c.terms}</p><h3>{c.full}</h3></div>
          <a href={formUrl} target="_blank" rel="noreferrer">{c.form}</a>
        </section>
      </div>
    </div>
  );
}
