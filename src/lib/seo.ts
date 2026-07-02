import { localize } from '../i18n/ui';
import type { Language } from '../types';
import { getActiveSocialLinks, isExternalSocialHref } from '../config/socialLinks';
import aboutContent from '../content/about.json';

export const SITE_URL = 'https://mishan.pp.ua';
export const DEFAULT_OG_IMAGE = '/images/uploads/7278349651030007392865904680576267151783556n.jpeg';

const OG_LOCALES: Record<Language, string> = {
  en: 'en_US',
  uk: 'uk_UA'
};

/** Falls back to the production domain when Astro.site is unset (e.g. misconfigured dev run). */
export function resolveSite(astroSite: URL | undefined): URL {
  return astroSite ?? new URL(SITE_URL);
}

export function absoluteUrl(site: URL, pathname: string): string {
  return new URL(pathname, site).toString();
}

const LANGUAGE_SEGMENT = /^\/(en|uk)(?=\/|$)/;

/** Swaps the /en or /uk segment of a pathname for another language, matching this site's routing. */
export function localizedPath(pathname: string, targetLang: Language): string {
  if (!LANGUAGE_SEGMENT.test(pathname)) return `/${targetLang}`;
  return pathname.replace(LANGUAGE_SEGMENT, `/${targetLang}`);
}

export function ogLocale(lang: Language): string {
  return OG_LOCALES[lang];
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface BreadcrumbListJsonLd {
  '@context': 'https://schema.org';
  '@type': 'BreadcrumbList';
  itemListElement: Array<{ '@type': 'ListItem'; position: number; name: string; item: string }>;
}

export function breadcrumbJsonLd(items: BreadcrumbItem[]): BreadcrumbListJsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };
}

export interface AnimalShelterJsonLdParams {
  name: string;
  description: string;
  url: string;
  streetAddress: string;
  addressLocality: string;
  addressCountry: string;
  sameAs: string[];
}

export interface AnimalShelterJsonLd {
  '@context': 'https://schema.org';
  '@type': 'AnimalShelter';
  name: string;
  description: string;
  url: string;
  address: {
    '@type': 'PostalAddress';
    streetAddress: string;
    addressLocality: string;
    addressCountry: string;
  };
  sameAs?: string[];
}

/** No Product/commercial-listing schema is used for adoptable pets: schema.org has no such type,
 * and using Product-style markup would misleadingly imply pets are for sale. */
export function animalShelterJsonLd(params: AnimalShelterJsonLdParams): AnimalShelterJsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'AnimalShelter',
    name: params.name,
    description: params.description,
    url: params.url,
    address: {
      '@type': 'PostalAddress',
      streetAddress: params.streetAddress,
      addressLocality: params.addressLocality,
      addressCountry: params.addressCountry
    },
    ...(params.sameAs.length > 0 ? { sameAs: params.sameAs } : {})
  };
}

/** Builds the shelter's structured data from the existing about-page content, shared by the
 * home and about pages so both stay in sync with a single source of truth. */
export function getAnimalShelterStructuredData(lang: Language, site: URL): AnimalShelterJsonLd {
  const sameAs = getActiveSocialLinks()
    .map((link) => link.href)
    .filter(isExternalSocialHref);

  return animalShelterJsonLd({
    name: localize(aboutContent.address.organization, lang),
    description: localize(aboutContent.body, lang),
    url: absoluteUrl(site, `/${lang}`),
    streetAddress: localize(aboutContent.address.street, lang),
    addressLocality: 'Kherson',
    addressCountry: 'UA',
    sameAs
  });
}
