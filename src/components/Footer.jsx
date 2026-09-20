import { useI18n } from "../i18n/I18nContext";

export default function Footer() {
  const { t } = useI18n();
  return (
    <footer className="bg-green-800 text-white text-center py-8 mt-12">
      <p className="font-semibold">Cell Ag Argentina</p>
      <p className="text-sm mt-2">
        {t("footerDescription")}
      </p>
      <div className="flex justify-center gap-4 mt-4 text-sm">
        <a href="https://www.linkedin.com/company/cell-ag-argentina/?utm_source=chatgpt.com" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="Cell Ag Argentina en LinkedIn">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5.3 7.3H1.7V22h3.6V7.3ZM3.5 2A2.1 2.1 0 1 0 3.5 6.2 2.1 2.1 0 0 0 3.5 2ZM22 13.6c0-4.4-2.4-6.5-5.5-6.5a4.8 4.8 0 0 0-4.3 2.4V7.3H8.6V22h3.6v-7.3c0-1.9.4-3.8 2.8-3.8 2.3 0 2.4 2.2 2.4 3.9V22H22v-8.4Z"/></svg>
        </a>
        <a href="https://www.instagram.com/cellagargentina/?utm_source=chatgpt.com" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="Cell Ag Argentina en Instagram">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M7.3 2h9.4A5.3 5.3 0 0 1 22 7.3v9.4a5.3 5.3 0 0 1-5.3 5.3H7.3A5.3 5.3 0 0 1 2 16.7V7.3A5.3 5.3 0 0 1 7.3 2Zm-.2 2A3.1 3.1 0 0 0 4 7.1v9.8A3.1 3.1 0 0 0 7.1 20h9.8a3.1 3.1 0 0 0 3.1-3.1V7.1A3.1 3.1 0 0 0 16.9 4H7.1Zm10.1 1.5a1.3 1.3 0 1 1 0 2.6 1.3 1.3 0 0 1 0-2.6ZM12 7.2a4.8 4.8 0 1 1 0 9.6 4.8 4.8 0 0 1 0-9.6Zm0 2a2.8 2.8 0 1 0 0 5.6 2.8 2.8 0 0 0 0-5.6Z"/></svg>
        </a>
        <a href="mailto:fedehorn@cellagargentina.com" className="hover:underline">
          {t("contact")}
        </a>
      </div>
    </footer>
  );
}
