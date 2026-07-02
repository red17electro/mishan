import { describe, expect, it } from 'vitest';
import {
  absoluteUrl,
  animalShelterJsonLd,
  breadcrumbJsonLd,
  getAnimalShelterStructuredData,
  localizedPath,
  ogLocale,
  resolveSite,
  SITE_URL
} from './seo';

describe('resolveSite', () => {
  it('falls back to the production site URL when Astro.site is not set', () => {
    expect(resolveSite(undefined).toString()).toBe(`${SITE_URL}/`);
  });

  it('returns the provided site unchanged', () => {
    const site = new URL('https://example.com');
    expect(resolveSite(site)).toBe(site);
  });
});

describe('absoluteUrl', () => {
  it('resolves a root-relative path against the site origin', () => {
    const site = new URL(SITE_URL);
    expect(absoluteUrl(site, '/en/pets')).toBe('https://mishan.pp.ua/en/pets');
  });
});

describe('localizedPath', () => {
  it('swaps the language segment for a nested page', () => {
    expect(localizedPath('/en/pets/gosha', 'uk')).toBe('/uk/pets/gosha');
  });

  it('swaps the language segment for a bare language root', () => {
    expect(localizedPath('/en', 'uk')).toBe('/uk');
  });

  it('falls back to the target language root when the path has no language segment', () => {
    expect(localizedPath('/', 'uk')).toBe('/uk');
  });
});

describe('ogLocale', () => {
  it('maps language codes to Open Graph locale tags', () => {
    expect(ogLocale('en')).toBe('en_US');
    expect(ogLocale('uk')).toBe('uk_UA');
  });
});

describe('breadcrumbJsonLd', () => {
  it('builds an ordered ListItem breadcrumb trail', () => {
    const result = breadcrumbJsonLd([
      { name: 'Home', url: 'https://mishan.pp.ua/en' },
      { name: 'Pets', url: 'https://mishan.pp.ua/en/pets' }
    ]);

    expect(result).toEqual({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://mishan.pp.ua/en' },
        { '@type': 'ListItem', position: 2, name: 'Pets', item: 'https://mishan.pp.ua/en/pets' }
      ]
    });
  });
});

describe('animalShelterJsonLd', () => {
  it('builds an AnimalShelter entity with a postal address', () => {
    const result = animalShelterJsonLd({
      name: 'NGO "Mishanya"',
      description: 'A shelter in Kherson.',
      url: 'https://mishan.pp.ua/en',
      streetAddress: 'Kherson, 10a Baku St.',
      addressLocality: 'Kherson',
      addressCountry: 'UA',
      sameAs: ['https://www.facebook.com/profile.php?id=61555984647054']
    });

    expect(result).toEqual({
      '@context': 'https://schema.org',
      '@type': 'AnimalShelter',
      name: 'NGO "Mishanya"',
      description: 'A shelter in Kherson.',
      url: 'https://mishan.pp.ua/en',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Kherson, 10a Baku St.',
        addressLocality: 'Kherson',
        addressCountry: 'UA'
      },
      sameAs: ['https://www.facebook.com/profile.php?id=61555984647054']
    });
  });

  it('omits sameAs when no links are provided', () => {
    const result = animalShelterJsonLd({
      name: 'NGO "Mishanya"',
      description: 'A shelter in Kherson.',
      url: 'https://mishan.pp.ua/en',
      streetAddress: 'Kherson, 10a Baku St.',
      addressLocality: 'Kherson',
      addressCountry: 'UA',
      sameAs: []
    });

    expect(result).not.toHaveProperty('sameAs');
  });
});

describe('getAnimalShelterStructuredData', () => {
  it('builds structured data from the real about-page content', () => {
    const site = new URL(SITE_URL);
    const result = getAnimalShelterStructuredData('en', site);

    expect(result['@type']).toBe('AnimalShelter');
    expect(result.address.addressCountry).toBe('UA');
    const sameAs = result.sameAs ?? [];
    expect(sameAs.length).toBeGreaterThan(0);
    expect(sameAs.every((href) => href.startsWith('https://'))).toBe(true);
  });
});
