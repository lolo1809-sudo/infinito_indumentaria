import { Link } from "react-router-dom";

export default function EmptyCategory({ categoria = "" }) {
  return (
    <div className="w-full max-w-md mx-auto my-12 p-8 md:p-12 rounded-custom bg-bg-card border border-border text-center flex flex-col items-center">
      {/* Ícono de bolsa/caja vacía minimalista */}
      <div className="w-16 h-16 rounded-full bg-bg-secondary border border-border flex items-center justify-center mb-6 text-accent">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
          <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-2Z" />
          <path d="M3 6h18" />
          <path d="M16 10a4 4 0 0 1-8 0" />
        </svg>
      </div>

      <span className="text-accent text-xs font-semibold tracking-[0.25em] uppercase mb-2">Sin Stock Momentáneo</span>

      <h3 className="text-xl md:text-2xl font-bold text-text-primary uppercase tracking-wide mb-3">Próximo Drop en camino</h3>

      <p className="text-text-secondary text-sm leading-relaxed mb-8">
        Actualmente no disponemos de modelos disponibles en <span className="text-text-primary font-medium">{categoria}</span>. Estamos produciendo nuevos ingresos para esta sección.
      </p>

      {/* Botón para volver a la tienda / inicio */}
      <Link
        to="/"
        className="inline-flex items-center justify-center px-6 py-3 rounded-custom bg-accent hover:bg-accent-hover text-bg-custom font-semibold text-sm uppercase tracking-wider transition-colors cursor-pointer"
      >
        Volver al inicio
      </Link>
    </div>
  );
}
