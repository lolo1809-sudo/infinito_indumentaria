import { useState, useEffect } from "react";

const paresDeImagenes = [
  ["/img1.webp", "/img2.webp"],
  ["/img3.webp", "/img4.webp"],
];

export default function Hero() {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((i) => (i + 1) % paresDeImagenes.length);
  const prev = () => setIndex((i) => (i === 0 ? paresDeImagenes.length - 1 : i - 1));

  useEffect(() => {
    const timer = setInterval(() => {
      next();
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div id="inicio" className="w-full flex flex-col bg-[var(--color-bg-secondary)] pt-10 md:pt-14">
      {/* Título */}
      <div className="w-full py-12 flex flex-col items-center justify-center border-b border-[var(--color-border)] bg-[var(--color-bg-custom)] select-none">
        <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl tracking-[0.15em] text-[var(--color-text-primary)] font-caveat text-center">TENUE</h1>
        <div className="flex items-center gap-4 mt-3 w-full max-w-[420px] px-6">
          <span className="flex-1 h-[1px] bg-[var(--color-accent)]/40" />
          <span className="text-xs md:text-sm tracking-[0.45em] text-[var(--color-accent)] font-medium uppercase pl-[0.45em]">Indumentaria</span>
          <span className="flex-1 h-[1px] bg-[var(--color-accent)]/40" />
        </div>
      </div>

      {/* Carrusel */}
      <section className="relative w-full h-[65vh] sm:h-[70vh] md:h-[75vh] overflow-hidden bg-[var(--color-bg-custom)] px-4 md:px-12 flex items-center justify-center">
        <div className="w-full h-full max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 items-center justify-center">
          {paresDeImagenes[index].map((imgSrc, idx) => (
            <div
              key={idx}
              className={`relative w-full h-[55vh] sm:h-[60vh] md:h-[68vh] rounded-[var(--radius-custom)] overflow-hidden bg-[var(--color-bg-card)] shadow-sm border border-[var(--color-border)] items-center justify-center group ${
                idx === 1 ? "hidden md:flex" : "flex"
              }`}
            >
              <img src={imgSrc} alt={`Slide ${index}-${idx}`} className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute top-3 right-3 bg-[var(--color-bg-custom)]/90 text-[var(--color-accent)] text-xs tracking-widest px-3 py-1 rounded-full uppercase font-medium shadow-sm border border-[var(--color-border)]">
                Tenue
              </div>
            </div>
          ))}
        </div>

        {/* Flecha Izquierda */}
        <button
          onClick={prev}
          aria-label="Anterior"
          className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-[var(--color-bg-custom)]/85 hover:bg-[var(--color-accent)] hover:text-white text-[var(--color-text-primary)] rounded-full flex items-center justify-center text-2xl md:text-3xl z-20 shadow-md transition-all border border-[var(--color-border)]"
        >
          ‹
        </button>

        {/* Flecha Derecha */}
        <button
          onClick={next}
          aria-label="Siguiente"
          className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-[var(--color-bg-custom)]/85 hover:bg-[var(--color-accent)] hover:text-white text-[var(--color-text-primary)] rounded-full flex items-center justify-center text-2xl md:text-3xl z-20 shadow-md transition-all border border-[var(--color-border)]"
        >
          ›
        </button>

        {/* Indicadores */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {paresDeImagenes.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-2 rounded-full transition-all ${index === i ? "w-8 bg-[var(--color-accent)]" : "w-2 bg-[var(--color-border)]"}`}
              aria-label={`Ir a diapositiva ${i + 1}`}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
