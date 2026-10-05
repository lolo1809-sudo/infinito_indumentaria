import { useState } from "react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-bg-custom/90 backdrop-blur-md px-6 py-4">
      <div className="flex items-center justify-between sm:justify-center max-w-6xl mx-auto">
        {/* Texto Menú */}
        <span className="sm:hidden text-white font-bold text-sm tracking-wider uppercase">Menú</span>

        {/* Botón hamburguesa (solo móvil) */}
        <button onClick={() => setIsOpen(!isOpen)} aria-label="Abrir menú" className="sm:hidden text-white hover:text-[#a0b800] focus:outline-none p-1">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Navegación Desktop */}
        <nav className="hidden sm:flex items-center gap-10">
          <a href="/#inicio" className="text-base md:text-lg font-bold text-white uppercase tracking-[0.2em] transition-colors duration-200 hover:!text-[#a0b800]">
            Inicio
          </a>
          <a href="/#productos" className="text-base md:text-lg font-bold text-white uppercase tracking-[0.2em] transition-colors duration-200 hover:!text-[#a0b800]">
            Productos
          </a>
          <a href="/#categorias" className="text-base md:text-lg font-bold text-white uppercase tracking-[0.2em] transition-colors duration-200 hover:!text-[#a0b800]">
            Categorías
          </a>
          <a href="/#ubicacion" className="text-base md:text-lg font-bold text-white uppercase tracking-[0.2em] transition-colors duration-200 hover:!text-[#a0b800]">
            Ubicación
          </a>
        </nav>
      </div>

      {/* Menú desplegable Móvil */}
      {isOpen && (
        <nav className="sm:hidden flex flex-col items-center gap-4 pt-4 pb-2 border-t border-white/10 mt-3">
          <a href="/#inicio" onClick={() => setIsOpen(false)} className="text-sm font-bold text-white uppercase tracking-[0.2em] transition-colors duration-200 hover:!text-[#a0b800]">
            Inicio
          </a>
          <a href="/#productos" onClick={() => setIsOpen(false)} className="text-sm font-bold text-white uppercase tracking-[0.2em] transition-colors duration-200 hover:!text-[#a0b800]">
            Productos
          </a>
          <a href="/#categorias" onClick={() => setIsOpen(false)} className="text-sm font-bold text-white uppercase tracking-[0.2em] transition-colors duration-200 hover:!text-[#a0b800]">
            Categorías
          </a>
          <a href="/#ubicacion" onClick={() => setIsOpen(false)} className="text-sm font-bold text-white uppercase tracking-[0.2em] transition-colors duration-200 hover:!text-[#a0b800]">
            Ubicación
          </a>
        </nav>
      )}
    </header>
  );
}
