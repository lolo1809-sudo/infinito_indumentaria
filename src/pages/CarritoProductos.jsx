import { useState, useEffect } from "react";
import FormularioProducto from "../components/FormularioProducto";
import EmptyCarrito from "../components/EmptyCarrito";

export default function CarritoProductos() {
  const [carrito, setCarrito] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  useEffect(() => {
    const cargarCarrito = () => {
      const items = JSON.parse(localStorage.getItem("carrito")) || [];
      setCarrito(items);
    };

    cargarCarrito();
    window.addEventListener("storage_carrito", cargarCarrito);

    return () => window.removeEventListener("storage_carrito", cargarCarrito);
  }, []);

  const totalCarrito = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  const actualizarStorage = (nuevoCarrito) => {
    setCarrito(nuevoCarrito);
    localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
    window.dispatchEvent(new Event("storage_carrito"));
  };

  const decrementarCantidad = (index) => {
    const nuevoCarrito = [...carrito];
    if (nuevoCarrito[index].cantidad > 1) {
      nuevoCarrito[index].cantidad -= 1;
      actualizarStorage(nuevoCarrito);
    } else {
      eliminarProducto(index);
    }
  };

  const eliminarProducto = (index) => {
    const nuevoCarrito = [...carrito];
    nuevoCarrito.splice(index, 1);
    actualizarStorage(nuevoCarrito);
  };

  const procesarPedido = (datosCliente) => {
    // 1. Armar el mensaje de WhatsApp
    let mensaje = "¡Hola! Quiero hacer este pedido:\n";

    carrito.forEach((item) => {
      const detalles = [];
      if (item.categoria) detalles.push(item.categoria);
      if (item.talle && item.talle !== "Único") detalles.push(`Talle ${item.talle}`);

      const infoExtra = detalles.length > 0 ? ` (${detalles.join(" - ")})` : "";
      mensaje += `- ${item.cantidad}x ${item.nombre}${infoExtra} - $${item.precio * item.cantidad}\n`;
    });

    mensaje += `Total: $${totalCarrito}\n`;
    mensaje += `Cliente: ${datosCliente.nombre}\n`;

    if (datosCliente.metodoEnvio === "envio") {
      mensaje += `Entrega: Envío a domicilio (${datosCliente.ubicacion})\n`;
    } else {
      mensaje += `Entrega: Retiro en local\n`;
    }

    mensaje += "¿Tienen stock para transferirles?";

    // 2. Abrir WhatsApp
    const numeroTelefono = "2645621897";
    const whatsappUrl = `https://wa.me/${numeroTelefono}?text=${encodeURIComponent(mensaje)}`;
    window.open(whatsappUrl, "_blank");

    // 3. Eliminar "carrito" de localStorage una vez abiero WhatsApp
    localStorage.removeItem("carrito");
    setCarrito([]);
    setMostrarFormulario(false);
    window.dispatchEvent(new Event("storage_carrito"));
  };

  if (carrito.length === 0 && !mostrarFormulario) {
    return <EmptyCarrito />;
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-bg-custom text-text-primary rounded-custom">
      <h2 className="text-2xl font-bold uppercase mb-6 border-b border-border pb-4">Tu Pedido</h2>

      {!mostrarFormulario ? (
        <>
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border text-text-secondary text-sm uppercase">
                  <th className="py-3 px-2">Producto</th>
                  <th className="py-3 px-2">Talle</th>
                  <th className="py-3 px-2">Cant.</th>
                  <th className="py-3 px-2">Subtotal</th>
                  <th className="py-3 px-2"></th>
                </tr>
              </thead>
              <tbody>
                {carrito.map((item, index) => (
                  <tr key={index} className="border-b border-border/50">
                    <td className="py-4 px-2 flex items-center gap-3">
                      <img src={item.img} alt={item.nombre} className="w-12 h-12 object-cover rounded-md" />
                      <div className="flex flex-col">
                        <span className="font-semibold">{item.nombre}</span>
                        {item.categoria && <span className="text-xs text-text-secondary uppercase tracking-wider">{item.categoria}</span>}
                      </div>
                    </td>
                    <td className="py-4 px-2">{item.talle || "-"}</td>
                    <td className="py-4 px-2">
                      <div className="inline-flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => decrementarCantidad(index)}
                          className="w-6 h-6 rounded-custom border border-border bg-bg-secondary hover:border-accent hover:text-accent font-bold text-sm flex items-center justify-center transition-colors cursor-pointer leading-none"
                          title="Restar una unidad"
                        >
                          -
                        </button>
                        <span className="font-medium min-w-4 text-center">{item.cantidad}</span>
                      </div>
                    </td>
                    <td className="py-4 px-2 font-bold text-accent">${item.precio * item.cantidad}</td>
                    <td className="py-4 px-2 text-right">
                      <button onClick={() => eliminarProducto(index)} className="text-red-500 hover:text-red-700 font-bold cursor-pointer px-2">
                        ✕
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center bg-bg-secondary p-6 rounded-custom border border-border">
            <div className="text-xl mb-4 md:mb-0">
              <span className="text-text-secondary font-semibold">Total: </span>
              <span className="text-accent font-bold text-2xl">${totalCarrito}</span>
            </div>

            <button
              onClick={() => setMostrarFormulario(true)}
              className="w-full md:w-auto bg-accent hover:bg-accent-hover text-bg-custom font-semibold py-3 px-8 rounded-custom transition-colors cursor-pointer"
            >
              Coordinar Pedido
            </button>
          </div>
        </>
      ) : (
        <FormularioProducto onSubmit={procesarPedido} onCancel={() => setMostrarFormulario(false)} />
      )}
    </div>
  );
}
