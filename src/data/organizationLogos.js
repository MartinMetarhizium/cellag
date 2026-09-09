const organizationLogos = {
  "capa 2026": "/minimal_logo.png",
  "panel regional": "/minimal_logo.png",
  "cell ag argentina": "/minimal_logo.png",
  "gfi brasil": "/sponsors/sponsor1.png",
  "amande": "/capa-assets/Amande.png",
  "abp / vng": "/capa-assets/Asocicacion de productores a base de plantas LOGO.png",
  "asociacion de productores a base de plantas": "/capa-assets/Asocicacion de productores a base de plantas LOGO.png",
  "bezos centre for sustainable protein": "/capa-assets/BezosEarthFund_LogoGraphic.png",
  "biba": "/capa-assets/biba logo.jpeg",
  "bioquest.bio": "/capa-assets/Bioquest_logo_.svg",
  "bryant research": "/capa-assets/Bryant Research logo-04.png",
  "ciati": "/capa-assets/CIATI.jpg",
  "elementa foods": "/capa-assets/elementa logo.jpg",
  "biomit lab": "/capa-assets/Logo BIOMIT Lab.png",
  "inti": "/capa-assets/logoINTI.png",
  "amazonika mundi": "/capa-assets/LOGO-AMAZONIKA-MUNDI-BRAZIL.png",
  "future cow": "/capa-assets/LOGO-FUTURE-COW-PNG.png",
  "onelab": "/capa-assets/Logo-OneLab-2025-4.png",
  "luyef biotechnologies": "/capa-assets/luyef-logo-sin-fondo.png",
  "michroma": "/capa-assets/michroma LOGO.png",
  "mosa meat": "/capa-assets/mosa meat.png",
  "notco": "/capa-assets/notco-logo.png",
  "nutritionfacts.org": "/capa-assets/nutritionfacts.jpg",
  "proveg international": "/capa-assets/ProVeg_Logo.png",
  "sartorius": "/capa-assets/Sartorius.png",
  "typcal": "/capa-assets/typcal-logo.png",
  "universidad argentina de la empresa": "/capa-assets/UADE.png",
  "universidad nacional de hurlingham": "/capa-assets/unahur logo.jpeg",
  "universidad nacional de san martin": "/capa-assets/UNSAM.jpg",
  "universidad nacional de la plata": "/capa-assets/Logo_UNLP.jpg",
  "porta hermanos": "/capa-assets/Porta Hermanos.jpeg",
};

function normalizeOrganization(value = "") {
  return value.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

export function getOrganizationLogo(company, explicitLogo) {
  return explicitLogo || organizationLogos[normalizeOrganization(company)] || null;
}

export default organizationLogos;
