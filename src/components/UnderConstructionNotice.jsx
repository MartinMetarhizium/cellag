import { useI18n } from "../i18n/I18nContext";

const copy = {
  es: {
    title: "UNDER CONSTRUCTION",
    lead: "Estamos trabajando para mejorar tu experiencia.",
    body: "Esta sección se encuentra temporalmente en construcción. Disculpá las molestias y volvé a visitarnos pronto.",
  },
  en: {
    title: "UNDER CONSTRUCTION",
    lead: "We are working to improve your experience.",
    body: "This section is temporarily under construction. We apologize for the inconvenience and invite you to visit us again soon.",
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
        <p className="under-construction-lead">{content.lead}</p>
        <p className="under-construction-body">{content.body}</p>
      </div>
    </aside>
  );
}
