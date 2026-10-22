// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import fs from 'node:fs';
import { load } from 'js-yaml';

// 自动从 config.yaml 读取站点上线域名 (Single Source of Truth)
let siteUrl = 'https://gg.rekcore.com';
try {
  if (fs.existsSync('./config.yaml')) {
    const raw = /** @type {any} */ (load(fs.readFileSync('./config.yaml', 'utf-8')));
    if (raw?.site?.url) {
      siteUrl = raw.site.url;
    }
  }
} catch {}

export default defineConfig({
  site: siteUrl,
  integrations: [mdx(), sitemap()],
  vite: { plugins: [tailwindcss()] },
});
