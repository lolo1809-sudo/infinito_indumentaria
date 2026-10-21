import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function ProductDetail({ productos = [], local }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [indiceActual, setIndiceActual] = useState(0);
  const [talleSeleccionado, setTalleSeleccionado] = useState(null);

  const producto = productos.find((prod) => String(prod.id) === String(id));
  const imagenes = producto?.imgs && Array.isArray(producto.imgs) ? producto.imgs : [];

  useEffect(() => {
    if (imagenes.length <= 1) return;

    const intervalo = setInterval(() => {
      setIndiceActual((prev) => (prev + 1) % imagenes.length);
    }, 5000);

    return () => clearInterval(intervalo);
  }, [imagenes.length]);

  if (!producto) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-bg-custom text-text-primary gap-4">
        <p>Producto no encontrado.</p>
        <button onClick={() => navigate(-1)} className="bg-accent text-white px-4 py-2 rounded-custom cursor-pointer">
          Volver
        </button>
      </div>
    );
  }

  const handleAgregarAlCarrito = () => {
    if (producto.talles?.length > 0 && !talleSeleccionado) {
      toast.error("Por favor seleccioná un talle antes de agregar");
      return;
    }

    // 1. Obtener carrito actual
    const carritoActual = JSON.parse(localStorage.getItem("carrito")) || [];

    // 2. Comprobar si ya existe el mismo producto con el mismo talle
    const indexExistente = carritoActual.findIndex((item) => item.id === producto.id && item.talle === talleSeleccionado);

    if (indexExistente !== -1) {
      carritoActual[indexExistente].cantidad += 1;
    } else {
      carritoActual.push({
        id: producto.id,
        nombre: producto.nombre,
        categoria: producto.categoria,
        precio: producto.precio_contado,
        img: imagenes[0] || "/placeholder.webp",
        talle: talleSeleccionado || "Único",
        cantidad: 1,
      });
    }

    // 3. Guardar en localStorage y disparar evento para actualizar otros componentes
    localStorage.setItem("carrito", JSON.stringify(carritoActual));
    window.dispatchEvent(new Event("storage_carrito"));

    // Feedback visual
    toast.success(`"${producto.nombre}" se agregó al carrito`);
  };

  const mensaje = `¡Hola! Quería consultar disponibilidad y talles de: ${producto.nombre} (${producto.categoria}) - Precio contado/transferencia: ${producto.precio_contado}.`;
  const whatsappUrl = `https://wa.me/${local?.whatsapp}?text=${encodeURIComponent(mensaje)}`;

  return (
    <div className="min-h-screen bg-bg-custom flex flex-col md:flex-row relative">
      {/* Botón Volver / Cerrar */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-6 right-6 text-text-secondary hover:text-text-primary text-xl font-bold cursor-pointer z-30 bg-bg-secondary/80 backdrop-blur-sm w-10 h-10 rounded-full flex items-center justify-center border border-border transition-colors"
      >
        ✕
      </button>

      {/* Carrusel de Imágenes */}
      <div className="relative w-full md:w-1/2 h-[50vh] md:h-screen bg-bg-secondary flex items-center justify-center">
        <img
          src={imagenes[indiceActual] || "/placeholder.webp"}
          alt={`${producto.nombre} - ${indiceActual + 1}`}
          className="w-full h-full object-contain md:object-cover transition-all duration-500"
        />

        {imagenes.length > 1 && (
          <>
            <button
              onClick={() => setIndiceActual((prev) => (prev === 0 ? imagenes.length - 1 : prev - 1))}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white rounded-full w-10 h-10 flex items-center justify-center cursor-pointer transition-colors text-2xl z-20"
            >
              ‹
            </button>
            <button
              onClick={() => setIndiceActual((prev) => (prev + 1) % imagenes.length)}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white rounded-full w-10 h-10 flex items-center justify-center cursor-pointer transition-colors text-2xl z-20"
            >
              ›
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-black/40 px-3 py-1.5 rounded-full backdrop-blur-xs z-20">
              {imagenes.map((_, idx) => (
                <button key={idx} onClick={() => setIndiceActual(idx)} className={`h-2 rounded-full transition-all cursor-pointer ${idx === indiceActual ? "w-5 bg-accent" : "w-2 bg-white/60"}`} />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Información */}
      <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-between overflow-y-auto min-h-[50vh] md:min-h-screen">
        <div>
          {/* Categoría */}
          <span className="text-text-secondary text-sm font-semibold uppercase tracking-wider block mb-2">{producto.categoria}</span>

          {/* Nombre */}
          <h1 className="text-text-primary font-bold text-3xl md:text-5xl tracking-wide uppercase mb-6">{producto.nombre}</h1>

          {/* Talles */}
          {producto.talles && producto.talles.length > 0 && (
            <div className="mb-6">
              <span className="text-xs text-text-secondary font-medium uppercase tracking-wider block mb-2">Seleccioná tu talle:</span>
              <div className="flex flex-wrap items-center gap-2">
                {producto.talles.map((talle) => {
                  const isSelected = talleSeleccionado === talle;
                  return (
                    <button
                      key={talle}
                      type="button"
                      onClick={() => {
                        setTalleSeleccionado(talle);
                      }}
                      className={`text-sm font-semibold px-4 py-2 rounded-custom border transition-all cursor-pointer ${
                        isSelected ? "bg-accent text-bg-custom border-accent shadow-xs" : "bg-bg-secondary text-text-primary border-border hover:border-accent"
                      }`}
                    >
                      {talle}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Precio */}
          <div className="mb-4">
            <span className="text-xs text-text-secondary font-medium uppercase tracking-wider block mb-1">Precio Contado / Transferencia:</span>
            <p className="text-accent font-bold text-3xl md:text-4xl">${producto.precio_contado}</p>
          </div>
        </div>

        {/* Acciones */}
        <div className="mt-8 flex flex-col gap-3">
          {/* Botón Agregar al Carrito */}
          <button
            type="button"
            onClick={handleAgregarAlCarrito}
            className="w-full bg-accent hover:bg-accent-hover text-bg-custom font-semibold py-3.5 rounded-custom transition-colors cursor-pointer text-center text-base"
          >
            Agregar al Carrito
          </button>

          {/* Botón Consultar por WhatsApp */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-full bg-bg-secondary hover:bg-border text-text-primary font-semibold py-3.5 rounded-custom border border-border transition-colors cursor-pointer text-center text-base"
          >
            Consultar por WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
