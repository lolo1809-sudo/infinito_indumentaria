// No se permite el registro, eso lo manejo yo en Supabase

import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function Login() {
  const [modo, setModo] = useState("login"); // "login" | "delete"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [usuarioActual, setUsuarioActual] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    async function obtenerSesion() {
      const { data } = await supabase.auth.getSession();
      setUsuarioActual(data?.session?.user ?? null);
    }
    obtenerSesion();
  }, []);

  const manejarEnvio = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (modo === "login") {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;

        toast.success("¡Bienvenido al panel!");
        navigate("/admin");
      } else if (modo === "delete") {
        const { error: errorAuth } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (errorAuth) throw errorAuth;

        const { error: errorDelete } = await supabase.rpc("eliminar_usuario");
        if (errorDelete) throw errorDelete;

        await supabase.auth.signOut();
        setUsuarioActual(null);
        setEmail("");
        setPassword("");
        setModo("login");
        toast.success("Cuenta eliminada permanentemente.");
      }
    } catch (err) {
      if (err.message === "Invalid login credentials") {
        toast.error("Correo o contraseña incorrectos.");
      } else {
        toast.error("Error: " + err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const cerrarSesion = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error("Error al cerrar sesión: " + error.message);
    } else {
      setUsuarioActual(null);
      setEmail("");
      setPassword("");
      toast.info("Has cerrado sesión.");
    }
  };

  return (
    <>
      <title>Acceso Locales | Gestión de Catálogo</title>
      <meta name="description" content="Panel de administración de catálogo" />

      <div className="min-h-screen flex items-center justify-center bg-bg-secondary px-4">
        <div className="w-full max-w-md p-8 rounded-custom bg-bg-card border border-border shadow-sm">
          <h2 className="text-3xl font-bold text-text-primary mb-2 text-center">{modo === "login" ? "Panel de Gestión" : "Eliminar Cuenta"}</h2>

          {modo === "delete" && <p className="text-accent text-xs text-center mb-6 font-medium">Acción irreversible. Ingresa tus credenciales para confirmar la baja total.</p>}

          <form onSubmit={manejarEnvio} className="flex flex-col gap-4 mt-4">
            <div>
              <label className="block text-text-secondary text-sm font-semibold mb-1">Correo Electrónico</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-bg-custom border border-border text-text-primary rounded-custom px-4 py-2.5 outline-none focus:border-accent transition-colors"
              />
            </div>

            <div>
              <label className="block text-text-secondary text-sm font-semibold mb-1">Contraseña</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-bg-custom border border-border text-text-primary rounded-custom px-4 py-2.5 outline-none focus:border-accent transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full font-bold rounded-custom px-4 py-3 mt-4 transition-colors disabled:opacity-50 cursor-pointer ${
                modo === "delete" ? "bg-accent hover:bg-accent-hover text-white" : "bg-accent hover:bg-accent-hover text-white"
              }`}
            >
              {loading ? "Procesando..." : modo === "login" ? "Ingresar al Panel" : "Confirmar y Eliminar Cuenta"}
            </button>
          </form>

          <div className="mt-6 flex flex-col gap-3">
            {modo === "delete" ? (
              <button type="button" onClick={() => setModo("login")} className="w-full text-text-secondary hover:text-text-primary text-sm transition-colors font-medium cursor-pointer">
                Volver a Iniciar Sesión
              </button>
            ) : (
              <button type="button" onClick={() => setModo("delete")} className="w-full text-accent hover:underline text-sm transition-colors font-medium cursor-pointer">
                ¿Deseas dar de baja tu local? Haz clic aquí
              </button>
            )}

            {usuarioActual && modo !== "delete" && (
              <button
                type="button"
                onClick={cerrarSesion}
                className="w-full bg-accent/10 text-accent border border-accent/20 hover:bg-accent hover:text-white font-semibold py-2.5 px-4 rounded-custom text-sm transition-all duration-200 mt-2 flex items-center justify-center gap-2 cursor-pointer"
              >
                <i className="fa-solid fa-arrow-right-from-bracket"></i>
                Cerrar Sesión ({usuarioActual.email})
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
