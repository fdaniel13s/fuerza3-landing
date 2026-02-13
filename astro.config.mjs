// @ts-check
import { defineConfig } from 'astro/config';
import { existsSync, readFileSync } from 'node:fs';

// https://astro.build/config
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

const isGithubActions = process.env.GITHUB_ACTIONS === 'true';
const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? '';
const owner = process.env.GITHUB_REPOSITORY_OWNER ?? '';
const siteFromEnv = process.env.SITE_URL;
const customDomainFromCname = existsSync('public/CNAME')
  ? readFileSync('public/CNAME', 'utf8').trim()
  : '';
const siteFromCname = customDomainFromCname ? `https://${customDomainFromCname}` : '';

const site = siteFromEnv || siteFromCname || (owner ? `https://${owner}.github.io` : 'http://localhost:4321');
const basePath =
  process.env.BASE_PATH ??
  (isGithubActions && !siteFromEnv && !siteFromCname && repoName ? `/${repoName}` : '/');
const normalizedBase =
  basePath === '/' ? '/' : `/${basePath.replace(/^\/+|\/+$/g, '')}/`;

export default defineConfig({
	site,
	base: normalizedBase,
  integrations: [tailwind(), sitemap()],
});
