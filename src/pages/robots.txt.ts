import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site, url }) => {
  const base = import.meta.env.BASE_URL.endsWith('/') ? import.meta.env.BASE_URL : `${import.meta.env.BASE_URL}/`;
  const origin = site ?? new URL(url.origin);
  const sitemapUrl = new URL(`${base}sitemap-index.xml`, origin).toString();

  const body = `User-agent: *\nAllow: /\n\nSitemap: ${sitemapUrl}\n`;
  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
