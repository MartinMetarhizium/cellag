import { Link, useParams } from "react-router-dom";
import news from "../data/news.json";
import { useI18n } from "../i18n/I18nContext";

const articleEn = { title: "CAPA 2026: Argentina prepares for the event shaping the future of alternative proteins", content: ["Argentina is taking a key step in developing the new food industry. The first Argentine Alternative Protein Congress will take place October 21–23 at the Buenos Aires Convention Center as part of Crossing Over LatAm.", "Organized with The UNSAM Alt. Protein Project, the congress responds to the growing need for an ecosystem connecting science, industry, investment and public policy around alternative proteins.", "Over three days, CAPA will bring together national and international leaders to accelerate the sector and position Argentina within the new food economy.", "Alongside panels and talks, the congress will feature networking, company exhibitions and food experiences connecting key ecosystem participants.", "As sustainability, food security and technological innovation become increasingly important, CAPA 2026 offers a strategic platform for concrete solutions and a stronger Argentine role internationally.", "Cell Ag Argentina continues building an agenda that connects capabilities, creates opportunities and accelerates this emerging sector nationwide."] };

export default function NewsDetail() {
  const { locale } = useI18n();
  const c = locale === "en" ? { missing: "News not found", back: "Back to news" } : { missing: "Noticia no encontrada", back: "Volver a las noticias" };
  const { id } = useParams();
  const post = news.find((item) => item.id === id);

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold text-green-900 mb-4">{c.missing}</h1>
        <Link to="/news" className="text-green-700 hover:underline">
          {c.back}
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <Link to="/news" className="text-green-700 hover:underline mb-6 inline-block">
        ← {c.back}
      </Link>

      <img
        src={post.image}
        alt={post.title}
        className="w-full h-auto max-h-[450px] object-cover rounded-2xl mb-8"
      />

      <p className="text-sm text-green-700 font-semibold mb-2">{post.date}</p>
      <h1 className="text-4xl font-bold text-green-900 mb-8">{locale === "en" ? articleEn.title : post.title}</h1>

      <div className="space-y-5 text-gray-700 leading-relaxed">
        {(locale === "en" ? articleEn.content : post.content)?.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </div>
  );
}
