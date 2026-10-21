import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import SectionTitle from "./SectionTitle";

export default function ProductosDestacados({ productos = [] }) {
  // 1. Filtrar solo destacados
  const productosDestacados = productos.filter((prod) => prod.destacado);

  const [index, setIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isMoving, setIsMoving] = useState(false); // Evita clics seguidos que rompan el carrusel

  const total = productosDestacados.length;

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Cantidad de tarjetas visibles simultáneamente
  const visibleCards = isDesktop ? 3 : 1;
  const puedeDeslizar = total > visibleCards;

  // Solo duplicamos los elementos si realmente hay suficientes para deslizar en bucle
  const items = puedeDeslizar ? [...productosDestacados, ...productosDestacados] : productosDestacados;

  const next = () => {
    if (isMoving || !puedeDeslizar) return;
    setIsMoving(true);
    setIsTransitioning(true);
    setIndex((prev) => prev + 1);
  };

  const prev = () => {
    if (isMoving || !puedeDeslizar) return;
    setIsMoving(true);

    if (index === 0) {
      setIsTransitioning(false);
      setIndex(total);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsTransitioning(true);
          setIndex(total - 1);
        });
      });
    } else {
      setIsTransitioning(true);
      setIndex((prev) => prev - 1);
    }
  };

  const handleTransitionEnd = () => {
    if (index >= total) {
      setIsTransitioning(false);
      setIndex(0);
    }
    setIsMoving(false);
  };

  useEffect(() => {
    if (!puedeDeslizar) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [puedeDeslizar, total]);

  if (total === 0) return null;

  const translateStyle = isDesktop ? `calc(-${index} * ((100% - 4rem) / 3 + 2rem))` : `calc(-${index} * (100% + 2rem))`;

  return (
    <section id="ofertas" className="w-full bg-bg-custom py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <SectionTitle texto="OFERTAS" />

        {/* MODO ESTÁTICO: Si hay 1, 2 o 3 productos en PC (no hace falta deslizar) */}
        {!puedeDeslizar ? (
          <div className="flex flex-wrap justify-center gap-8">
            {productosDestacados.map((prod) => (
              <div key={prod.id} className="w-full sm:w-[calc(50%-1rem)] md:w-[calc((100%-4rem)/3)] max-w-sm">
                <ProductCard id={prod.id} nombre={prod.nombre} imgs={prod.imgs} className="flex" />
              </div>
            ))}
          </div>
        ) : (
          /* MODO CARRUSEL: Solo cuando la cantidad supera el ancho visible */
          <div className="relative">
            {/* Flecha Izquierda */}
            <button
              onClick={prev}
              disabled={isMoving}
              className="absolute -left-4 md:-left-12 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center rounded-full border border-border text-text-primary hover:border-accent hover:!text-[#a0b800] transition-colors z-20 bg-bg-custom cursor-pointer disabled:opacity-50"
              aria-label="Anterior"
            >
              <span className="text-2xl font-bold leading-none pb-0.5 pr-0.5">‹</span>
            </button>

            {/* Contenedor del Carrusel */}
            <div className="overflow-hidden w-full">
              <div
                onTransitionEnd={handleTransitionEnd}
                className={`flex gap-8 ${isTransitioning ? "transition-transform duration-700 ease-in-out" : "transition-none"}`}
                style={{
                  transform: `translateX(${translateStyle})`,
                }}
              >
                {items.map((prod, i) => (
                  <div key={`${prod.id}-${i}`} className="w-full md:w-[calc((100%-4rem)/3)] shrink-0">
                    <ProductCard id={prod.id} nombre={prod.nombre} imgs={prod.imgs} className="flex" />
                  </div>
                ))}
              </div>
            </div>

            {/* Flecha Derecha */}
            <button
              onClick={next}
              disabled={isMoving}
              className="absolute -right-4 md:-right-12 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center rounded-full border border-border text-text-primary hover:border-accent hover:!text-[#a0b800] transition-colors z-20 bg-bg-custom cursor-pointer disabled:opacity-50"
              aria-label="Siguiente"
            >
              <span className="text-2xl font-bold leading-none pb-0.5 pl-0.5">›</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
