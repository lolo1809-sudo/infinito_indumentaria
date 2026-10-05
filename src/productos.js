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
    img: "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=600&auto=format&fit=crop&q=80",
    destacado: true,
  },
  {
    id: 2,
    nombre: "HOODIE OVERSIZE ESSENTIAL",
    categoria: "Hoodies",
    categoriaSlug: "hoodies",
    precioLista: "$110.000",
    precioContado: "$77.000",
    cuotas: "6 pagos sin recargo de $18.333 con Mercado Pago",
    img: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600&auto=format&fit=crop&q=80",
    destacado: true,
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
    img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&auto=format&fit=crop&q=80",
    destacado: true,
  },

  // ====================== PANTS ====================================
  {
    id: 4,
    nombre: "PANTS CARGO UTILITY",
    categoria: "Pants",
    categoriaSlug: "pants",
    precioLista: "$85.000",
    precioContado: "$59.500",
    cuotas: "6 pagos sin recargo de $14.166 con Mercado Pago",
    img: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&auto=format&fit=crop&q=80",
    destacado: true,
  },

  {
    id: 5,
    nombre: "PANTS CARGO UTILITY",
    categoria: "Pants",
    categoriaSlug: "pants",
    precioLista: "$85.000",
    precioContado: "$59.500",
    cuotas: "6 pagos sin recargo de $14.166 con Mercado Pago",
    img: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&auto=format&fit=crop&q=80",
    destacado: true,
  },

  {
    id: 6,
    nombre: "PANTS CARGO UTILITY",
    categoria: "Pants",
    categoriaSlug: "pants",
    precioLista: "$85.000",
    precioContado: "$59.500",
    cuotas: "6 pagos sin recargo de $14.166 con Mercado Pago",
    img: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&auto=format&fit=crop&q=80",
    destacado: true,
  },
];

// Exportamos también los destacados
export const productosDestacados = todosLosProductos.filter((prod) => prod.destacado);
