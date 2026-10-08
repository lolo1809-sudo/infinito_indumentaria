export default function ProductCard({ nombre, categoria, precioLista, precioContado, cuotas, img, talles = [], className = "" }) {
  const numeroTelefono = "2644694044";
  const mensaje = `¡Hola! Quería consultar disponibilidad y talles de: ${nombre} (${categoria}) - Precio contado: ${precioContado}.`;
  const whatsappUrl = `https://wa.me/${numeroTelefono}?text=${encodeURIComponent(mensaje)}`;

  return (
    <article className={`flex flex-col bg-bg-custom ${className}`}>
      {/* Imagen */}
      <div className="w-full aspect-[4/5] overflow-hidden bg-bg-secondary mb-4">
        <img src={img} alt={nombre} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
      </div>

      {/* Info  */}
      <div className="flex flex-col flex-grow text-left">
        {/* Nombre */}
        <h3 className="text-text-primary font-bold text-lg tracking-wide uppercase">{nombre}</h3>
        {/* Categoría */}
        <span className="text-text-secondary text-sm mb-2">{categoria}</span>

        {/* Talles */}
        {talles.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5 mb-3">
            <span className="text-xs text-text-secondary font-medium mr-1">Talles:</span>
            {talles.map((talle) => (
              <span key={talle} className="text-xs font-semibold px-2 py-0.5 border border-border-custom text-text-primary rounded">
                {talle}
              </span>
            ))}
          </div>
        )}

        {/* Precios */}
        <span className="text-text-secondary font-medium line-through text-sm">{precioLista}</span>
        <p className="text-accent font-bold text-xl mt-1">
          {precioContado} <span className="text-text-primary text-sm font-normal">de Contado</span>
        </p>

        {/* Cuotas */}
        <p className="text-text-secondary text-xs mt-2 mb-5">{cuotas}</p>

        {/* Botón Consultar */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto inline-flex items-center justify-center w-[120px] bg-accent hover:bg-accent-hover text-bg-custom font-semibold py-2 rounded-custom transition-colors cursor-pointer text-center text-sm"
        >
          Consultar
        </a>
      </div>
    </article>
  );
}
