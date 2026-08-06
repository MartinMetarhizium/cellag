import { useEffect, useMemo, useRef, useState } from "react";
import { useI18n } from "../i18n/I18nContext";

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
    name: "Eduardo Bittencourt",
    company: "Typcal",
    country: "Brasil",
    photo: "/speakers/eduardosydney.jpeg",
    bio: "Emprendedor y científico, cofundador y CTO de Typcal. PhD en Ingeniería de Bioprocesos, autor de 25 artículos con más de 4.000 citas.",
  },
  {
    name: "Celeste Marín",
    company: "Onelab",
    country: "Argentina",
    photo: "/speakers/celeste_maribn.png",
    bio: "Licenciada en Ciencias Biológicas, con experiencia en biotecnología, calidad, GMP, escalado industrial y estrategia científico-tecnológica.",
  },
  {
    name: "Bruno Rosolem",
    company: "Amazonika Mundi",
    country: "Brasil",
    photo: "/speakers/bruno_rosolem.png",
    bio: "CCO de Amazonika Mundi. Lidera la expansión global y comercialización de fibra alimentaria innovadora elaborada con cáscara de castaña de cajú.",
  },
  {
    name: "Alysson Soares",
    company: "GFI Brasil",
    country: "Brasil",
    photo: "/speakers/alysson_soares.jpg",
    bio: "Politólogo con más de 11 años de experiencia en Relaciones Institucionales y Gubernamentales en Brasil y América Latina. Como jefe de Políticas Públicas de GFI Brasil, lidera estrategias nacionales e internacionales sobre regulación, políticas públicas y proteínas alternativas.",
  },
  {
    name: "Martín Sabatini",
    company: "Michroma",
    country: "Argentina",
    photo: "/speakers/martin_sabatini.png",
    bio: "Licenciado en Biotecnología y Doctor en Ciencias Biológicas. Como CSO de Michroma, lidera la estrategia científica, regulatoria y de escalado industrial para producir ingredientes naturales mediante fermentación de precisión y hongos filamentosos junto a equipos internacionales.",
  },
  {
    name: "Juan Martín Oteiza",
    company: "CIATI",
    country: "Argentina",
    photo: "/speakers/martin_oteiza.JPG",
    bio: "Licenciado en Ciencias Biológicas y Doctor en Ciencias Exactas por la UNLP, e Investigador Independiente del CONICET. En CIATI-Centro Tecnológico coordina I+D y se especializa en microbiología e inocuidad alimentaria, con más de 20 años de experiencia.",
  },
  {
    name: "Carla Molento",
    company: "Cell Ag Brazil",
    country: "Brasil",
    photo: "/speakers/carla_molento.jpg",
    bio: "Profesora de la UFPR y presidenta de Cell Ag Brazil. Investiga bienestar animal, carne cultivada y sistemas alimentarios libres de animales.",
  },
];

const englishSpeakerBios = {
  "Emiliano Benito": "Agricultural Engineer and cofounder of Elementa Foods, an Argentine non-GMO plant protein ingredient company operating in more than 10 countries.",
  "Pancho Piñero": "Founder of the Plant-Based Association and CEO of VNG, a leading figure in the development of the plant-based sector.",
  "Kris Blanchard": "Biotechnologist and deep-biotech entrepreneur. As CEO of Luyef Biotechnologies, he advances technologies for sustainable biomanufacturing and animal-free production.",
  "Agustín Belloso": "Cofounder and CEO of Tomorrow Foods. UBA-trained lawyer with an MBA from Cambridge, advancing innovative ingredients from regenerative crops.",
  "Lorena Pinho": "Science and Technology Specialist at GFI Brazil and regional mentor for the Alt Protein Project, with over 15 years of R&D experience in alternative proteins.",
  "María Laura Matos": "Technical Director of INTI’s Industrial Biotechnology Center. PhD in Biology specializing in industrial bioprocesses and precision fermentation.",
  "Fabio Zon": "Biotech consultant and the first member of the Chunk Foods team, connecting science and strategy to scale alternative proteins across the region.",
  "Valeria Bosio": "PhD in Chemistry and Biomedicine, trained in tissue engineering at Tufts and Harvard. Director of BIOMIT Lab and international consultant.",
  "Lucía Cragnza": "Biotechnology specialist and PhD with experience in regulation, biopharmaceutical production and technical support for bioprocesses.",
  "Mariana Sánchez": "Operational Deputy Manager for Food at INTI, specializing in innovation, technology development and value creation in food.",
  "Eduardo Bittencourt": "Entrepreneur and scientist, cofounder and CTO of Typcal. PhD in Bioprocess Engineering and author of 25 papers with more than 4,000 citations.",
  "Celeste Marín": "Biological Sciences graduate with experience in biotechnology, quality, GMP, industrial scale-up and science and technology strategy.",
  "Bruno Rosolem": "CCO of Amazonika Mundi, leading global expansion and commercialization of an innovative dietary fiber made from cashew shells.",
  "Alysson Soares": "Political scientist with over 11 years of institutional and government relations experience in Brazil and Latin America. Head of Public Policy at GFI Brazil.",
  "Martín Sabatini": "Biotechnologist and PhD in Biological Sciences. As CSO of Michroma, he leads scientific, regulatory and industrial scale-up strategy for precision-fermented natural ingredients.",
  "Juan Martín Oteiza": "Biologist, PhD in Exact Sciences from UNLP and Independent CONICET Researcher. He leads R&D at CIATI with over 20 years of food microbiology and safety experience.",
  "Carla Molento": "UFPR professor and President of Cell Ag Brazil, researching animal welfare, cultivated meat and animal-free food systems.",
};

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

function CountryFlag({ country }) {
  const commonProps = {
    className: "capa-flag-svg",
    viewBox: "0 0 36 24",
    role: "img",
    "aria-label": country,
  };

  if (country === "Argentina") {
    return <svg {...commonProps}><rect width="36" height="24" fill="#74acdf"/><rect y="8" width="36" height="8" fill="#fff"/><circle cx="18" cy="12" r="2.3" fill="#f6b40e"/></svg>;
  }
  if (country === "Brasil") {
    return <svg {...commonProps}><rect width="36" height="24" fill="#009c3b"/><path d="M18 3 32 12 18 21 4 12Z" fill="#ffdf00"/><circle cx="18" cy="12" r="5.2" fill="#002776"/><path d="M13 10.8c3.5-.8 7-.1 10 2" fill="none" stroke="#fff" strokeWidth="1"/></svg>;
  }
  if (country === "Chile") {
    return <svg {...commonProps}><rect width="36" height="24" fill="#d52b1e"/><rect width="36" height="12" fill="#fff"/><rect width="12" height="12" fill="#0039a6"/><path d="m6 2.8.8 2.1 2.2.1-1.7 1.4.6 2.2L6 7.3 4.1 8.6l.6-2.2L3 5l2.2-.1Z" fill="#fff"/></svg>;
  }
  if (country === "Israel") {
    return <svg {...commonProps}><rect width="36" height="24" fill="#fff"/><rect y="3" width="36" height="3" fill="#0038b8"/><rect y="18" width="36" height="3" fill="#0038b8"/><path d="m18 7 4.3 7.5h-8.6Zm0 10-4.3-7.5h8.6Z" fill="none" stroke="#0038b8" strokeWidth="1"/></svg>;
  }
  return <span className="capa-flag-fallback" role="img" aria-label={country}>🌎</span>;
}

export function CapaContent({ isPage = false }) {
  const { locale, t } = useI18n();
  const [timeLeft, setTimeLeft] = useState(getTimeLeft);
  const speakersTrackRef = useRef(null);

  useEffect(() => {
    const timer = window.setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const countdown = useMemo(
    () => [
      [timeLeft.days, t("capa.days")],
      [timeLeft.hours, t("capa.hours")],
      [timeLeft.minutes, t("capa.minutes")],
      [timeLeft.seconds, t("capa.seconds")],
    ],
    [timeLeft, t],
  );

  const navigateSpeakers = (direction) => {
    const track = speakersTrackRef.current;
    if (!track) return;
    const card = track.querySelector(".capa-speaker-card");
    const distance = card ? card.getBoundingClientRect().width + 15 : track.clientWidth;
    track.scrollBy({ left: direction * distance, behavior: "smooth" });
  };

  return (
    <section className={isPage ? "capa-page" : "capa-modal"} aria-labelledby="capa-title">
            <div className="capa-hero">
              <p className="capa-eyebrow">{t("capa.congress")}</p>
              <h2 id="capa-title">CAPA <span>2026</span></h2>
              <p className="capa-date">{t("capa.date")}</p>

              <div className="capa-countdown" aria-label={t("capa.countdownLabel")}>
                {countdown.map(([value, label]) => (
                  <div key={label}>
                    <strong>{String(value).padStart(2, "0")}</strong>
                    <span>{label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="capa-description">
              <p className="capa-description-kicker">{t("capa.firstCongress")}</p>
              <h3>{t("capa.descriptionTitle")}</h3>
              <p>{t("capa.description")}</p>
              <div className="capa-ticket-row">
                <a href="https://crossingoverlatam.bio/" target="_blank" rel="noreferrer">
                  {t("capa.tickets")}
                  <span aria-hidden="true">↗</span>
                </a>
                <div className="capa-discount" aria-label={t("capa.discountLabel")}>
                  <span>{t("capa.discount")}</span>
                  <strong>CAPAXO</strong>
                </div>
              </div>
            </div>

            <div className="capa-speakers">
              <div className="capa-speakers-header">
                <div className="capa-section-heading">
                  <p>{t("capa.voices")}</p>
                  <h3>{t("capa.speakers")}</h3>
                </div>
                <div className="capa-speaker-controls" aria-label="Navegación de speakers">
                  <button onClick={() => navigateSpeakers(-1)} aria-label={t("capa.previous")}>←</button>
                  <button onClick={() => navigateSpeakers(1)} aria-label={t("capa.next")}>→</button>
                </div>
              </div>
              <div className="capa-speaker-grid" ref={speakersTrackRef} tabIndex="0">
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
                        <span className="capa-country-flag" title={speaker.country}>
                          <CountryFlag country={speaker.country} />
                        </span>
                      </div>
                      <p>{locale === "en" ? englishSpeakerBios[speaker.name] || speaker.bio : speaker.bio}</p>
                    </div>
                  </article>
                ))}
              </div>
              <a className="capa-cta" href="/events/capa-2026">{t("capa.details")}</a>
            </div>
    </section>
  );
}

export default function CapaModal() {
  const [open, setOpen] = useState(false);

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

  return (
    <>
      <button className="capa-launcher" onClick={() => setOpen(true)}>
        <span className="capa-launcher-kicker">21 OCT 2026</span>
        <span>CAPA</span>
        <small>Conocé el congreso →</small>
      </button>
      {open && (
        <div className="capa-backdrop" role="presentation" onMouseDown={() => setOpen(false)}>
          <div onMouseDown={(event) => event.stopPropagation()}>
            <button className="capa-close" onClick={() => setOpen(false)} aria-label="Cerrar CAPA">×</button>
            <CapaContent />
          </div>
        </div>
      )}
    </>
  );
}
