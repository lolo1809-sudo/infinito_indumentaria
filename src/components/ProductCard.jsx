import { Link } from "react-router-dom";

export default function ProductCard({ id, nombre, imgs = [], className = "" }) {
  const portada = Array.isArray(imgs) ? imgs[0] : imgs;

  return (
    <article className={`flex flex-col bg-bg-custom ${className}`}>
      <div className="w-full aspect-[4/5] overflow-hidden bg-bg-secondary mb-4">
        <img src={portada || "/placeholder.webp"} alt={nombre} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
      </div>

      <div className="flex flex-col flex-grow text-left">
        <h3 className="text-text-primary font-bold text-lg tracking-wide uppercase mb-4">{nombre}</h3>

        <Link
          to={`/producto/${id}`}
          className="mt-auto inline-flex items-center justify-center w-[120px] bg-accent hover:bg-accent-hover text-bg-custom font-semibold py-2 rounded-custom transition-colors cursor-pointer text-center text-sm"
        >
          Más info
        </Link>
      </div>
    </article>
  );
}
