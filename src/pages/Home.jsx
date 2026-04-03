import { Link } from "react-router-dom";
import Carousel from "../components/Carousel";

export default function Home() {
  const slides = [
    { src: "/evento.png", alt: "Cell Ag 1" },
    // { src: "/slides/slide2.jpg", alt: "Cell Ag 2" },
    // { src: "/slides/slide3.jpg", alt: "Cell Ag 3" },
  ];

  return (
    <>
      <section className="bg-green-50 py-20 px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-green-700 font-semibold uppercase tracking-wide mb-3">
              Cell Ag Argentina
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-green-900 mb-6">
              Impulsamos el futuro de la agricultura celular en Argentina
            </h1>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Cell Ag Argentina es una organización sin fines de lucro que impulsa
              el desarrollo de la agricultura celular y las proteínas alternativas en el país.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              Articula ciencia, industria y política para promover sistemas
              alimentarios más sostenibles, innovadores y alineados con los
              desafíos del futuro.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/associate"
                className="bg-green-700 text-white px-6 py-3 rounded-lg hover:bg-green-800"
              >
                Asociate
              </Link>
              <Link
                to="/team"
                className="border border-green-700 text-green-700 px-6 py-3 rounded-lg hover:bg-green-100"
              >
                Conocer el equipo
              </Link>
            </div>
          </div>

          <div>
            <Carousel slides={slides} aspect="aspect-[4/3]" />
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-6">
          {[
            ["Equipo", "Conocé la gestión y las personas que impulsan la organización."],
            ["Eventos", "Mirá próximos encuentros, actividades y convocatorias."],
            ["Noticias", "Seguí las novedades y publicaciones institucionales."],
            ["Asociate", "Sumate a la comunidad y participá del crecimiento del sector."],
          ].map(([title, text]) => (
            <div key={title} className="rounded-2xl border p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-green-800 mb-3">{title}</h2>
              <p className="text-gray-600">{text}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}