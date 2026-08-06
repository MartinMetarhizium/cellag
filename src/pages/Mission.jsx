import { useI18n } from "../i18n/I18nContext";

const copy = {
  es: { kicker: "Nuestro propósito", title: "Transformar el futuro de la alimentación", mission: "Misión", mission1: "Fomentar la creación, producción y comercialización de alimentos asequibles, accesibles, seguros y de alta calidad, que reproduzcan la experiencia sensorial y nutricional de los productos convencionales de origen animal, impulsando una transición alimentaria sostenible con impacto positivo en la salud, el ambiente y la economía nacional.", mission2: "Para esto, promovemos el desarrollo del campo de las proteínas alternativas en Argentina —cultivo celular, base vegetal (plant-based) y fermentación en sus modalidades clásica, de biomasa y de precisión— reuniendo a investigadores, empresas, inversores, estudiantes y organizaciones de la sociedad civil.", vision: "Visión", visionText: "Ser la organización de referencia que consolide a la Argentina como un actor relevante en el desarrollo, la producción y la adopción de proteínas alternativas a nivel regional e internacional, articulando ciencia, industria, políticas públicas y sociedad civil para construir un sistema alimentario más sostenible, ético y competitivo." },
  en: { kicker: "Our purpose", title: "Transforming the future of food", mission: "Mission", mission1: "To foster the creation, production and commercialization of affordable, accessible, safe and high-quality foods that reproduce the sensory and nutritional experience of conventional animal products, driving a sustainable food transition with a positive impact on health, the environment and the national economy.", mission2: "We promote the development of alternative proteins in Argentina—cell cultivation, plant-based products and classical, biomass and precision fermentation—bringing together researchers, companies, investors, students and civil society organizations.", vision: "Vision", visionText: "To become the leading organization establishing Argentina as a relevant regional and international player in the development, production and adoption of alternative proteins, connecting science, industry, public policy and civil society to build a more sustainable, ethical and competitive food system." },
};

export default function Mission() {
  const { locale } = useI18n();
  const c = copy[locale];
  return (
    <div className="bg-[#f8f3e9]">
      <section className="bg-gradient-to-br from-[#0d2f27] to-[#185b45] px-6 py-20 text-white">
        <div className="mx-auto max-w-6xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#f6aa4d]">
            {c.kicker}
          </p>
          <h1 className="max-w-4xl text-5xl font-bold tracking-tight md:text-7xl">
            {c.title}
          </h1>
        </div>
      </section>

      <section className="px-6 py-16 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2">
          <article className="rounded-3xl bg-white p-8 shadow-sm md:p-12">
            <span className="mb-7 grid h-12 w-12 place-items-center rounded-full bg-[#edf3ee] font-bold text-[#185b45]">
              01
            </span>
            <h2 className="mb-6 text-4xl font-bold tracking-tight text-[#122f27]">{c.mission}</h2>
            <p className="text-lg leading-8 text-gray-600">{c.mission1}</p>
            <p className="mt-5 text-lg leading-8 text-gray-600">{c.mission2}</p>
          </article>

          <article className="rounded-3xl bg-[#ed684a] p-8 text-white shadow-sm md:p-12">
            <span className="mb-7 grid h-12 w-12 place-items-center rounded-full bg-white/15 font-bold">
              02
            </span>
            <h2 className="mb-6 text-4xl font-bold tracking-tight">{c.vision}</h2>
            <p className="text-lg leading-8 text-white/90">{c.visionText}</p>
          </article>
        </div>
      </section>
    </div>
  );
}
