import { useState } from "react";
import { useI18n } from "../i18n/I18nContext";

const copy = {
  es: { kicker:"Sumate a Cell Ag Argentina", title:"Asociate", intro:"Formá parte de una comunidad que impulsa la agricultura celular y las proteínas alternativas en Argentina.", benefits:[["Red de intercambio","Vinculación entre personas, instituciones y empresas del ecosistema."],["Acceso a actividades","Participación en eventos, encuentros y espacios de discusión."],["Construcción sectorial","Aporte a una agenda de innovación, sostenibilidad y articulación pública-privada."]], form:"Quiero asociarme", first:"Nombre", last:"Apellido", phone:"Teléfono", state:"Provincia", city:"Localidad", type:"Tipo de asociado", individual:"Individuo", company:"Empresa", institution:"Institución", message:"Contanos brevemente tu interés", send:"Enviar solicitud", sent:"Formulario enviado (demo). Después se conecta a backend o Formspree." },
  en: { kicker:"Join Cell Ag Argentina", title:"Join us", intro:"Become part of a community advancing cellular agriculture and alternative proteins in Argentina.", benefits:[["Exchange network","Connections among people, institutions and companies across the ecosystem."],["Access to activities","Participation in events, meetings and discussion spaces."],["Building the sector","Contribute to an innovation, sustainability and public-private collaboration agenda."]], form:"I want to join", first:"First name", last:"Last name", phone:"Phone", state:"Province / State", city:"City", type:"Member type", individual:"Individual", company:"Company", institution:"Institution", message:"Briefly tell us about your interest", send:"Send application", sent:"Form submitted (demo). It can later be connected to a backend or Formspree." },
};

export default function Associate() {
  const { locale } = useI18n();
  const c = copy[locale];
  const [form, setForm] = useState({ nombre:"", apellido:"", email:"", telefono:"", provincia:"", localidad:"", tipo:"individual", mensaje:"" });
  const handleChange = (event) => setForm((previous) => ({ ...previous, [event.target.name]: event.target.value }));
  const handleSubmit = (event) => { event.preventDefault(); console.log("Formulario asociate:", form); alert(c.sent); };

  return (
    <div className="max-w-6xl mx-auto px-6 py-16"><div className="grid lg:grid-cols-2 gap-12">
      <div><p className="text-green-700 font-semibold uppercase tracking-wide mb-3">{c.kicker}</p><h1 className="text-4xl font-bold text-green-900 mb-6">{c.title}</h1><p className="text-gray-700 leading-relaxed mb-6">{c.intro}</p>
        <div className="space-y-4">{c.benefits.map(([title,text])=><div key={title} className="rounded-xl bg-green-50 p-4"><h2 className="font-semibold text-green-800">{title}</h2><p className="text-gray-700">{text}</p></div>)}</div>
      </div>
      <form onSubmit={handleSubmit} className="rounded-2xl border bg-white shadow-sm p-6"><h2 className="text-2xl font-bold text-green-800 mb-6">{c.form}</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <input name="nombre" placeholder={c.first} value={form.nombre} onChange={handleChange} className="border rounded-lg px-4 py-3" required />
          <input name="apellido" placeholder={c.last} value={form.apellido} onChange={handleChange} className="border rounded-lg px-4 py-3" required />
          <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} className="border rounded-lg px-4 py-3 md:col-span-2" required />
          <input name="telefono" placeholder={c.phone} value={form.telefono} onChange={handleChange} className="border rounded-lg px-4 py-3" />
          <input name="provincia" placeholder={c.state} value={form.provincia} onChange={handleChange} className="border rounded-lg px-4 py-3" />
          <input name="localidad" placeholder={c.city} value={form.localidad} onChange={handleChange} className="border rounded-lg px-4 py-3 md:col-span-2" />
        </div>
        <div className="mt-4"><label className="block text-sm font-medium text-gray-700 mb-2">{c.type}</label><select name="tipo" value={form.tipo} onChange={handleChange} className="w-full border rounded-lg px-4 py-3"><option value="individual">{c.individual}</option><option value="company">{c.company}</option><option value="institution">{c.institution}</option></select></div>
        <textarea name="mensaje" placeholder={c.message} value={form.mensaje} onChange={handleChange} rows={5} className="w-full border rounded-lg px-4 py-3 mt-4" />
        <button type="submit" className="mt-6 w-full bg-green-700 text-white py-3 rounded-lg hover:bg-green-800">{c.send}</button>
      </form>
    </div></div>
  );
}
