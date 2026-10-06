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
      {/* Logo Dali Boutique */}
      <div className="w-full py-8 flex items-center justify-center border-b border-[#dcd4c8] bg-[#f4f0eb]">
        <div className="flex flex-col items-center select-none">
          <svg viewBox="0 0 350 260" className="w-64 md:w-80 h-auto overflow-visible" fill="none">
            {/* 1. Trazo cursivo continuo: D (bucle principal y cola inferior larga) */}
            <path
              d="M 35 125 
                 C 45 55, 95 40, 135 55 
                 C 175 65, 180 125, 150 160 
                 C 125 190, 90 195, 65 195 
                 C 40 195, 35 220, 60 220 
                 C 100 220, 150 195, 200 180"
              stroke="#ff1493"
              strokeWidth="8.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* 2. Asta recta vertical de la D */}
            <path d="M 90 35 L 90 195" stroke="#ff1493" strokeWidth="8.5" strokeLinecap="round" />

            {/* 3. Letra 'a': Óvalo completamente separado de la D */}
            <path
              d="M 195 142 
                 C 175 132, 155 152, 162 175 
                 C 168 195, 192 192, 200 172 
                 C 205 159, 202 145, 195 142 Z"
              stroke="#ff1493"
              strokeWidth="8.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* 4. Pata de la 'a' que conecta con el bucle cruzado perfecto de la 'l' */}
            <path
              d="M 195 142 
                 C 195 162, 192 185, 205 182 
                 C 220 177, 235 130, 240 95 
                 C 243 75, 223 75, 223 95 
                 C 223 135, 233 185, 243 192 
                 C 253 200, 270 180, 280 160"
              stroke="#ff1493"
              strokeWidth="8.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* 5. Maniquí ('i') replicando silueta y proporciones exactas */}
            <g fill="#ff1493">
              {/* Cabeza */}
              <circle cx="300" cy="98" r="6.5" />

              {/* Torso con forma de reloj de arena */}
              <path
                d="M 293 113 
                       C 293 106, 307 106, 307 113 
                       C 307 123, 301 126, 301 134 
                       C 301 142, 308 146, 308 152 
                       L 292 152 
                       C 292 146, 299 142, 299 134 
                       C 299 126, 293 123, 293 113 Z"
              />

              {/* Poste central del maniquí */}
              <rect x="299" y="152" width="2" height="20" rx="1" />

              {/* Base recta con bordes redondeados */}
              <rect x="292" y="172" width="16" height="3" rx="1.5" />
            </g>

            {/* 6. Texto "BOUTIQUE" con la caja de regalo (O) - Alineación y espacios exactos */}
            <g fill="#1a1a1a" className="font-sans text-[22px] tracking-[0.24em] font-medium">
              <text x="155" y="235">
                B
              </text>

              {/* Caja de Regalo (O) */}
              <g transform="translate(183, 218)">
                {/* Cuadro principal */}
                <rect x="0" y="0" width="16" height="17" rx="1.5" fill="#1a1a1a" />

                {/* Cintas en cruz (color fondo) */}
                <line x1="8" y1="0" x2="8" y2="17" stroke="#f4f0eb" strokeWidth="1.5" />
                <line x1="0" y1="9.5" x2="16" y2="9.5" stroke="#f4f0eb" strokeWidth="1.5" />

                {/* Lazo superior */}
                <path d="M 8 0 C 3 -6, 0 -2, 8 0" fill="#1a1a1a" />
                <path d="M 8 0 C 13 -6, 16 -2, 8 0" fill="#1a1a1a" />
              </g>

              <text x="208" y="235">
                UTIQUE
              </text>
            </g>
          </svg>
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
