import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import news from "../data/news.json";
import { useI18n } from "../i18n/I18nContext";

const newsEn = { "capa-2026-news": { title: "CAPA 2026: Argentina prepares for the event shaping the future of alternative proteins", excerpt: "Argentina is taking a key step in developing the new food industry. The first Argentine Alternative Protein Congress will be held October 21–23 at the Buenos Aires Convention Center as part of Crossing Over LatAm." } };

export default function News() {
  const { locale } = useI18n();
  const c = locale === "en" ? { title: "News", intro: "Follow Cell Ag Argentina updates, publications and news.", search: "Search news...", read: "Read more" } : { title: "Noticias", intro: "Seguí las actualizaciones, publicaciones y noticias de Cell Ag Argentina.", search: "Buscar noticias...", read: "Leer más" };
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
      <h1 className="text-4xl font-bold text-green-900 mb-4">{c.title}</h1><p className="text-gray-700 max-w-3xl mb-8">{c.intro}</p>

      <input
        type="text"
        placeholder={c.search}
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
              <h3 className="text-xl font-semibold mb-2">{locale === "en" ? newsEn[post.id]?.title || post.title : post.title}</h3>
              <p className="text-gray-600 mb-4">{locale === "en" ? newsEn[post.id]?.excerpt || post.excerpt : post.excerpt}</p>
              <Link
                to={`/news/${post.id}`}
                className="text-green-700 font-semibold hover:underline"
              >
                {c.read}
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
