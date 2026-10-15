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
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarProductosDelLocal = async () => {
      setCargando(true);

      const currentHost = window.location.hostname.replace(/^www\./, ""); // Ej: "kalmaind.netlify.app" o "localhost"

      // Consulta cruzando la tabla productos con locales mediante el slug
      const { data, error } = await supabase
        .from("productos")
        .select(
          `
          *,
          locales!inner (
            slug
          )
        `,
        )
        .eq("locales.slug", currentHost);

      if (!error) {
        setProductos(data || []);
      }
      setCargando(false);
    };

    cargarProductosDelLocal();
  }, []);

  // Pantalla de carga...
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
          <Route path="/" element={<Inicio productos={productos} />} />
          <Route path="/categorias/:categoria" element={<CategoryPage productos={productos} />} />
          <Route path="/producto/:id" element={<ProductDetail productos={productos} />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
