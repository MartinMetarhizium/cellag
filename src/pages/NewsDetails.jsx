import { Link, useParams } from "react-router-dom";
import news from "../data/news.json";

export default function NewsDetail() {
  const { id } = useParams();
  const post = news.find((item) => item.id === id);

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold text-green-900 mb-4">News not found</h1>
        <Link to="/news" className="text-green-700 hover:underline">
          Volver a las noticias
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <Link to="/news" className="text-green-700 hover:underline mb-6 inline-block">
        ← Volver a las noticias
      </Link>

      <img
        src={post.image}
        alt={post.title}
        className="w-full h-auto max-h-[450px] object-cover rounded-2xl mb-8"
      />

      <p className="text-sm text-green-700 font-semibold mb-2">{post.date}</p>
      <h1 className="text-4xl font-bold text-green-900 mb-8">{post.title}</h1>

      <div className="space-y-5 text-gray-700 leading-relaxed">
        {post.content?.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </div>
  );
}