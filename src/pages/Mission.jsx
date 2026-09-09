import { useI18n } from "../i18n/I18nContext";
import team from "../data/team.json";

const copy = {
  es: { kicker: "Cell Ag Argentina", title: "Sobre nosotros", purpose: "Nuestro propósito", mission: "Misión", mission1: "Fomentar la creación, producción y comercialización de alimentos asequibles, accesibles, seguros y de alta calidad, que reproduzcan la experiencia sensorial y nutricional de los productos convencionales de origen animal, impulsando una transición alimentaria sostenible con impacto positivo en la salud, el ambiente y la economía nacional.", mission2: "Para esto, promovemos el desarrollo del campo de las proteínas alternativas en Argentina —cultivo celular, base vegetal (plant-based) y fermentación en sus modalidades clásica, de biomasa y de precisión— reuniendo a investigadores, empresas, inversores, estudiantes y organizaciones de la sociedad civil.", vision: "Visión", visionText: "Ser la organización de referencia que consolide a la Argentina como un actor relevante en el desarrollo, la producción y la adopción de proteínas alternativas a nivel regional e internacional, articulando ciencia, industria, políticas públicas y sociedad civil para construir un sistema alimentario más sostenible, ético y competitivo.", team: "Nuestro equipo", teamIntro: "Conocé a las personas que impulsan Cell Ag Argentina desde la gestión, la articulación institucional y la construcción de comunidad.", management: "Gestión", honorary: "Socios de honor" },
  en: { kicker: "Cell Ag Argentina", title: "About us", purpose: "Our purpose", mission: "Mission", mission1: "To foster the creation, production and commercialization of affordable, accessible, safe and high-quality foods that reproduce the sensory and nutritional experience of conventional animal products, driving a sustainable food transition with a positive impact on health, the environment and the national economy.", mission2: "We promote the development of alternative proteins in Argentina—cell cultivation, plant-based products and classical, biomass and precision fermentation—bringing together researchers, companies, investors, students and civil society organizations.", vision: "Vision", visionText: "To become the leading organization establishing Argentina as a relevant regional and international player in the development, production and adoption of alternative proteins, connecting science, industry, public policy and civil society to build a more sustainable, ethical and competitive food system.", team: "Our team", teamIntro: "Meet the people advancing Cell Ag Argentina through management, institutional collaboration and community building.", management: "Management", honorary: "Honorary members" },
};

export default function Mission() {
  const { locale } = useI18n();
  const c = copy[locale];
  const roleEn = { Presidente: "President", Secretario: "Secretary", "Vocal titular": "Board member", "Socia de honor": "Honorary member" };
  const groups = [
    [c.management, team.filter((person) => person.group === "Gestión")],
    [c.honorary, team.filter((person) => person.group === "Socios de honor")],
  ];
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
        <div className="mx-auto max-w-6xl"><p className="mb-8 text-xs font-bold uppercase tracking-[0.2em] text-[#185b45]">{c.purpose}</p><div className="grid gap-8 lg:grid-cols-2">
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
        </div></div>
      </section>

      <section id="equipo" className="border-t border-[#d9e3dc] bg-white px-6 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#ed684a]">Cell Ag Argentina</p>
          <h2 className="text-4xl font-bold tracking-tight text-[#122f27] md:text-5xl">{c.team}</h2>
          <p className="mb-12 mt-4 max-w-3xl text-lg leading-8 text-gray-600">{c.teamIntro}</p>
          {groups.map(([title, people]) => <section className="mb-14 last:mb-0" key={title}>
            <h3 className="mb-6 text-2xl font-bold text-green-800">{title}</h3>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {people.map((person) => <article className="rounded-2xl border bg-white p-6 text-center shadow-sm" key={person.name}>
                <img src={person.image} alt={person.name} className="mx-auto mb-4 h-32 w-32 rounded-full border-4 border-green-100 object-cover" onError={(event) => { event.currentTarget.src = "/team/default-avatar.jpg"; }} />
                <h4 className="text-lg font-semibold text-gray-900">{person.name}</h4>
                <p className="text-green-700">{locale === "en" ? roleEn[person.role] || person.role : person.role}</p>
              </article>)}
            </div>
          </section>)}
        </div>
      </section>
    </div>
  );
}
