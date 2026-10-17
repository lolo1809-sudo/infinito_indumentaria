import { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";

// Componentes
import "./global.css";
import ScrollToTop from "./components/ScrollToTop";
import RutaProtegida from "./components/RutaProtegida";
import PantallaCarga from "./components/PantallaCarga";
import LayoutPublico from "./components/LayoutPublico";

// Páginas
import Inicio from "./pages/Inicio";
import Login from "./pages/Login";
import CategoryPage from "./pages/CategoryPage";
import Admin from "./pages/Admin";
import ProductDetail from "./pages/ProductDetail";
import NotFound from "./pages/NotFound";

export default function App() {
  const [productos, setProductos] = useState([]);
  const [resenas, setResenas] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarDatosDelLocal = async () => {
      setCargando(true);

      const currentHost = window.location.hostname.replace(/^www\./, "");

      // Consultas en paralelo para optimizar la carga
      const [respProductos, respResenas] = await Promise.all([
        // Trae todos los productos cuyo local_slug sea igual al link de la página actual
        supabase
          .from("productos")
          .select(
            `
            *,
            locales!inner ( slug )
          `,
          )
          .eq("locales.slug", currentHost),

        // Trae todas las reseñas cuyo local_slug sea igual al link de la página actual
        supabase
          .from("google_resenas")
          .select(
            `
            *,
            locales!inner ( slug )
          `,
          )
          .eq("locales.slug", currentHost),
      ]);

      if (!respProductos.error) {
        setProductos(respProductos.data || []);
      }

      if (!respResenas.error) {
        setResenas(respResenas.data || []);
      }

      setCargando(false);
    };

    cargarDatosDelLocal();
  }, []);

  if (cargando) {
    return <PantallaCarga />;
  }

  return (
    <Router>
      <Toaster richColors position="top-right" theme="dark" />
      <ScrollToTop />
      <Routes>
        {/* Rutas de administrador (privadas) */}
        <Route path="/login" element={<Login />} />
        <Route element={<RutaProtegida />}>
          <Route path="/admin" element={<Admin />} />
        </Route>

        {/* Rutas públicas */}
        <Route element={<LayoutPublico />}>
          <Route path="/" element={<Inicio productos={productos} resenas={resenas} />} />
          <Route path="/categorias/:categoria" element={<CategoryPage productos={productos} />} />
          <Route path="/producto/:id" element={<ProductDetail productos={productos} />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
