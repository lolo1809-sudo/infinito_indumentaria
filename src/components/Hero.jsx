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
    <div id="inicio" className="w-full flex flex-col bg-black pt-16 md:pt-20">
      {/* Logo Vectorial KALMA */}
      <div className="w-full py-8 flex items-center justify-center border-b border-neutral-900 bg-black">
        <div className="flex flex-col items-center select-none">
          <svg viewBox="0 0 300 40" className="w-56 md:w-72 h-auto text-white overflow-visible" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
            {/* K */}
            <path d="M 12 4 L 12 36" />
            <path d="M 32 6 L 13 22 L 32 36" />

            {/* A */}
            <path d="M 72 36 L 85 4 L 98 36" />

            {/* L */}
            <path d="M 140 4 L 140 36 L 160 36" />

            {/* M */}
            <path d="M 198 36 L 198 4 L 211 24 L 224 4 L 224 36" />

            {/* A */}
            <path d="M 260 36 L 273 4 L 286 36" />
          </svg>

          {/* Subtítulo — INDUMENTARIA — */}
          <div className="flex items-center gap-3 mt-3">
            <span className="w-8 h-[1px] bg-neutral-600"></span>
            <span className="text-[10px] md:text-xs tracking-[0.35em] text-neutral-300 font-light uppercase">INDUMENTARIA</span>
            <span className="w-8 h-[1px] bg-neutral-600"></span>
          </div>
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
