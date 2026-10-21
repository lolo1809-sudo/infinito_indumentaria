import SectionTitle from "./SectionTitle";

export default function Ubicacion({ local }) {
  return (
    <section id="ubicacion" className="w-full bg-bg-custom py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <SectionTitle texto="DÓNDE ENCONTRARNOS" />

        <div className="relative w-full h-[420px] md:h-[500px] rounded-custom overflow-hidden border border-border bg-bg-secondary">
          <iframe
            title="Ubicación del Local"
            src={local?.ubicacion}
            className="w-full h-full border-0 filter invert-[90%] hue-rotate-180 contrast-125 brightness-90 grayscale-[25%]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
