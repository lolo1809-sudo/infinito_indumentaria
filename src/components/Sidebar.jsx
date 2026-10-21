import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { CATEGORIAS } from "../config";

export default function Sidebar({ isOpen, onClose }) {
  const [search, setSearch] = useState("");
  const location = useLocation();

  const categoriasFiltradas = CATEGORIAS.filter((cat) => cat.nombre.toLowerCase().includes(search.toLowerCase().trim()));

  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-black/60 z-40 transition-opacity backdrop-blur-sm" onClick={onClose} />}

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-[280px] bg-bg-secondary border-r border-border transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-border">
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-custom border border-border text-red-500 hover:bg-bg-card transition-colors cursor-pointer">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-4">
          <input
            type="text"
            placeholder="Buscar categoría..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-bg-card border border-border rounded-custom px-4 py-2.5 text-sm text-text-primary placeholder:text-text-secondary focus:border-accent outline-none transition-colors"
          />
        </div>

        <nav className="flex-1 overflow-y-auto p-2 space-y-1">
          {categoriasFiltradas.length > 0 ? (
            categoriasFiltradas.map((cat) => {
              const ruta = `/categorias/${cat.slug}`;
              const isActive = location.pathname === ruta;

              return (
                <Link
                  key={cat.slug}
                  to={ruta}
                  onClick={onClose}
                  className={`flex items-center gap-4 px-4 py-3 rounded-custom text-sm font-medium transition-colors ${
                    isActive ? "bg-bg-card text-text-primary border border-accent" : "text-text-secondary border border-transparent hover:bg-bg-card hover:text-text-primary"
                  }`}
                >
                  <span className={isActive ? "text-text-primary" : "text-text-secondary"}>{cat.icon}</span>
                  {cat.nombre}
                </Link>
              );
            })
          ) : (
            <div className="py-10 px-4 text-center">
              <p className="text-text-primary text-sm font-semibold mb-1">Categoría no encontrada</p>
              <p className="text-text-secondary text-xs">No hay resultados para "{search}".</p>
            </div>
          )}
        </nav>
      </aside>
    </>
  );
}
