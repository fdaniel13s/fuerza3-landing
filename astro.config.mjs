// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
import tailwind from '@astrojs/tailwind';

const isGithubActions = process.env.GITHUB_ACTIONS === 'true';
const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? '';
const owner = process.env.GITHUB_REPOSITORY_OWNER ?? '';
const siteFromEnv = process.env.SITE_URL;

const site = siteFromEnv ?? (owner ? `https://${owner}.github.io` : 'http://localhost:4321');
const base =
  process.env.BASE_PATH ?? (isGithubActions && !siteFromEnv && repoName ? `/${repoName}` : '/');

export default defineConfig({
	site,
	base,
	integrations: [tailwind()],
});
