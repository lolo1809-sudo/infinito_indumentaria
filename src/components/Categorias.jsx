import React from "react";
import { Link } from "react-router-dom";
import SectionTitle from "./SectionTitle";

const categorias = [
  {
    id: 1,
    nombre: "HOODIES",
    path: "hoodies",
    img: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=1200&auto=format&fit=crop&q=80",
  },
  {
    id: 2,
    nombre: "T-SHIRTS",
    path: "t-shirts",
    img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=1200&auto=format&fit=crop&q=80",
  },
  {
    id: 3,
    nombre: "PANTS",
    path: "pants",
    img: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=1200&auto=format&fit=crop&q=80",
  },
  {
    id: 4,
    nombre: "ACCESORIOS",
    path: "accesorios",
    img: "https://images.unsplash.com/photo-1521369909029-2afed882baee?w=1200&auto=format&fit=crop&q=80",
  },
];

export default function Categorias() {
  return (
    <section id="categorias" className="w-full bg-bg-custom py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <SectionTitle texto="CATEGORÍAS" />

        {/* Categorías*/}
        <div className="grid grid-cols-1 md:grid-cols-2 border border-border">
          {categorias.map((cat) => (
            <Link key={cat.id} to={`/categorias/${cat.path}`} className="relative w-full aspect-[2/1] overflow-hidden bg-bg-secondary group block border border-border">
              {/* Imagen */}
              <img src={cat.img} alt={cat.nombre} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />

              {/* Fondo Oscuro */}
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-500"></div>

              {/* Nombre */}
              <div className="absolute inset-0 flex items-center justify-center md:justify-start md:pl-16 pointer-events-none">
                <h3 className="text-white text-3xl md:text-5xl font-extrabold uppercase tracking-widest drop-shadow-xl">{cat.nombre}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
