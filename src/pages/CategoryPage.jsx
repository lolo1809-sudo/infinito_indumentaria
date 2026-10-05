import React, { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import SectionTitle from "../components/SectionTitle";
import EmptyCategory from "../components/EmptyCategory";
import Sidebar from "../components/Sidebar";
import { todosLosProductos } from "../productos.js";

// Función auxiliar para convertir "$68.600" -> 68600
const parsePrecio = (precioStr) => {
  if (typeof precioStr === "number") return precioStr;
  return Number(precioStr?.replace(/[^0-9]/g, "") || 0);
};

export default function CategoryPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [tallesSeleccionados, setTallesSeleccionados] = useState([]);
  const [orden, setOrden] = useState("default");
  const { categoria } = useParams();

  // 1. Productos base de la categoría actual
  const productosCategoria = useMemo(() => {
    return todosLosProductos.filter((prod) => prod.categoriaSlug === categoria);
  }, [categoria]);

  // 2. Extraer todos los talles únicos disponibles en esta categoría
  const tallesDisponibles = useMemo(() => {
    const set = new Set();
    productosCategoria.forEach((prod) => {
      if (Array.isArray(prod.talles)) {
        prod.talles.forEach((t) => set.add(t));
      }
    });
    return Array.from(set);
  }, [productosCategoria]);

  // Manejar click en los talles (toggle)
  const toggleTalle = (talle) => {
    setTallesSeleccionados((prev) => (prev.includes(talle) ? prev.filter((t) => t !== talle) : [...prev, talle]));
  };

  // 3. Filtrar y ordenar
  const productosMostrados = useMemo(() => {
    // Filtrar por talle
    let resultado = productosCategoria.filter((prod) => {
      if (tallesSeleccionados.length === 0) return true;
      return prod.talles?.some((t) => tallesSeleccionados.includes(t));
    });

    // Ordenar por precio (usando precioContado)
    if (orden === "menor-mayor") {
      resultado.sort((a, b) => parsePrecio(a.precioContado) - parsePrecio(b.precioContado));
    } else if (orden === "mayor-menor") {
      resultado.sort((a, b) => parsePrecio(b.precioContado) - parsePrecio(a.precioContado));
    }

    return resultado;
  }, [productosCategoria, tallesSeleccionados, orden]);

  const tituloFormateado = categoria ? categoria.replace("-", " ").toUpperCase() : "CATEGORÍA";

  return (
    <main className="w-full bg-bg-custom py-12 px-4 min-h-screen relative">
      {/* Sidebar Drawer */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Barra superior */}
      <div className="max-w-6xl mx-auto flex items-center justify-between mb-6">
        <button
          onClick={() => setSidebarOpen(true)}
          className="flex items-center gap-2 px-3 py-2 rounded-custom bg-bg-card border border-border text-text-primary hover:border-accent transition-colors cursor-pointer text-sm font-semibold"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
          Categorías
        </button>

        <Link to="/" className="text-xs tracking-widest uppercase font-bold text-text-secondary transition-colors duration-200 hover:!text-[#a0b800]">
          ← Volver al inicio
        </Link>
      </div>

      <div className="max-w-6xl mx-auto">
        <SectionTitle texto={tituloFormateado} className="mt-4" />

        {/* Barra de Filtros y Orden */}
        {productosCategoria.length > 0 && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-6 mb-8 pb-4 border-b border-border">
            {/* Filtro por Talles */}
            {tallesDisponibles.length > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold text-text-secondary uppercase tracking-wider mr-1">Talle:</span>
                <button
                  onClick={() => setTallesSeleccionados([])}
                  className={`text-xs px-3 py-1 rounded transition-colors font-medium cursor-pointer ${
                    tallesSeleccionados.length === 0 ? "bg-accent text-bg-custom font-bold" : "bg-bg-secondary text-text-primary hover:border-accent border border-transparent"
                  }`}
                >
                  Todos
                </button>
                {tallesDisponibles.map((talle) => {
                  const activo = tallesSeleccionados.includes(talle);
                  return (
                    <button
                      key={talle}
                      onClick={() => toggleTalle(talle)}
                      className={`text-xs px-3 py-1 rounded transition-colors font-medium cursor-pointer border ${
                        activo ? "bg-accent text-bg-custom border-accent font-bold" : "bg-bg-secondary text-text-primary border-border hover:border-accent"
                      }`}
                    >
                      {talle}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Ordenamiento por Precio */}
            <div className="flex items-center gap-2 self-end sm:self-auto">
              <label htmlFor="orden" className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
                Ordenar:
              </label>
              <select
                id="orden"
                value={orden}
                onChange={(e) => setOrden(e.target.value)}
                className="bg-bg-secondary text-text-primary text-xs px-3 py-1.5 rounded border border-border focus:outline-none focus:border-accent cursor-pointer"
              >
                <option value="default">Destacados</option>
                <option value="menor-mayor">Menor precio</option>
                <option value="mayor-menor">Mayor precio</option>
              </select>
            </div>
          </div>
        )}

        {/* Grilla de Productos */}
        {productosMostrados.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {productosMostrados.map((prod) => (
              <ProductCard key={prod.id} {...prod} className="flex" />
            ))}
          </div>
        ) : (
          <EmptyCategory categoria={tituloFormateado} />
        )}
      </div>
    </main>
  );
}
