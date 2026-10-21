// Conectar la aplicación de React con la base de datos de Supabase
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Lista centralizada única de categorías
export const CATEGORIAS = [
  {
    slug: "remeras",
    nombre: "Remeras",
    img: "https://images.unsplash.com/photo-1772549145407-dd62ea2ba581?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
        <path d="M20.38 3.46L16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z" />
      </svg>
    ),
  },

  {
    slug: "camisas",
    nombre: "Camisas",
    img: "https://images.unsplash.com/photo-1740711152088-88a009e877bb?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
        <path d="M6 3h12l4 6-5 3-2-2v8H9v-8l-2 2-5-3 4-6z" />
        <path d="M9 3v4a3 3 0 0 0 6 0V3" />
      </svg>
    ),
  },

  {
    slug: "abrigos",
    nombre: "Abrigos",
    img: "https://images.unsplash.com/photo-1782227286076-4f5153a8cdac?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
        <path d="M15 3v4a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2V3m-4 5l-3 3 2 2 2-2v9h12v-9l2 2 2-2-3-3" />
      </svg>
    ),
  },

  {
    slug: "pantalones",
    nombre: "Pantalones",
    img: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=697&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
        <path d="M14 2H10a2 2 0 0 0-2 2v18l4-2 4 2V4a2 2 0 0 0-2-2z" />
      </svg>
    ),
  },

  {
    slug: "sastreria",
    nombre: "Sastrería",
    img: "https://images.unsplash.com/photo-1536867520774-5b4f2628a69b?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },

  {
    slug: "accesorios",
    nombre: "Accesorios",
    img: "https://images.unsplash.com/3/www.madebyvadim.com.jpg?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v4l3 3" />
      </svg>
    ),
  },

  {
    slug: "piezas_plata",
    nombre: "Piezas de Plata",
    img: "https://images.unsplash.com/photo-1721206624412-cfa399668d46?w=1200&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
  },
];
