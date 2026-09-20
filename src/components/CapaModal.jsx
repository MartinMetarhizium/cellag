import { useEffect, useMemo, useState } from "react";
import { useI18n } from "../i18n/I18nContext";
import CapaSchedule from "./CapaSchedule";

const EVENT_DATE = new Date("2026-10-21T09:00:00-03:00");
function getTimeLeft() { const distance=Math.max(0,EVENT_DATE.getTime()-Date.now()); return {days:Math.floor(distance/86400000),hours:Math.floor((distance/3600000)%24),minutes:Math.floor((distance/60000)%60),seconds:Math.floor((distance/1000)%60)}; }

export function CapaContent({ isPage=false }) {
  const { t }=useI18n(); const [timeLeft,setTimeLeft]=useState(getTimeLeft);
  useEffect(()=>{const timer=window.setInterval(()=>setTimeLeft(getTimeLeft()),1000); return()=>window.clearInterval(timer);},[]);
  const countdown=useMemo(()=>[[timeLeft.days,t("capa.days")],[timeLeft.hours,t("capa.hours")],[timeLeft.minutes,t("capa.minutes")],[timeLeft.seconds,t("capa.seconds")]], [timeLeft,t]);
  return <section className={isPage?"capa-page":"capa-modal"} aria-labelledby="capa-title">
    <div className="capa-hero capa-hero-image"><img src="/capa-assets/capa home.png" alt="CAPA 2026 en Crossing Over Latam BioExpo, 21, 22 y 23 de octubre en Buenos Aires" /><div className="capa-countdown" aria-label={t("capa.countdownLabel")}>{countdown.map(([value,label])=><div key={label}><strong>{String(value).padStart(2,"0")}</strong><span>{label}</span></div>)}</div><h2 id="capa-title" className="sr-only">CAPA 2026</h2></div>
    <div className="capa-description"><p className="capa-description-kicker">{t("capa.firstCongress")}</p><h3>{t("capa.descriptionTitle")}</h3><p>{t("capa.description")}</p><div className="capa-ticket-row"><a href="https://crossingoverlatam.bio/" target="_blank" rel="noreferrer">{t("capa.tickets")} <span aria-hidden="true">↗</span></a><div className="capa-discount" aria-label={t("capa.discountLabel")}><span>{t("capa.discount")}</span><strong>CAPAXO</strong></div></div></div>
    <CapaSchedule />
  </section>;
}

export default function CapaModal(){const[open,setOpen]=useState(false);useEffect(()=>{if(!open)return undefined;const close=(event)=>event.key==="Escape"&&setOpen(false);document.body.style.overflow="hidden";window.addEventListener("keydown",close);return()=>{document.body.style.overflow="";window.removeEventListener("keydown",close);};},[open]);return <><button className="capa-launcher" onClick={()=>setOpen(true)}><span className="capa-launcher-kicker">21 OCT 2026</span><span>CAPA</span><small>Conocé el congreso →</small></button>{open&&<div className="capa-backdrop" role="presentation" onMouseDown={()=>setOpen(false)}><div onMouseDown={(event)=>event.stopPropagation()}><button className="capa-close" onClick={()=>setOpen(false)} aria-label="Cerrar CAPA">×</button><CapaContent/></div></div>}</>;}
