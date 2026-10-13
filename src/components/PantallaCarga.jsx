export default function PantallaCarga() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-bg-custom text-text-primary gap-4">
      {/* Spinner animado */}
      <div className="relative w-12 h-12">
        <div className="w-12 h-12 rounded-full border-2 border-border border-t-accent animate-spin" />
      </div>

      {/* Texto de carga */}
      <div className="flex flex-col items-center gap-1">
        <p className="text-sm font-bold tracking-widest uppercase text-text-primary">Cargando tienda</p>
        <span className="text-xs text-text-secondary tracking-wide">Un momento, por favor...</span>
      </div>
    </div>
  );
}
