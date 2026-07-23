import { useEffect, useState } from "react";

const dates = [
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

const participationSteps = [
  "Completá el formulario de inscripción durante el período de convocatoria.",
  "Si sos aceptado, te sumás a un equipo asignado a uno de los desafíos propuestos por las empresas participantes.",
  "Participás del kick-off virtual, donde conocés el desafío y a tus mentores.",
  "Desarrollás tu propuesta durante las semanas de trabajo remoto, con acompañamiento de mentores.",
  "Entregás tu propuesta antes de la fecha límite.",
  "Si tu equipo queda entre los 3 finalistas, viajás a Buenos Aires para presentar tu pitch y competir por el premio.",
];

const formUrl = "https://docs.google.com/forms/d/e/1FAIpQLScOtTB88KcgFRIxpaTxmaj9r253b1zDIWDvxJkCBblXfVWM8g/viewform?usp=header";

export default function HackathonModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return undefined;
    const closeOnEscape = (event) => event.key === "Escape" && setOpen(false);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  return (
    <>
      <button className="hackathon-launcher" onClick={() => setOpen(true)}>
        <span>HACKATHON</span>
        <small>LatAm · Conocé más →</small>
      </button>
      {open && (
        <div className="hackathon-backdrop" role="presentation" onMouseDown={() => setOpen(false)}>
          <section
            className="hackathon-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="hackathon-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button className="hackathon-close" onClick={() => setOpen(false)} aria-label="Cerrar Hackathon">×</button>

            <header className="hackathon-hero">
              <p>Primera edición regional</p>
              <h2 id="hackathon-title">Hackathon de Proteínas Alternativas</h2>
              <h3>LatAm · Sumate y viajá a Buenos Aires</h3>
              <p>
                Cell Ag Argentina, junto con el Good Food Institute, organiza el primer hackathon
                de proteínas alternativas de Latinoamérica, en el marco de CAPA / Crossing Over
                LatAm Bioexpo, del 21 al 23 de octubre de 2026 en Buenos Aires.
              </p>
              <a href={formUrl} target="_blank" rel="noreferrer">Inscribite ahora ↗</a>
            </header>

            <div className="hackathon-content">
              <section>
                <p className="hackathon-eyebrow">La convocatoria</p>
                <h3>Innovación regional con desafíos reales</h3>
                <p>
                  La convocatoria está abierta a estudiantes, investigadores, docentes y
                  profesionales de toda Latinoamérica interesados en innovar en proteínas
                  alternativas. Empresas del sector proponen desafíos reales y aportan mentores
                  para acompañar a los equipos durante todo el proceso.
                </p>
                <div className="hackathon-stages">
                  <article><strong>01</strong><h4>Clasificación remota</h4><p>Abierta a todas las personas inscriptas de la región.</p></article>
                  <article><strong>02</strong><h4>Final en Buenos Aires</h4><p>Los 3 equipos finalistas presentan su propuesta ante un jurado durante el Congreso.</p></article>
                </div>
              </section>

              <section>
                <p className="hackathon-eyebrow">Paso a paso</p>
                <h3>Cómo participar</h3>
                <ol className="hackathon-steps">
                  {participationSteps.map((step, index) => <li key={step}><span>{index + 1}</span><p>{step}</p></li>)}
                </ol>
              </section>

              <section>
                <p className="hackathon-eyebrow">Agenda</p>
                <h3>Fechas clave para participantes</h3>
                <div className="hackathon-dates">
                  {dates.map(([date, event]) => (
                    <div key={`${date}-${event}`}><time>{date}</time><p>{event}</p></div>
                  ))}
                </div>
              </section>

              <section className="hackathon-info-grid">
                <article>
                  <p className="hackathon-eyebrow">¿Quién puede participar?</p>
                  <h3>Talento universitario de toda Latinoamérica</h3>
                  <p>Estudiantes con interés en proteínas alternativas, biotecnología, innovación alimentaria o desarrollo de negocios en el sector.</p>
                </article>
                <article>
                  <p className="hackathon-eyebrow">Respaldo institucional</p>
                  <h3>Cell Ag Argentina + GFI</h3>
                  <p>Con el respaldo del Good Food Institute y en el marco de CAPA / Crossing Over LatAm Bioexpo.</p>
                </article>
              </section>

              <section className="hackathon-legal">
                <div><p className="hackathon-eyebrow">Términos y condiciones</p><h3>Consultá las bases completas</h3></div>
                <a href={formUrl} target="_blank" rel="noreferrer">Ver formulario y condiciones ↗</a>
              </section>
            </div>
          </section>
        </div>
      )}
    </>
  );
}
