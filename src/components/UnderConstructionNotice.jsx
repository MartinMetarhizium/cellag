import { useI18n } from "../i18n/I18nContext";

const copy = {
  es: {
    title: "UNDER CONSTRUCTION",
    body: "Disculpá las molestias. Estamos trabajando para mejorar tu experiencia.",
  },
  en: {
    title: "UNDER CONSTRUCTION",
    body: "We apologize for the inconvenience. We are working to improve your experience.",
  },
};

export default function UnderConstructionNotice() {
  const { locale } = useI18n();
  const content = copy[locale] || copy.es;

  return (
    <aside className="under-construction-notice" role="status" aria-label={content.title}>
      <div className="under-construction-icon" aria-hidden="true">◆</div>
      <div>
        <p className="under-construction-title">{content.title}</p>
        <p className="under-construction-body">{content.body}</p>
      </div>
    </aside>
  );
}
