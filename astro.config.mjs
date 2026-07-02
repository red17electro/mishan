import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const SITE_URL = 'https://mishan.pp.ua';

export default defineConfig({
  site: SITE_URL,
  output: 'static',
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'uk',
        locales: {
          en: 'en-US',
          uk: 'uk-UA'
        }
      },
      filter: (page) => page !== `${SITE_URL}/`
    })
  ]
});
