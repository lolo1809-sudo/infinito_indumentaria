import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./global.css";
import ScrollToTop from "./components/ScrollToTop";
import Footer from "./components/Footer";

// Páginas
import Inicio from "./pages/Inicio";
import CategoryPage from "./pages/CategoryPage";

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/categorias/:categoria" element={<CategoryPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}
