export default function Mission() {
  return (
    <div className="bg-[#f8f3e9]">
      <section className="bg-gradient-to-br from-[#0d2f27] to-[#185b45] px-6 py-20 text-white">
        <div className="mx-auto max-w-6xl">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-[#f6aa4d]">
            Nuestro propósito
          </p>
          <h1 className="max-w-4xl text-5xl font-bold tracking-tight md:text-7xl">
            Transformar el futuro de la alimentación
          </h1>
        </div>
      </section>

      <section className="px-6 py-16 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2">
          <article className="rounded-3xl bg-white p-8 shadow-sm md:p-12">
            <span className="mb-7 grid h-12 w-12 place-items-center rounded-full bg-[#edf3ee] font-bold text-[#185b45]">
              01
            </span>
            <h2 className="mb-6 text-4xl font-bold tracking-tight text-[#122f27]">Misión</h2>
            <p className="text-lg leading-8 text-gray-600">
              Fomentar la creación, producción y comercialización de alimentos asequibles,
              accesibles, seguros y de alta calidad, que reproduzcan la experiencia sensorial y
              nutricional de los productos convencionales de origen animal, impulsando una
              transición alimentaria sostenible con impacto positivo en la salud, el ambiente y
              la economía nacional.
            </p>
            <p className="mt-5 text-lg leading-8 text-gray-600">
              Para esto, promovemos el desarrollo del campo de las proteínas alternativas en
              Argentina —cultivo celular, base vegetal (plant-based) y fermentación en sus
              modalidades clásica, de biomasa y de precisión— reuniendo a investigadores,
              empresas, inversores, estudiantes y organizaciones de la sociedad civil.
            </p>
          </article>

          <article className="rounded-3xl bg-[#ed684a] p-8 text-white shadow-sm md:p-12">
            <span className="mb-7 grid h-12 w-12 place-items-center rounded-full bg-white/15 font-bold">
              02
            </span>
            <h2 className="mb-6 text-4xl font-bold tracking-tight">Visión</h2>
            <p className="text-lg leading-8 text-white/90">
              Ser la organización de referencia que consolide a la Argentina como un actor
              relevante en el desarrollo, la producción y la adopción de proteínas alternativas
              a nivel regional e internacional, articulando ciencia, industria, políticas
              públicas y sociedad civil para construir un sistema alimentario más sostenible,
              ético y competitivo.
            </p>
          </article>
        </div>
      </section>
    </div>
  );
}
