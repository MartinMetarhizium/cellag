import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useI18n } from "../i18n/I18nContext";

const linkBase = "transition hover:text-green-700";
const activeClass = "text-green-700 font-semibold";

function LanguageFlag({ locale }) {
  if (locale === "es") {
    return <svg viewBox="0 0 36 24" aria-hidden="true"><rect width="36" height="24" fill="#74acdf"/><rect y="8" width="36" height="8" fill="#fff"/><circle cx="18" cy="12" r="2.2" fill="#f6b40e"/></svg>;
  }
  return <svg viewBox="0 0 36 24" aria-hidden="true"><rect width="36" height="24" fill="#fff"/>{[0,4,8,12,16,20].map((y)=><rect key={y} y={y} width="36" height="2" fill="#b22234"/>)}<rect width="15" height="12" fill="#3c3b6e"/><g fill="#fff">{[3,7,11].flatMap((x)=>[3,6,9].map((y)=><circle key={`${x}-${y}`} cx={x} cy={y} r=".7"/>))}</g></svg>;
}

export default function Header() {
  const { locale, t, toggleLocale } = useI18n();
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2 md:gap-4 p-2.5 md:p-4">
        <div className="flex w-full items-center justify-between md:w-auto">
          <NavLink to="/home" className="flex min-w-0 items-center gap-2 md:gap-3" onClick={() => setMobileOpen(false)}>
            <img src="/cell.png" alt="Cell Ag Argentina" className="h-9 w-9 shrink-0 object-contain md:h-12 md:w-12" />
            <div className="min-w-0">
              <p className="text-base font-bold leading-tight text-green-700 md:text-xl">Cell Ag Argentina</p>
              <p className="max-w-[220px] truncate text-[11px] leading-tight text-gray-500 md:max-w-none md:text-sm">{t("headerTagline")}</p>
            </div>
          </NavLink>
          <button type="button" className="grid h-10 w-10 place-items-center rounded-lg border border-green-200 text-xl text-green-800 md:hidden" onClick={() => setMobileOpen((open) => !open)} aria-expanded={mobileOpen} aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}>
            {mobileOpen ? "×" : "☰"}
          </button>
        </div>

        <nav className={`${mobileOpen ? "flex" : "hidden"} w-full flex-wrap items-center justify-center gap-1.5 border-t border-gray-100 pt-2 text-sm text-gray-700 md:flex md:w-auto md:gap-4 md:border-0 md:pt-0 md:text-base`}>
          <NavLink
            to="/capa"
            onClick={() => setMobileOpen(false)}
            className={({ isActive }) => `${linkBase} rounded-md px-2 py-2 md:p-0 ${isActive ? activeClass : ""}`}
          >
            {t("nav.capa")}
          </NavLink>
          <NavLink
            to="/mission"
            onClick={() => setMobileOpen(false)}
            className={({ isActive }) => `${linkBase} rounded-md px-2 py-2 md:p-0 ${isActive ? activeClass : ""}`}
          >
            {t("nav.mission")}
          </NavLink>
          <NavLink
            to="/news"
            onClick={() => setMobileOpen(false)}
            className={({ isActive }) => `${linkBase} rounded-md px-2 py-2 md:p-0 ${isActive ? activeClass : ""}`}
          >
            {t("nav.news")}
          </NavLink>
          <NavLink
            to="/associate"
            onClick={() => setMobileOpen(false)}
            className={({ isActive }) => `${linkBase} rounded-md px-2 py-2 md:p-0 ${isActive ? activeClass : ""}`}
          >
            {t("nav.join")}
          </NavLink>
          <button className="language-switch" onClick={toggleLocale} aria-label={t("languageLabel")}>
            <span><LanguageFlag locale={locale} /></span>
            <small>{locale === "es" ? "Español" : "English"}</small>
          </button>
        </nav>
      </div>
    </header>
  );
}
