// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import node from '@astrojs/node';

export default defineConfig({
  site: 'https://devlog.bubblestone.net',
  // static이 기본값. prerender=false 페이지만 SSR (admin 로그인 등)
  output: 'static',
  integrations: [mdx(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
  adapter: node({ mode: 'standalone' }),
  security: {
    checkOrigin: false,
  },
});
