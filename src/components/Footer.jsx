export default function Footer() {
  return (
    <footer className="bg-green-800 text-white text-center py-8 mt-12">
      <p className="font-semibold">Cell Ag Argentina</p>
      <p className="text-sm mt-2">
        Organización sin fines de lucro que impulsa la agricultura celular y las proteínas alternativas.
      </p>
      <div className="flex justify-center gap-4 mt-4 text-sm">
        <a href="https://www.instagram.com/cellagargentina/" target="_blank" rel="noreferrer" className="hover:underline">
          Instagram
        </a>
        {/* <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" className="hover:underline">
          LinkedIn
        </a> */}
        <a href="mailto:fedehorn@cellagargentina.com" className="hover:underline">
          Contacto
        </a>
      </div>
    </footer>
  );
}