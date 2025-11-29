// src/components/Process.jsx
export default function Process() {
  const steps = [
    { title: "1️⃣ Coleta de células", text: "As células são obtidas de forma ética, sem abate animal." },
    { title: "2️⃣ Cultivo", text: "As células são cultivadas em ambiente controlado e nutritivo." },
    { title: "3️⃣ Diferenciação", text: "As células se transformam em tecidos semelhantes aos alimentos." },
    { title: "4️⃣ Produto final", text: "O resultado é um alimento idêntico em sabor e valor nutricional." }
  ];

  return (
    <section id="process" className="py-16 bg-white text-center px-6">
      <h2 className="text-3xl font-bold text-green-800 mb-8">
        Como funciona a agricultura celular
      </h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
        {steps.map((s, i) => (
          <div
            key={i}
            className="bg-green-50 p-6 rounded-xl shadow hover:shadow-md transition"
          >
            <h3 className="font-semibold text-green-700 mb-2">{s.title}</h3>
            <p className="text-gray-700">{s.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
