import { useState, useEffect } from "react";

const imagenes = [
  "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1600&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1600&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600&auto=format&fit=crop&q=80",
];

export default function Hero() {
  const [index, setIndex] = useState(0);

  const next = () => setIndex((i) => (i + 1) % imagenes.length);
  const prev = () => setIndex((i) => (i === 0 ? imagenes.length - 1 : i - 1));

  // Auto-play cada 5 segundos
  useEffect(() => {
    const timer = setInterval(() => {
      next();
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div id="inicio" className="w-full flex flex-col bg-[#f4f0eb] pt-10 md:pt-14">
      <div className="w-full py-12 flex flex-col items-center justify-center border-b border-[var(--color-border)] bg-[var(--color-bg-custom)] select-none">
        {/* Título */}
        <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl tracking-[0.15em] text-black font-caveat text-center">TENUE</h1>

        {/* Subtítulo */}
        <div className="flex items-center gap-4 mt-3 w-full max-w-[420px] px-6">
          <span className="flex-1 h-[1px] bg-[var(--color-text-secondary)]/40" />
          <span className="text-xs md:text-sm tracking-[0.45em] text-[var(--color-text-primary)] font-light uppercase pl-[0.45em]">Indumentaria</span>
          <span className="flex-1 h-[1px] bg-[var(--color-text-secondary)]/40" />
        </div>
      </div>

      {/* Carrusel */}
      <section className="relative w-full h-[75vh] md:h-[80vh] overflow-hidden bg-black">
        <img src={imagenes[index]} alt="Slide" className="w-full h-full object-cover transition-opacity duration-700" />

        {/* Flecha Izquierda */}
        <button onClick={prev} aria-label="Anterior" className="absolute left-6 top-1/2 -translate-y-1/2 text-white text-5xl z-20 select-none hover:opacity-75 transition-opacity">
          ‹
        </button>

        {/* Flecha Derecha */}
        <button onClick={next} aria-label="Siguiente" className="absolute right-6 top-1/2 -translate-y-1/2 text-white text-5xl z-20 select-none hover:opacity-75 transition-opacity">
          ›
        </button>
      </section>
    </div>
  );
}
