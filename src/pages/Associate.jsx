import { useState } from "react";
import { useI18n } from "../i18n/I18nContext";

const FORM_ENDPOINT = "https://formsubmit.co/ajax/fedeh1997@gmail.com";

const copy = {
  es: {
    kicker: "Vinculate con Cell Ag Argentina", title: "Contacto",
    intro: "Elegí la forma de vincularte con nosotros: podés realizar una consulta, formar parte de la organización o colaborar con una donación.",
    paths: [["Contacto", "Consultas, propuestas, vinculaciones y otros motivos generales."], ["Asociarse", "Para personas, empresas e instituciones interesadas en formar parte de Cell Ag Argentina."], ["Donar", "Para quienes desean colaborar económicamente con nuestra organización."]],
    community: "Al asociarte, formás parte de una comunidad activa", benefits: [["Red de intercambio", "Vinculación entre personas, instituciones y empresas del ecosistema."], ["Acceso a actividades", "Participación en eventos, encuentros y espacios de discusión."], ["Construcción sectorial", "Aporte a una agenda de innovación, sostenibilidad y articulación pública-privada."]],
    form: "Envianos tu mensaje", first: "Nombre", last: "Apellido", phone: "Teléfono", state: "Provincia", city: "Localidad", reason: "Motivo de contacto", chooseReason: "Seleccioná una opción", contact: "Contacto", associate: "Quiero asociarme", donate: "Quiero donar", type: "Tipo de asociado", individual: "Individuo", company: "Empresa", institution: "Institución", message: "Contanos tu consulta, interés o mensaje", send: "Enviar mensaje", sending: "Enviando…", sent: "¡Gracias! Tu mensaje fue enviado correctamente.", error: "No pudimos enviar el mensaje. Por favor, intentá nuevamente." },
  en: {
    kicker: "Connect with Cell Ag Argentina", title: "Contact",
    intro: "Choose how you would like to connect with us: send an inquiry, become part of the organization or support us with a donation.",
    paths: [["Contact", "Questions, proposals, partnerships and other general inquiries."], ["Join", "For individuals, companies and institutions interested in joining Cell Ag Argentina."], ["Donate", "For those who would like to financially support our organization."]],
    community: "By joining, you become part of an active community", benefits: [["Exchange network", "Connections among people, institutions and companies across the ecosystem."], ["Access to activities", "Participation in events, meetings and discussion spaces."], ["Building the sector", "Contribute to an innovation, sustainability and public-private collaboration agenda."]],
    form: "Send us a message", first: "First name", last: "Last name", phone: "Phone", state: "Province / State", city: "City", reason: "Contact reason", chooseReason: "Select an option", contact: "Contact", associate: "I want to join", donate: "I want to donate", type: "Member type", individual: "Individual", company: "Company", institution: "Institution", message: "Tell us about your question, interest or message", send: "Send message", sending: "Sending…", sent: "Thank you! Your message was sent successfully.", error: "We could not send your message. Please try again." },
};

const initialForm = { nombre: "", apellido: "", email: "", telefono: "", provincia: "", localidad: "", motivo: "", tipo: "Individuo", mensaje: "" };

export default function Associate() {
  const { locale } = useI18n();
  const c = copy[locale];
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState("idle");
  const reasonLabels = { contact: c.contact, associate: c.associate, donate: c.donate };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
    setStatus("idle");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("sending");
    const reason = reasonLabels[form.motivo];
    const payload = {
      _subject: `Cell Ag Argentina — ${reason}`,
      _template: "table",
      Nombre: form.nombre,
      Apellido: form.apellido,
      Email: form.email,
      Telefono: form.telefono || "No informado",
      Provincia: form.provincia || "No informada",
      Localidad: form.localidad || "No informada",
      "Motivo de contacto": reason,
      Mensaje: form.mensaje,
    };
    if (form.motivo === "associate") payload["Tipo de asociado"] = form.tipo;

    try {
      const response = await fetch(FORM_ENDPOINT, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(payload) });
      if (!response.ok) throw new Error("Form submission failed");
      setForm(initialForm);
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <div className="grid gap-12 lg:grid-cols-2">
        <div>
          <p className="mb-3 font-semibold uppercase tracking-wide text-green-700">{c.kicker}</p>
          <h1 className="mb-6 text-4xl font-bold text-green-900">{c.title}</h1>
          <p className="mb-7 leading-relaxed text-gray-700">{c.intro}</p>
          <div className="grid gap-3">
            {c.paths.map(([title, text], index) => <article className="rounded-xl border border-green-100 bg-green-50 p-4" key={title}><div className="flex gap-3"><span className="grid h-8 w-8 flex-none place-items-center rounded-full bg-green-700 text-sm font-bold text-white">{index + 1}</span><div><h2 className="font-semibold text-green-900">{title}</h2><p className="mt-1 text-sm leading-relaxed text-gray-700">{text}</p></div></div></article>)}
          </div>
          <h2 className="mb-4 mt-9 text-xl font-bold text-green-900">{c.community}</h2>
          <div className="space-y-3">{c.benefits.map(([title, text]) => <div className="rounded-xl bg-white p-4 shadow-sm" key={title}><h3 className="font-semibold text-green-800">{title}</h3><p className="text-sm text-gray-700">{text}</p></div>)}</div>
        </div>

        <form onSubmit={handleSubmit} className="self-start rounded-2xl border bg-white p-6 shadow-sm">
          <h2 className="mb-6 text-2xl font-bold text-green-800">{c.form}</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <input name="nombre" placeholder={c.first} aria-label={c.first} value={form.nombre} onChange={handleChange} className="rounded-lg border px-4 py-3" required />
            <input name="apellido" placeholder={c.last} aria-label={c.last} value={form.apellido} onChange={handleChange} className="rounded-lg border px-4 py-3" required />
            <input name="email" type="email" placeholder="Email" aria-label="Email" value={form.email} onChange={handleChange} className="rounded-lg border px-4 py-3 md:col-span-2" required />
            <input name="telefono" placeholder={c.phone} aria-label={c.phone} value={form.telefono} onChange={handleChange} className="rounded-lg border px-4 py-3" />
            <input name="provincia" placeholder={c.state} aria-label={c.state} value={form.provincia} onChange={handleChange} className="rounded-lg border px-4 py-3" />
            <input name="localidad" placeholder={c.city} aria-label={c.city} value={form.localidad} onChange={handleChange} className="rounded-lg border px-4 py-3 md:col-span-2" />
          </div>
          <div className="mt-4">
            <label htmlFor="motivo" className="mb-2 block text-sm font-medium text-gray-700">{c.reason}</label>
            <select id="motivo" name="motivo" value={form.motivo} onChange={handleChange} className="w-full rounded-lg border px-4 py-3" required><option value="" disabled>{c.chooseReason}</option><option value="contact">{c.contact}</option><option value="associate">{c.associate}</option><option value="donate">{c.donate}</option></select>
          </div>
          {form.motivo === "associate" && <div className="mt-4">
            <label htmlFor="tipo" className="mb-2 block text-sm font-medium text-gray-700">{c.type}</label>
            <select id="tipo" name="tipo" value={form.tipo} onChange={handleChange} className="w-full rounded-lg border px-4 py-3" required><option value="Individuo">{c.individual}</option><option value="Empresa">{c.company}</option><option value="Institución">{c.institution}</option></select>
          </div>}
          <textarea name="mensaje" placeholder={c.message} aria-label={c.message} value={form.mensaje} onChange={handleChange} rows={5} className="mt-4 w-full rounded-lg border px-4 py-3" required />
          <button type="submit" disabled={status === "sending"} className="mt-6 w-full rounded-lg bg-green-700 py-3 text-white hover:bg-green-800 disabled:cursor-wait disabled:opacity-60">{status === "sending" ? c.sending : c.send}</button>
          {status === "sent" && <p className="mt-4 rounded-lg bg-green-50 p-3 text-sm font-medium text-green-800" role="status">{c.sent}</p>}
          {status === "error" && <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm font-medium text-red-700" role="alert">{c.error}</p>}
        </form>
      </div>
    </div>
  );
}
