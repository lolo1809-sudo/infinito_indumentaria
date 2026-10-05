export default function SectionTitle({ texto, className = "" }) {
  return (
    <div className={`text-center mt-20 mb-12 ${className}`}>
      <h2 className="text-2xl md:text-3xl font-extrabold text-text-primary uppercase tracking-[0.2em]">{texto}</h2>
      <div className="w-12 h-[2px] bg-accent mx-auto mt-3"></div>
    </div>
  );
}
