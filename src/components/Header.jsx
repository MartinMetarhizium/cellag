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
            <span><LanguageFlag locale={locale} /></span>
            <small>{locale === "es" ? "Español" : "English"}</small>
          </button>
        </nav>
      </div>
    </header>
  );
}
