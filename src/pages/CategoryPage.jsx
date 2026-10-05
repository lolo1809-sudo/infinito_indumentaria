import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import SectionTitle from "../components/SectionTitle";
import EmptyCategory from "../components/EmptyCategory";
import Sidebar from "../components/Sidebar";
import { todosLosProductos } from "../productos.js";

export default function CategoryPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { categoria } = useParams();

  const productosFiltrados = todosLosProductos.filter((prod) => prod.categoriaSlug === categoria);

  const tituloFormateado = categoria ? categoria.replace("-", " ").toUpperCase() : "CATEGORÍA";

  return (
    <main className="w-full bg-bg-custom py-12 px-4 min-h-screen relative">
      {/* Sidebar Drawer */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Barra superior con navegación para volver y abrir categorías */}
      <div className="max-w-6xl mx-auto flex items-center justify-between mb-6">
        <button
          onClick={() => setSidebarOpen(true)}
          className="flex items-center gap-2 px-3 py-2 rounded-custom bg-bg-card border border-border text-text-primary hover:border-accent transition-colors cursor-pointer text-sm font-semibold"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
          Categorías
        </button>

        <Link to="/" className="text-xs tracking-widest uppercase font-bold text-text-secondary transition-colors duration-200 hover:!text-[#a0b800]">
          ← Volver al inicio
        </Link>
      </div>

      <div className="max-w-6xl mx-auto">
        <SectionTitle texto={tituloFormateado} className="mt-4" />

        {productosFiltrados.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {productosFiltrados.map((prod) => (
              <ProductCard key={prod.id} {...prod} className="flex" />
            ))}
          </div>
        ) : (
          <EmptyCategory categoria={tituloFormateado} />
        )}
      </div>
    </main>
  );
}
