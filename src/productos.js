export const todosLosProductos = [
  // ====================== HOODIES ====================================
  {
    id: 1,
    nombre: "HOODIE BOXY OSDIREAL",
    categoria: "Hoodies",
    categoriaSlug: "hoodies",
    precioLista: "$98.000",
    precioContado: "$68.600",
    cuotas: "6 pagos sin recargo de $16.333 con Mercado Pago",
    img: "/img1.webp",
    destacado: true,
    talles: ["S", "M", "L", "XL"],
  },
  {
    id: 2,
    nombre: "HOODIE OVERSIZE ESSENTIAL",
    categoria: "Hoodies",
    categoriaSlug: "hoodies",
    precioLista: "$110.000",
    precioContado: "$77.000",
    cuotas: "6 pagos sin recargo de $18.333 con Mercado Pago",
    img: "/img2.webp",
    destacado: true,
    talles: ["M", "L", "XL"],
  },

  // ====================== T-SHIRTS ====================================
  {
    id: 3,
    nombre: "T-SHIRT BOXING CLUB",
    categoria: "T-Shirts",
    categoriaSlug: "t-shirts",
    precioLista: "$45.000",
    precioContado: "$31.500",
    cuotas: "6 pagos sin recargo de $7.500 con Mercado Pago",
    img: "/img3.webp",
    destacado: true,
    talles: ["S", "M", "L"],
  },

  // ====================== PANTS ====================================
  {
    id: 4,
    nombre: "PANTS CARGO UTILITY",
    categoria: "Pants",
    categoriaSlug: "pants",
    precioLista: "$85.000",
    precioContado: "$20.500",
    cuotas: "6 pagos sin recargo de $14.166 con Mercado Pago",
    img: "/img4.webp",
    destacado: true,
    talles: ["38", "40", "42", "44"],
  },

  {
    id: 5,
    nombre: "PANTS CARGO UTILITY",
    categoria: "Pants",
    categoriaSlug: "pants",
    precioLista: "$85.000",
    precioContado: "$30.500",
    cuotas: "6 pagos sin recargo de $14.166 con Mercado Pago",
    img: "/img4.webp",
    destacado: true,
    talles: ["S", "M", "L"],
  },

  {
    id: 6,
    nombre: "PANTS CARGO UTILITY",
    categoria: "Pants",
    categoriaSlug: "pants",
    precioLista: "$85.000",
    precioContado: "$40.500",
    cuotas: "6 pagos sin recargo de $14.166 con Mercado Pago",
    img: "/img1.webp",
    destacado: true,
    talles: ["M", "L", "XL"],
  },

  {
    id: 7,
    nombre: "PANTS CARGO UTILITY",
    categoria: "Pants",
    categoriaSlug: "pants",
    precioLista: "$85.000",
    precioContado: "$70.500",
    cuotas: "6 pagos sin recargo de $14.166 con Mercado Pago",
    img: "/img2.webp",
    destacado: false,
    talles: ["S", "M", "L"],
  },

  // ====================== ACCESORIOS ====================================
  {
    id: 8,
    nombre: "ACCESORIO CARGO UTILITY",
    categoria: "Accesorio",
    categoriaSlug: "accesorios",
    precioLista: "$85.000",
    precioContado: "$59.500",
    cuotas: "6 pagos sin recargo de $14.166 con Mercado Pago",
    img: "/img3.webp",
    destacado: false,
    talles: ["M", "L", "XL"],
  },
];

// Exportamos también los destacados
export const productosDestacados = todosLosProductos.filter((prod) => prod.destacado);
