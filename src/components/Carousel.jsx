import { useEffect, useRef, useState } from "react";

export default function Carousel({
  slides = [],
  autoPlayMs = 5000,
  aspect = "aspect-[4/3]",
}) {
  const [index, setIndex] = useState(0);
  const timer = useRef(null);

  const next = () => setIndex((i) => (i + 1) % slides.length);
  const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length);
  const goTo = (i) => setIndex(i);

  useEffect(() => {
    if (!slides.length || slides.length === 1) return;
    timer.current = setInterval(next, autoPlayMs);
    return () => clearInterval(timer.current);
  }, [slides.length, autoPlayMs]);

  if (!slides.length) return null;

  return (
    <div className="relative w-full overflow-hidden rounded-2xl shadow-lg">
      <div className={`relative w-full ${aspect} bg-white`}>
        {slides.map((s, i) => (
          <a
            key={i}
            href={s.href || "#"}
            target={s.href ? "_blank" : "_self"}
            rel="noreferrer"
            className={`absolute inset-0 flex items-center justify-center transition-opacity duration-700 ${
              i === index ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <img
              src={s.src}
              alt={s.alt || `slide-${i + 1}`}
              className="max-h-full max-w-full object-contain"
              loading="lazy"
            />
          </a>
        ))}
      </div>

      {slides.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 px-3 py-2 hover:bg-white"
          >
            ‹
          </button>

          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 px-3 py-2 hover:bg-white"
          >
            ›
          </button>

          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`h-2 w-2 rounded-full ${
                  i === index ? "bg-green-700" : "bg-green-300"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}