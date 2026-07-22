import { useEffect, useState } from "react";

export default function HackathonModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return undefined;
    const closeOnEscape = (event) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  return (
    <>
      <button className="hackathon-launcher" onClick={() => setOpen(true)}>
        <span>HACKATHON</span>
        <small>Innovación abierta →</small>
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
            <button onClick={() => setOpen(false)} aria-label="Cerrar Hackathon">×</button>
            <p>Próximamente</p>
            <h2 id="hackathon-title">Hackathon</h2>
            <h3>Ideas que alimentan el futuro</h3>
            <p className="hackathon-copy">
              Un espacio colaborativo para transformar desafíos de la industria en soluciones
              innovadoras para el ecosistema de proteínas alternativas.
            </p>
            <span className="hackathon-status">Más información muy pronto</span>
          </section>
        </div>
      )}
    </>
  );
}
