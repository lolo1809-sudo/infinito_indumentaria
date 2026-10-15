import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const categoriasSidebar = [
  {
    nombre: "Remeras",
    path: "/categorias/remeras",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
        <path d="M20.38 3.46L16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z" />
      </svg>
    ),
  },
  {
    nombre: "Camisas",
    path: "/categorias/camisas",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
        <path d="M6 3h12l4 6-5 3-2-2v8H9v-8l-2 2-5-3 4-6z" />
        <path d="M9 3v4a3 3 0 0 0 6 0V3" />
      </svg>
    ),
  },
  {
    nombre: "Abrigos",
    path: "/categorias/abrigos",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
        <path d="M15 3v4a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2V3m-4 5l-3 3 2 2 2-2v9h12v-9l2 2 2-2-3-3" />
      </svg>
    ),
  },
  {
    nombre: "Pantalones",
    path: "/categorias/pantalones",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
        <path d="M14 2H10a2 2 0 0 0-2 2v18l4-2 4 2V4a2 2 0 0 0-2-2z" />
      </svg>
    ),
  },
  {
    nombre: "Sastrería",
    path: "/categorias/sastreria",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    nombre: "Accesorios",
    path: "/categorias/accesorios",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v4l3 3" />
      </svg>
    ),
  },
  {
    nombre: "Piezas de Plata",
    path: "/categorias/piezas_plata",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
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
