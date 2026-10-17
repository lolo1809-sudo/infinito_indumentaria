import SectionTitle from "./SectionTitle";

export default function Ubicacion() {
  const mapSrc =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d27194.971232705626!2d-68.57266106523443!3d-31.568861539971785!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x96813fe9d5656783%3A0xd5c50747331a459d!2sIndumentaria%20Deportiva%20L.M!5e0!3m2!1ses!2sar!4v1792278931493!5m2!1ses!2sar";

  return (
    <section id="ubicacion" className="w-full bg-bg-custom py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <SectionTitle texto="DÓNDE ENCONTRARNOS" />

        <div className="relative w-full h-[420px] md:h-[500px] rounded-custom overflow-hidden border border-border bg-bg-secondary">
          <iframe
            title="Ubicación Kalma Indumentaria"
            src={mapSrc}
            className="w-full h-full border-0 filter invert-[90%] hue-rotate-180 contrast-125 brightness-90 grayscale-[25%]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
