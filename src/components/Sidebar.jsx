import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const categoriasSidebar = [
  {
    nombre: "Buzos",
    path: "/categorias/buzos",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
        <path d="M20.38 3.46L16 2a8 8 0 01-8 0L3.62 3.46a2 2 0 00-1.34 2.23l.58 3.47a1 1 0 00.99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 002-2V10h2.15a1 1 0 00.99-.84l.58-3.47a2 2 0 00-1.34-2.23z" />
      </svg>
    ),
  },
  {
    nombre: "Remeras",
    path: "/categorias/remeras",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
        <path d="M21.21 4.89l-4.5-2.5A2 2 0 0 0 15.75 2h-7.5a2 2 0 0 0-.96.24l-4.5 2.5A2 2 0 0 0 2 6.5v2.88a2 2 0 0 0 1.05 1.76L4 11.59V20a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8.41l.95-.45A2 2 0 0 0 22 9.38V6.5a2 2 0 0 0-.79-1.61z" />
      </svg>
    ),
  },
  {
    nombre: "Pants",
    path: "/categorias/pantalones",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
        <path d="M6 2h12M6 2v20a2 2 0 0 0 2 2h1.5a2 2 0 0 0 2-2v-9h1v9a2 2 0 0 0 2 2H16a2 2 0 0 0 2-2V2" />
      </svg>
    ),
  },
  {
    nombre: "Accesorios",
    path: "/categorias/accesorios",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
        <circle cx="12" cy="12" r="7" />
        <path d="M12 9v3l1.5 1.5M16.51 17.35l-.35 3.83a2 2 0 0 1-2 1.82H9.83a2 2 0 0 1-2-1.82l-.35-3.83m.01-10.7l.35-3.83A2 2 0 0 1 9.83 1h4.35a2 2 0 0 1 2 1.82l.35 3.83" />
      </svg>
    ),
  },
];

export default function Sidebar({ isOpen, onClose }) {
  const [search, setSearch] = useState("");
  const location = useLocation();

  const categoriasFiltradas = categoriasSidebar.filter((cat) => cat.nombre.toLowerCase().includes(search.toLowerCase().trim()));

  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-black/60 z-40 transition-opacity backdrop-blur-sm" onClick={onClose} />}

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-[280px] bg-bg-secondary border-r border-border transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Cruz para sacar el sidebar */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-custom border border-border text-red-500 hover:bg-bg-card transition-colors cursor-pointer">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Buscador */}
        <div className="p-4">
          <input
            type="text"
            placeholder="Buscar categoría..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-bg-card border border-border rounded-custom px-4 py-2.5 text-sm text-text-primary placeholder:text-text-secondary focus:border-accent outline-none transition-colors"
          />
        </div>

        {/* Lista de Navegación o Mensaje de No Encontrado */}
        <nav className="flex-1 overflow-y-auto p-2 space-y-1">
          {categoriasFiltradas.length > 0 ? (
            categoriasFiltradas.map((cat) => {
              const isActive = location.pathname === cat.path;

              return (
                <Link
                  key={cat.path}
                  to={cat.path}
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
