import { NavLink } from "react-router-dom";
import { useI18n } from "../i18n/I18nContext";

const linkBase = "transition hover:text-green-700";
const activeClass = "text-green-700 font-semibold";

export default function Header() {
  const { locale, t, toggleLocale } = useI18n();
  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 p-4">
        <NavLink to="/home" className="flex items-center gap-3">
          <img
            src="/cell.png"
            alt="Cell Ag Argentina"
            className="h-12 w-12 object-contain"
          />
          <div>
            <p className="text-xl font-bold text-green-700">Cell Ag Argentina</p>
            <p className="text-sm text-gray-500">
              {t("headerTagline")}
            </p>
          </div>
        </NavLink>

        <nav className="flex flex-wrap justify-center gap-4 text-gray-700">
          <NavLink
            to="/capa"
            className={({ isActive }) => `${linkBase} ${isActive ? activeClass : ""}`}
          >
            {t("nav.capa")}
          </NavLink>
          <NavLink
            to="/hackathon"
            className={({ isActive }) => `${linkBase} ${isActive ? activeClass : ""}`}
          >
            {t("nav.hackathon")}
          </NavLink>
          <NavLink
            to="/team"
            className={({ isActive }) => `${linkBase} ${isActive ? activeClass : ""}`}
          >
            {t("nav.team")}
          </NavLink>
          <NavLink
            to="/mission"
            className={({ isActive }) => `${linkBase} ${isActive ? activeClass : ""}`}
          >
            {t("nav.mission")}
          </NavLink>
          <NavLink
            to="/events"
            className={({ isActive }) => `${linkBase} ${isActive ? activeClass : ""}`}
          >
            {t("nav.events")}
          </NavLink>
          <NavLink
            to="/news"
            className={({ isActive }) => `${linkBase} ${isActive ? activeClass : ""}`}
          >
            {t("nav.news")}
          </NavLink>
          <NavLink
            to="/associate"
            className={({ isActive }) => `${linkBase} ${isActive ? activeClass : ""}`}
          >
            {t("nav.join")}
          </NavLink>
          <button className="language-switch" onClick={toggleLocale} aria-label={t("languageLabel")}>
            <span>{locale === "es" ? "EN" : "ES"}</span>
            <small>{locale === "es" ? "English" : "Español"}</small>
          </button>
        </nav>
      </div>
    </header>
  );
}
