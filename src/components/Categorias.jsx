import React from "react";
import { Link } from "react-router-dom";
import SectionTitle from "./SectionTitle";

const categorias = [
  {
    id: 1,
    nombre: "REMERAS",
    path: "remeras",
    img: "https://images.unsplash.com/photo-1772549145407-dd62ea2ba581?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
  },
  {
    id: 2,
    nombre: "CAMISAS",
    path: "camisas",
    img: "https://images.unsplash.com/photo-1740711152088-88a009e877bb?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
  },
  {
    id: 3,
    nombre: "ABRIGOS",
    path: "abrigos",
    img: "https://images.unsplash.com/photo-1782227286076-4f5153a8cdac?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
  },
  {
    id: 4,
    nombre: "PANTALONES",
    path: "pantalones",
    img: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=697&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
  },
  {
    id: 5,
    nombre: "SASTRERÍA",
    path: "sastreria",
    img: "https://images.unsplash.com/photo-1536867520774-5b4f2628a69b?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
  },
  {
    id: 6,
    nombre: "ACCESORIOS",
    path: "accesorios",
    img: "https://images.unsplash.com/3/www.madebyvadim.com.jpg?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
  },
  {
    id: 7,
    nombre: "PIEZAS DE PLATA",
    path: "piezas_plata",
    img: "https://images.unsplash.com/photo-1721206624412-cfa399668d46?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
  },
];

export default function Categorias() {
  return (
    <section id="categorias" className="w-full bg-bg-custom py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <SectionTitle texto="CATEGORÍAS" />

        {/* Categorías */}
        <div className="grid grid-cols-1 md:grid-cols-2 border border-border">
          {categorias.map((cat, index) => (
            <Link key={cat.id} to={`/categorias/${cat.path}`} className="relative w-full aspect-[2/1] overflow-hidden bg-bg-secondary group block border border-border">
              {/* Imagen */}
              <img
                src={cat.img}
                alt={cat.nombre}
                loading={index < 2 ? "eager" : "lazy"} // Las primeras cargan de una, las demás cuando haces scroll
                decoding="async"
                fetchPriority={index < 2 ? "high" : "auto"}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

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
