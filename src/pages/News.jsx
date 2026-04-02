import { useMemo, useState } from "react";
import news from "../data/news.json";

export default function Noticias() {
  const [query, setQuery] = useState("");

  const items = useMemo(() => {
    return [...news]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .filter((n) =>
        `${n.title} ${n.excerpt}`.toLowerCase().includes(query.toLowerCase())
      );
  }, [query]);

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold text-green-900 mb-4">Noticias</h1>
      <p className="text-gray-700 max-w-3xl mb-8">
        Seguimiento de novedades, publicaciones y actividades de Cell Ag Argentina.
      </p>

      <input
        type="text"
        placeholder="Buscar noticias..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full md:w-96 border rounded-lg px-4 py-3 mb-10"
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((post) => (
          <article key={post.id} className="rounded-2xl overflow-hidden border bg-white shadow-sm">
            <img src={post.image} alt={post.title} className="h-48 w-full object-cover" />
            <div className="p-5">
              <p className="text-sm text-green-700 font-semibold mb-2">{post.date}</p>
              <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
              <p className="text-gray-600 mb-4">{post.excerpt}</p>
              <a href={post.link} className="text-green-700 font-semibold hover:underline">
                Leer más
              </a>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}