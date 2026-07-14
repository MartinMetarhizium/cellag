import { useEffect, useMemo, useState } from "react";

const EVENT_DATE = new Date("2026-10-21T09:00:00-03:00");

const speakers = [
  {
    name: "Emiliano Benito",
    company: "Elementa Foods",
    country: "Argentina",
    photo: "/speakers/emiliano-screen.png",
    photoClassName: "capa-photo-emiliano",
    bio: "Ingeniero Agrónomo y cofundador de Elementa Foods, empresa argentina de ingredientes proteicos vegetales non-GMO con presencia en más de 10 países.",
  },
  {
    name: "Pancho Piñero",
    company: "Asociación de Productores a Base de Plantas",
    country: "Argentina",
    photo: "/speakers/pancho_piñero.jpeg",
    bio: "Fundador de la Asociación a Base de Plantas y CEO de VNG, referente en el desarrollo del sector plant-based.",
  },
  {
    name: "Kris Blanchard",
    company: "Luyef",
    country: "Chile",
    photo: "/speakers/kris_blanchard.jpg",
    bio: "Biotecnólogo y emprendedor deep-biotech. Como CEO de Luyef Biotechnologies, impulsa tecnologías para biomanufactura sostenible y producción animal-free.",
  },
  {
    name: "Agustín Belloso",
    company: "Tomorrow Foods",
    country: "Argentina",
    photo: "/speakers/agustin_belloso.jpg",
    bio: "Cofundador y CEO de Tomorrow Foods. Abogado por la UBA y MBA por Cambridge; impulsa ingredientes innovadores a partir de cultivos regenerativos.",
  },
  {
    name: "Lorena Pinho",
    company: "Good Food Institute",
    country: "Brasil",
    photo: "/team/lorena-pinho.jpeg",
    bio: "Especialista en Ciencia y Tecnología en GFI Brasil y mentora regional del Alt Protein Project. Ingeniera y doctora en alimentos, con más de 15 años de experiencia en I+D aplicada a proteínas alternativas.",
  },
  {
    name: "María Laura Matos",
    company: "INTI",
    country: "Argentina",
    photo: "/team/laura-matos.jpeg",
    bio: "Directora Técnica del Centro de Biotecnología Industrial del INTI. Doctora en Biología, especializada en bioprocesos industriales y fermentación de precisión.",
  },
  {
    name: "Fabio Zon",
    company: "Chunk Foods",
    country: "Israel",
    photo: "/speakers/fabio_zon.jpg",
    bio: "Consultor en biotech y primer miembro del equipo de Chunk Foods. Une ciencia y estrategia para el escalado de proteínas alternativas en la región.",
  },
  {
    name: "Valeria Bosio",
    company: "UNLP",
    country: "Argentina", 
    photo: "/speakers/valeria_bosio.png",
    bio: "Doctora en Química y en Biomedicina. Se formó en ingeniería de tejidos en Tufts University y Harvard, dirige BIOMIT Lab y es consultora internacional.",
  },
  {
    name: "Lucía Cragnza",
    company: "Sartorius",
    country: "Argentina",
    photo: "/speakers/fotoLC.jpg",
    bio: "Especialista y PhD en biotecnología, con experiencia en regulación, producción biofarmacéutica y soporte técnico en bioprocesos.",
  },
  {
    name: "Mariana Sánchez",
    company: "INTI",
    country: "Argentina",
    photo: "/team/mariana-sanchez.jpeg",
    bio: "Subgerente Operativa de Alimentos en INTI. Especialista en innovación, desarrollo tecnológico y agregado de valor en alimentos.",
  },
  {
    name: "Celina Moreno",
    company: "SAGyP",
    country: "Argentina",
    bio: "Subsecretaria de Economía.",
  },
  {
    name: "Eduardo Bittencourt",
    company: "Typcal",
    country: "Brasil",
    photo: "/speakers/eduardosydney.jpeg",
    bio: "Emprendedor y científico, cofundador y CTO de Typcal. PhD en Ingeniería de Bioprocesos, autor de 25 artículos con más de 4.000 citas.",
  },
];

function getTimeLeft() {
  const distance = Math.max(0, EVENT_DATE.getTime() - Date.now());
  return {
    days: Math.floor(distance / 86400000),
    hours: Math.floor((distance / 3600000) % 24),
    minutes: Math.floor((distance / 60000) % 60),
    seconds: Math.floor((distance / 1000) % 60),
  };
}

function SpeakerPlaceholder() {
  return (
    <div className="capa-speaker-placeholder" aria-hidden="true">
      <svg viewBox="0 0 120 120" role="img">
        <circle cx="60" cy="43" r="23" />
        <path d="M18 112c2-28 18-42 42-42s40 14 42 42" />
      </svg>
    </div>
  );
}

export default function CapaModal() {
  const [open, setOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState(getTimeLeft);

  useEffect(() => {
    const timer = window.setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = (event) => event.key === "Escape" && setOpen(false);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const countdown = useMemo(
    () => [
      [timeLeft.days, "días"],
      [timeLeft.hours, "horas"],
      [timeLeft.minutes, "min"],
      [timeLeft.seconds, "seg"],
    ],
    [timeLeft],
  );

  return (
    <>
      <button className="capa-launcher" onClick={() => setOpen(true)}>
        <span className="capa-launcher-kicker">21 OCT 2026</span>
        <span>CAPA</span>
        <small>Conocé el congreso →</small>
      </button>

      {open && (
        <div className="capa-backdrop" role="presentation" onMouseDown={() => setOpen(false)}>
          <section
            className="capa-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="capa-title"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button className="capa-close" onClick={() => setOpen(false)} aria-label="Cerrar CAPA">
              ×
            </button>

            <div className="capa-hero">
              <p className="capa-eyebrow">Congreso Argentino de Proteínas Alternativas</p>
              <h2 id="capa-title">CAPA <span>2026</span></h2>
              <p className="capa-date">21–23 de octubre · Buenos Aires</p>

              <div className="capa-countdown" aria-label="Cuenta regresiva para CAPA 2026">
                {countdown.map(([value, label]) => (
                  <div key={label}>
                    <strong>{String(value).padStart(2, "0")}</strong>
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="capa-speakers">
              <div className="capa-section-heading">
                <p>Voces que transforman</p>
                <h3>Speakers</h3>
              </div>
              <div className="capa-speaker-grid">
                {speakers.map((speaker, index) => (
                  <article className="capa-speaker-card" key={`${speaker.name}-${index}`}>
                    {speaker.photo ? (
                      <div className={`capa-speaker-photo ${speaker.photoClassName || ""}`}>
                        <img src={speaker.photo} alt={speaker.name} />
                      </div>
                    ) : <SpeakerPlaceholder />}
                    <div>
                      <h4>{speaker.name}</h4>
                      <div className="capa-speaker-meta">
                        <strong>{speaker.company}</strong>
                        <span>{speaker.country}</span>
                      </div>
                      <p>{speaker.bio}</p>
                    </div>
                  </article>
                ))}
              </div>
              <a className="capa-cta" href="/events/capa-2026">Ver detalles del evento</a>
            </div>
          </section>
        </div>
      )}
    </>
  );
}
