// src/components/News.jsx
import { useMemo, useState } from "react";
import news from "../data/news.json";

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleDateString("pt-BR", { day: "2-digit", month: "short" });
  } catch {
    return "";
  }
}

export default function News() {
  const [page, setPage] = useState(1);
  const pageSize = 6;

  const items = useMemo(() => {
    const sorted = [...news].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    return sorted.slice(0, page * pageSize);
  }, [page]);

  const hasMore = news.length > items.length;

  return (
    <section id="news" className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-green-800 mb-8 text-center">
          Últimas notícias
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((post) => (
            <article
              key={post.id}
              className="rounded-xl overflow-hidden shadow hover:shadow-lg transition bg-white"
            >
              <a href={post.link || "#"} target={post.link ? "_blank" : "_self"} rel="noreferrer">
                <img
                  src={post.image}
                  alt={post.title}
                  className="h-48 w-full object-cover"
                  loading="lazy"
                />
              </a>
              <div className="p-5">
                <div className="text-sm text-green-700 font-semibold mb-2">
                  {formatDate(post.date)}
                </div>
                <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
                <p
                  className="text-sm text-gray-600"
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden"
                  }}
                >
                  {post.excerpt}
                </p>
              </div>
            </article>
          ))}
        </div>

        {hasMore && (
          <div className="text-center mt-8">
            <button
              onClick={() => setPage((p) => p + 1)}
              className="bg-green-700 text-white px-6 py-2 rounded hover:bg-green-800"
            >
              Carregar mais
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
