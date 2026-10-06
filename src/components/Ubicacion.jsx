import SectionTitle from "./SectionTitle";

export default function Ubicacion() {
  const mapSrc =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d936.0328619373482!2d-68.56258411352812!3d-31.55809866992558!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x96814100274f33d1%3A0xca8cd5d2e1af02c7!2sDali%20Indumentaria!5e0!3m2!1ses!2sar!4v1791288276929!5m2!1ses!2sar";

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
