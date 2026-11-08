import { Language } from '../types';
import { translations } from '../i18n/translations';

export const updateDocumentSEO = (lang: Language) => {
  const dict = translations[lang].seo;
  const coverImage = '/src/assets/images/omnistock_cover_showcase_1794120091394.jpg';

  // Update HTML document title
  document.title = dict.title;

  // Update HTML lang attribute
  document.documentElement.lang = lang;

  // Helper to safely set meta tag
  const setMeta = (selector: string, attr: string, value: string) => {
    let el = document.querySelector(selector);
    if (!el) {
      el = document.createElement('meta');
      const [key, val] = selector.replace(/[\[\]]/g, '').split('=');
      el.setAttribute(key, val.replace(/["']/g, ''));
      document.head.appendChild(el);
    }
    el.setAttribute(attr, value);
  };

  // Standard SEO
  setMeta('meta[name="description"]', 'content', dict.description);
  setMeta('meta[name="keywords"]', 'content', dict.keywords);

  // OpenGraph (Facebook, LinkedIn, etc.)
  setMeta('meta[property="og:title"]', 'content', dict.title);
  setMeta('meta[property="og:description"]', 'content', dict.description);
  setMeta('meta[property="og:image"]', 'content', coverImage);
  setMeta('meta[property="og:site_name"]', 'content', 'OmniStock Pro');

  const localeMap: Record<Language, string> = {
    en: 'en_US',
    nl: 'nl_NL',
    de: 'de_DE',
    fr: 'fr_FR',
  };
  setMeta('meta[property="og:locale"]', 'content', localeMap[lang] || 'en_US');

  // Twitter / X
  setMeta('meta[name="twitter:title"]', 'content', dict.title);
  setMeta('meta[name="twitter:description"]', 'content', dict.description);
  setMeta('meta[name="twitter:image"]', 'content', coverImage);
};
