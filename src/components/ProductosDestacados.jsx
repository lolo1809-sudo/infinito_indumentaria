import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import SectionTitle from "./SectionTitle";

export default function ProductosDestacados({ productos = [] }) {
  // ================= 1. FILTRAR SOLO DESTACADOS =============================
  const productosDestacados = productos.filter((prod) => prod.destacado);

  const [index, setIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isDesktop, setIsDesktop] = useState(false);

  const total = productosDestacados.length;

  // Duplicamos los productos para permitir el loop infinito fluido
  const items = [...productosDestacados, ...productosDestacados];

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const next = () => {
    setIsTransitioning(true);
    setIndex((prev) => prev + 1);
  };

  const prev = () => {
    if (index === 0) {
      setIsTransitioning(false);
      setIndex(total);
      setTimeout(() => {
        setIsTransitioning(true);
        setIndex(total - 1);
      }, 20);
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
  };

  useEffect(() => {
    if (total <= 1) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [total]);

  if (total === 0) return null;

  // Ancho y separación de cada tarjeta (con el asterisco de multiplicación corregido)
  const translateStyle = isDesktop ? `calc(-${index} * ((100% - 4rem) / 3 + 2rem))` : `calc(-${index} * (100% + 2rem))`;

  // ================= 2. RENDER =============================
  return (
    <section id="ofertas" className="w-full bg-bg-custom py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <SectionTitle texto="OFERTAS" />

        <div className="relative">
          {/* Flecha Izquierda */}
          {total > 1 && (
            <button
              onClick={prev}
              className="absolute -left-4 md:-left-12 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center rounded-full border border-border text-text-primary hover:border-accent hover:!text-[#a0b800] transition-colors z-20 bg-bg-custom cursor-pointer"
              aria-label="Anterior"
            >
              <span className="text-2xl font-bold leading-none pb-0.5 pr-0.5">‹</span>
            </button>
          )}

          {/* Carrusel Deslizante Infinito */}
          <div className="overflow-hidden w-full">
            <div
              onTransitionEnd={handleTransitionEnd}
              className={`flex gap-8 ${isTransitioning ? "transition-transform duration-700 ease-in-out" : "transition-none"}`}
              style={{
                transform: total > 1 ? `translateX(${translateStyle})` : "none",
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
          {total > 1 && (
            <button
              onClick={next}
              className="absolute -right-4 md:-right-12 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center rounded-full border border-border text-text-primary hover:border-accent hover:!text-[#a0b800] transition-colors z-20 bg-bg-custom cursor-pointer"
              aria-label="Siguiente"
            >
              <span className="text-2xl font-bold leading-none pb-0.5 pl-0.5">›</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
