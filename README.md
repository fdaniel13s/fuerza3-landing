# Fuerza3 Landing

Landing construida con Astro + Tailwind, preparada para despliegue en GitHub Pages.

## Requisitos

- Node.js 20+
- npm 10+

## Desarrollo local

```bash
npm install
npm run dev
```

## Build local

```bash
npm run build
npm run preview
```

## Deploy automático en GitHub Pages

El repositorio ya incluye el workflow: `.github/workflows/deploy-pages.yml`.

### 1. Activar Pages

1. Ve a `Settings > Pages`.
2. En `Build and deployment`, selecciona `Source: GitHub Actions`.

### 2. Hacer push

Haz push a `main` o `master`. El workflow construye y publica automáticamente.

## Variables opcionales del repositorio

Configúralas en `Settings > Secrets and variables > Actions > Variables`.

- `SITE_URL`
  - Ejemplo: `https://usuario.github.io` o `https://midominio.com`
  - Si no existe, se usa `https://<owner>.github.io`.
- `CUSTOM_DOMAIN`
  - Ejemplo: `midominio.com`
  - Si está definida, el workflow crea `CNAME` automáticamente.
- `FB_PAGE_ID`
  - ID numérico de la fanpage para traer publicaciones en tarjetas.

## Secret opcional del repositorio

Configúralo en `Settings > Secrets and variables > Actions > Secrets`.

- `FB_PAGE_ACCESS_TOKEN`
  - Token de página de Facebook Graph API.
  - Si falta, la sección `ComunidadFanpage` usa fallback al iframe del plugin.

## Dominio personalizado

1. Define `SITE_URL=https://midominio.com`.
2. Define `CUSTOM_DOMAIN=midominio.com`.
3. Configura DNS:
   - Apex (`@`): registros A hacia GitHub Pages.
   - Subdominio (`www`): registro CNAME apuntando a `<owner>.github.io`.
4. En `Settings > Pages`, confirma que el dominio aparece y habilita `Enforce HTTPS` cuando esté disponible.

## Notas técnicas incluidas

- Rutas de imágenes y home ajustadas con `import.meta.env.BASE_URL` para funcionar en subruta y dominio propio.
- `astro.config.mjs` configura `site` y `base` automáticamente según entorno.
- Se incluye `public/.nojekyll` para evitar problemas con assets en `_astro`.
