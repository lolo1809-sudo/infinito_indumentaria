import React from "react";
import { Link } from "react-router-dom";
import SectionTitle from "./SectionTitle";
import { CATEGORIAS } from "../config";

export default function Categorias() {
  return (
    <section id="categorias" className="w-full bg-bg-custom py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <SectionTitle texto="CATEGORÍAS" />

        <div className="grid grid-cols-1 md:grid-cols-2 border border-border">
          {CATEGORIAS.map((cat, index) => (
            <Link key={cat.slug} to={`/categorias/${cat.slug}`} className="relative w-full aspect-[2/1] overflow-hidden bg-bg-secondary group block border border-border">
              <img
                src={cat.img}
                alt={cat.nombre}
                loading={index < 2 ? "eager" : "lazy"}
                decoding="async"
                fetchPriority={index < 2 ? "high" : "auto"}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-500"></div>
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
