import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { supabase } from "../config";
import PantallaCarga from "./PantallaCarga";

export default function RutaProtegida() {
  const [cargando, setCargando] = useState(true);
  const [sesion, setSesion] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSesion(session);
      setCargando(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSesion(session);
      setCargando(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (cargando) {
    return <PantallaCarga />;
  }

  // Si no hay sesión, rebota al login
  return sesion ? <Outlet /> : <Navigate to="/login" replace />;
}
