import { NavLink } from "react-router-dom";

const linkBase = "transition hover:text-green-700";
const activeClass = "text-green-700 font-semibold";

export default function Header() {
  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 p-4">
        <NavLink to="/" className="flex items-center gap-3">
          <img
            src="/cell.png"
            alt="Cell Ag Argentina"
            className="h-12 w-12 object-contain"
          />
          <div>
            <p className="text-xl font-bold text-green-700">Cell Ag Argentina</p>
            <p className="text-sm text-gray-500">
              Agricultura celular y proteínas alternativas
            </p>
          </div>
        </NavLink>

        <nav className="flex flex-wrap justify-center gap-4 text-gray-700">
          <NavLink
            to="/team"
            className={({ isActive }) => `${linkBase} ${isActive ? activeClass : ""}`}
          >
            Equipo
          </NavLink>
          <NavLink
            to="/events"
            className={({ isActive }) => `${linkBase} ${isActive ? activeClass : ""}`}
          >
            Eventos
          </NavLink>
          <NavLink
            to="/news"
            className={({ isActive }) => `${linkBase} ${isActive ? activeClass : ""}`}
          >
            Noticias
          </NavLink>
          <NavLink
            to="/associate"
            className={({ isActive }) => `${linkBase} ${isActive ? activeClass : ""}`}
          >
            Asociate
          </NavLink>
        </nav>
      </div>
    </header>
  );
}