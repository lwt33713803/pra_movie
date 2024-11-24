import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

import sitemap from '@astrojs/sitemap';

import tailwind from '@astrojs/tailwind';

import vue from '@astrojs/vue';

import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
  site: 'https://example.com',
  integrations: [mdx(), sitemap(), tailwind(), vue()],
  output: 'server',
  devToolbar: {
    enabled: false
  },
  server: { port: 8431, host: true},
  adapter: node({
    mode: 'standalone',
  }),
});