import { useNavigate } from "react-router-dom";

export default function EmptyCarrito() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center bg-bg-custom text-text-primary rounded-custom border border-border">
      {/* Contenedor del ícono */}
      <div className="w-20 h-20 mb-6 rounded-full bg-bg-secondary flex items-center justify-center border border-border text-accent">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
          />
        </svg>
      </div>

      <h3 className="text-2xl font-bold uppercase tracking-wide mb-2">Tu carrito está vacío</h3>

      <p className="text-text-secondary text-sm md:text-base max-w-md mb-8">Explorá el catálogo y elegí tus prendas favoritas.</p>

      <button onClick={() => navigate("/")} className="bg-accent hover:bg-accent-hover text-bg-custom font-semibold py-3 px-8 rounded-custom transition-colors cursor-pointer shadow-xs">
        Explorar catálogo
      </button>
    </div>
  );
}
