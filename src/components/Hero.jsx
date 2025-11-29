export default function Hero() {
  return (
    <section className="bg-green-50 py-20 text-center px-6">
      <h2 className="text-4xl font-bold text-green-800 mb-4">
        Associação Brasileira de Agricultura Celular
      </h2>
      <p className="text-lg text-gray-700 max-w-2xl mx-auto">
        Promovendo o avanço da agricultura celular no Brasil por meio de ensino,
        pesquisa e colaboração interdisciplinar.
      </p>
      <a
        href="#about"
        className="inline-block mt-6 bg-green-700 text-white px-6 py-2 rounded hover:bg-green-800"
      >
        Saiba mais
      </a>
    </section>
  );
}