const COUNTRY_ALIASES = {
  argentina: "AR", arg: "AR", ar: "AR",
  brasil: "BR", brazil: "BR", bra: "BR", br: "BR",
  chile: "CL", chl: "CL", cl: "CL",
  israel: "IL", isr: "IL", il: "IL",
  "reino unido": "GB", "united kingdom": "GB", uk: "GB", gb: "GB",
  "paises bajos": "NL", netherlands: "NL", holanda: "NL", nl: "NL",
  "estados unidos": "US", "united states": "US", usa: "US", us: "US",
  japon: "JP", japan: "JP", jpn: "JP", jp: "JP",
  belgica: "BE", belgium: "BE", bel: "BE", be: "BE",
};

function normalizeCountry(country = "") {
  const key = country.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  return COUNTRY_ALIASES[key] || key.toUpperCase();
}

export default function CountryFlag({ country, className = "" }) {
  const code = normalizeCountry(country);
  const props = { viewBox: "0 0 36 24", role: "img", "aria-label": country, className };

  if (code === "AR") return <svg {...props}><rect width="36" height="24" fill="#74acdf"/><rect y="8" width="36" height="8" fill="#fff"/><circle cx="18" cy="12" r="2.2" fill="#f6b40e"/></svg>;
  if (code === "BR") return <svg {...props}><rect width="36" height="24" fill="#009c3b"/><path d="M18 3 32 12 18 21 4 12Z" fill="#ffdf00"/><circle cx="18" cy="12" r="5" fill="#002776"/></svg>;
  if (code === "CL") return <svg {...props}><rect width="36" height="24" fill="#d52b1e"/><rect width="36" height="12" fill="#fff"/><rect width="12" height="12" fill="#0039a6"/><circle cx="6" cy="6" r="2" fill="#fff"/></svg>;
  if (code === "GB") return <svg {...props}><rect width="36" height="24" fill="#012169"/><path d="M0 0 36 24M36 0 0 24" stroke="#fff" strokeWidth="5"/><path d="M0 0 36 24M36 0 0 24" stroke="#c8102e" strokeWidth="2"/><path d="M18 0v24M0 12h36" stroke="#fff" strokeWidth="7"/><path d="M18 0v24M0 12h36" stroke="#c8102e" strokeWidth="4"/></svg>;
  if (code === "NL") return <svg {...props}><rect width="36" height="8" fill="#ae1c28"/><rect y="8" width="36" height="8" fill="#fff"/><rect y="16" width="36" height="8" fill="#21468b"/></svg>;
  if (code === "IL") return <svg {...props}><rect width="36" height="24" fill="#fff"/><rect y="3" width="36" height="2.5" fill="#0038b8"/><rect y="18.5" width="36" height="2.5" fill="#0038b8"/><path d="m18 7 4 7h-8Zm0 10-4-7h8Z" fill="none" stroke="#0038b8" strokeWidth="1.2"/></svg>;
  if (code === "US") return <svg {...props}><rect width="36" height="24" fill="#fff"/>{[0,4,8,12,16,20].map((y)=><rect key={y} y={y} width="36" height="2" fill="#b22234"/>)}<rect width="15" height="12" fill="#3c3b6e"/><g fill="#fff">{[3,7,11].flatMap((x)=>[3,6,9].map((y)=><circle key={`${x}-${y}`} cx={x} cy={y} r=".7"/>))}</g></svg>;
  if (code === "JP") return <svg {...props}><rect width="36" height="24" fill="#fff"/><circle cx="18" cy="12" r="6" fill="#bc002d"/></svg>;
  if (code === "BE") return <svg {...props}><rect width="12" height="24" fill="#111"/><rect x="12" width="12" height="24" fill="#fdda24"/><rect x="24" width="12" height="24" fill="#ef3340"/></svg>;

  return <span className={`capa-flag-fallback ${className}`} role="img" aria-label={country || "País no informado"}>🌎</span>;
}
