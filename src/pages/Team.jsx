import team from "../data/team.json";
import { useI18n } from "../i18n/I18nContext";

export default function Equipo() {
  const { locale } = useI18n();
  const c = locale === "en" ? { title: "Team", intro: "Meet the people advancing Cell Ag Argentina through management, institutional collaboration and community building.", management: "Management", honorary: "Honorary members" } : { title: "Equipo", intro: "Conocé a las personas que impulsan Cell Ag Argentina desde la gestión, la articulación institucional y la construcción de comunidad.", management: "Gestión", honorary: "Socios de honor" };
  const roleEn = { Presidente: "President", Secretario: "Secretary", "Vocal titular": "Board member", "Socia de honor": "Honorary member" };
  const gestion = team.filter((p) => p.group === "Gestión");
  const honor = team.filter((p) => p.group === "Socios de honor");
  const Section = ({ title, items }) => (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-green-800 mb-6">{title}</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((person) => (
          <div
            key={person.name}
            className="rounded-2xl border bg-white p-6 shadow-sm text-center"
          >
            <img
              src={person.image}
              alt={person.name}
              className="h-32 w-32 rounded-full object-cover mx-auto mb-4 border-4 border-green-100"
              onError={(e) => {
                e.currentTarget.src = "/team/default-avatar.jpg";
              }}
            />
            <h3 className="text-lg font-semibold text-gray-900">{person.name}</h3>
            <p className="text-green-700">{locale === "en" ? roleEn[person.role] || person.role : person.role}</p>
          </div>
        ))}
      </div>
    </section>
  );

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold text-green-900 mb-4">{c.title}</h1>
      <p className="text-gray-700 max-w-3xl mb-10">{c.intro}</p>

      <Section title={c.management} items={gestion} />
      <Section title={c.honorary} items={honor} />
      {/* <Section title="Equipo" items={equipo} /> */}
    </div>
  );
}
