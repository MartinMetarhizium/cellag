const organizationLogos = {
  "capa 2026": "/minimal_logo.png",
  "panel regional": "/minimal_logo.png",
  "cell ag argentina": "/capa-assets/cell ag argentina logo.png",
  "cell ag brazil": "/capa-assets/cellag brazil logo.png",
  "cell ag america": "/capa-assets/cellular agriculture america logo.png",
  "gfi brasil": "/capa-assets/god food institute.png",
  "amande": "/capa-assets/Amande.png",
  "apia": "/capa-assets/logo APIA.jpeg",
  "ajinomoto": "/capa-assets/Ajinomoto-Logo.jpg",
  "aleph farms": "/capa-assets/aleph farms logo.png",
  "angel yeast": "/capa-assets/angel yeast logo 1.png",
  "abp": "/capa-assets/APB logo.png",
  "asociacion de productores a base de plantas": "/capa-assets/Asocicacion de productores a base de plantas LOGO.png",
  "bezos centre for sustainable protein": "/capa-assets/BezosEarthFund_LogoGraphic.png",
  "bezos earth fund": "/capa-assets/bezos earth fund.png",
  "biba": "/capa-assets/Biba logo.png",
  "bioquest.bio": "/capa-assets/Bioquest_logo_.svg",
  "bryant research": "/capa-assets/Bryant Research logo-04.png",
  "ciati": "/capa-assets/CIATI.jpg",
  "chunk foods": "/capa-assets/Chunk Foods_Logo_Tagline.png",
  "cluster de proteinas vegetales": "/capa-assets/cluster-proteinas-vegetales-logo.png",
  "elementa foods": "/capa-assets/elementa logo.png",
  "ergo foods": "/capa-assets/ergo logo.webp",
  "biomit lab": "/capa-assets/Logo BIOMIT Lab (2).png",
  "inti": "/capa-assets/logo inti.png",
  "amazonika mundi": "/capa-assets/LOGO-AMAZONIKA-MUNDI-BRAZIL.png",
  "future cow": "/capa-assets/LOGO-FUTURE-COW-PNG.png",
  "farmesa": "/capa-assets/logo-farmesa.png",
  "onelab": "/capa-assets/onelab logo.png",
  "luyef biotechnologies": "/capa-assets/luyef-logo-sin-fondo.png",
  "michroma": "/capa-assets/michroma LOGO.png",
  "mosa meat": "/capa-assets/mosa meat.png",
  "merck": "/capa-assets/MERCK LOGO.svg",
  "iff": "/capa-assets/iff logo.jpg",
  "notco": "/capa-assets/notco-logo.png",
  "nutritionfacts.org": "/capa-assets/nutritionfacts.jpg",
  "proveg international": "/capa-assets/ProVeg_Logo.png",
  "sartorius": "/capa-assets/Sartorius.png",
  "senara gmbh": "/capa-assets/senara.png",
  "subsecretaria de ciencia y tecnologia — programa nacional de prospectiva tecnologica": "/capa-assets/subsecretaria de ciencia y tecnologia logo.jpg",
  "typcal": "/capa-assets/typcal logo.png",
  "tomorrow foods": "/capa-assets/Tomorrow foods logo.png",
  "universidad argentina de la empresa": "/capa-assets/UADE.png",
  "uade": "/capa-assets/UADE.png",
  "universidad nacional de hurlingham": "/capa-assets/UNAHUR-04-400x250.png",
  "universidad nacional de san martin": "/capa-assets/UNSAM Logo.webp",
  "unsam": "/capa-assets/UNSAM Logo.webp",
  "universidad nacional de la plata": "/capa-assets/Logo_UNLP.jpg",
  "unlp · ciprove": "/capa-assets/Logo_UNLP.jpg",
  "porta hermanos": "/capa-assets/Porta hermanos.png",
};

function normalizeOrganization(value = "") {
  return value.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export function getOrganizationLogo(company, explicitLogo) {
  return explicitLogo || organizationLogos[normalizeOrganization(company)] || null;
}

export default organizationLogos;
