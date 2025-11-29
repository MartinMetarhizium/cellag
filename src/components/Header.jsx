export default function Header() {
  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
        <h1 className="text-2xl font-bold text-green-700">CellAg Brazil</h1>
        <nav className="space-x-4 text-gray-600">
          <a href="#mission" className="hover:text-green-700">Missão</a>
          <a href="#events" className="hover:text-green-700">Eventos</a>
          <a href="#news" className="hover:text-green-700">Notícias</a>
          <a href="#about" className="hover:text-green-700">Sobre</a>
        </nav>
      </div>
    </header>
  );
}