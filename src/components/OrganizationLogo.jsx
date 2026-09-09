import { useState } from "react";
import { getOrganizationLogo } from "../data/organizationLogos";

export default function OrganizationLogo({ company, logo }) {
  const [failed, setFailed] = useState(false);
  const source = getOrganizationLogo(company, logo);

  if (!source || failed) return null;

  return <span className="talk-company-logo" title={company}>
    <img src={source} alt={`Logo de ${company}`} onError={() => setFailed(true)} />
  </span>;
}
