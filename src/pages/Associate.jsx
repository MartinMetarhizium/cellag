import { useState } from "react";

export default function Asociate() {
const [form, setForm] = useState({
nombre: "",
apellido: "",
email: "",
telefono: "",
provincia: "",
localidad: "",
tipo: "Individuo",
mensaje: "",
});

const handleChange = (e) => {
setForm((prev) => ({
...prev,
[e.target.name]: e.target.value,
}));
};

const handleSubmit = (e) => {
e.preventDefault();
console.log("Formulario asociate:", form);
alert("Formulario enviado (demo). Después se conecta a backend o Formspree.");
};

return (
<div className="max-w-6xl mx-auto px-6 py-16">
<div className="grid lg:grid-cols-2 gap-12">
<div>
<p className="text-green-700 font-semibold uppercase tracking-wide mb-3">
Sumate a Cell Ag Argentina
</p>
<h1 className="text-4xl font-bold text-green-900 mb-6">Asociate</h1>
<p className="text-gray-700 leading-relaxed mb-6">
Formá parte de una comunidad que impulsa la agricultura celular y las
proteínas alternativas en Argentina.
</p>
      <div className="space-y-4">
        <div className="rounded-xl bg-green-50 p-4">
          <h2 className="font-semibold text-green-800">Red de intercambio</h2>
          <p className="text-gray-700">
            Vinculación entre personas, instituciones y empresas del ecosistema.
          </p>
        </div>
        <div className="rounded-xl bg-green-50 p-4">
          <h2 className="font-semibold text-green-800">Acceso a actividades</h2>
          <p className="text-gray-700">
            Participación en eventos, encuentros y espacios de discusión.
          </p>
        </div>
        <div className="rounded-xl bg-green-50 p-4">
          <h2 className="font-semibold text-green-800">Construcción sectorial</h2>
          <p className="text-gray-700">
            Aporte a una agenda de innovación, sostenibilidad y articulación pública-privada.
          </p>
        </div>
      </div>
    </div>

    <form onSubmit={handleSubmit} className="rounded-2xl border bg-white shadow-sm p-6">
      <h2 className="text-2xl font-bold text-green-800 mb-6">Quiero asociarme</h2>

      <div className="grid md:grid-cols-2 gap-4">
        <input name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} className="border rounded-lg px-4 py-3" required />
        <input name="apellido" placeholder="Apellido" value={form.apellido} onChange={handleChange} className="border rounded-lg px-4 py-3" required />
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} className="border rounded-lg px-4 py-3 md:col-span-2" required />
        <input name="telefono" placeholder="Teléfono" value={form.telefono} onChange={handleChange} className="border rounded-lg px-4 py-3" />
        <input name="provincia" placeholder="Provincia" value={form.provincia} onChange={handleChange} className="border rounded-lg px-4 py-3" />
        <input name="localidad" placeholder="Localidad" value={form.localidad} onChange={handleChange} className="border rounded-lg px-4 py-3 md:col-span-2" />
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de asociado</label>
        <select
          name="tipo"
          value={form.tipo}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-3"
        >
          <option>Individuo</option>
          <option>Empresa</option>
          <option>Institución</option>
        </select>
      </div>

      <textarea
        name="mensaje"
        placeholder="Contanos brevemente tu interés"
        value={form.mensaje}
        onChange={handleChange}
        rows={5}
        className="w-full border rounded-lg px-4 py-3 mt-4"
      />

      <button
        type="submit"
        className="mt-6 w-full bg-green-700 text-white py-3 rounded-lg hover:bg-green-800"
      >
        Enviar solicitud
      </button>
    </form>
  </div>
</div>
);
}