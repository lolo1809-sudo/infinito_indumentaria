import React from "react";

export default function GoogleResenas({ resenas }) {
  if (!resenas || resenas.length === 0) return null;

  // 1. Multiplicamos el array para llenar pantallas anchas sin importar si tienes pocas reseñas
  let arrayBase = [...resenas];
  while (arrayBase.length < 8) {
    arrayBase = [...arrayBase, ...resenas];
  }
  // 2. Duplicamos una vez más el bloque completo para que el bucle sea infinito y perfecto
  const cintaResenas = [...arrayBase, ...arrayBase];

  return (
    <section className="py-12 overflow-hidden bg-[var(--color-bg-secondary)]">
      <div className="max-w-7xl mx-auto px-4 mb-8">
        <h2 className="text-2xl font-bold text-center text-[var(--color-text-primary)] uppercase">Lo que dicen nuestros clientes</h2>
      </div>

      {/* Contenedor relativo de la cinta con difuminado en los bordes */}
      <div className="relative w-full flex overflow-hidden">
        <div className="absolute top-0 left-0 h-full w-12 md:w-24 bg-gradient-to-r from-[var(--color-bg-secondary)] to-transparent z-10 pointer-events-none"></div>
        <div className="absolute top-0 right-0 h-full w-12 md:w-24 bg-gradient-to-l from-[var(--color-bg-secondary)] to-transparent z-10 pointer-events-none"></div>

        {/* Pista de la cinta */}
        <div className="animate-cinta gap-4 px-4">
          {cintaResenas.map((resena, index) => (
            <div
              key={`${resena.id}-${index}`}
              className="w-[320px] shrink-0 p-5 rounded-[var(--radius-custom)] shadow-sm bg-[var(--color-bg-card)] border border-[var(--color-border)] flex flex-col justify-between cursor-default"
            >
              <div>
                {/* Nombre del cliente */}
                <h3 className="font-semibold text-[var(--color-text-primary)] mb-1">{resena.nombre}</h3>

                {/* Estrellas */}
                <div className="flex text-yellow-500 text-sm mb-3">
                  {"★".repeat(resena.cant_estrellas)}
                  <span className="text-gray-300">{"★".repeat(5 - resena.cant_estrellas)}</span>
                </div>

                {/* Comentario */}
                <p className="text-sm line-clamp-4 text-[var(--color-text-secondary)]">"{resena.comentario}"</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
