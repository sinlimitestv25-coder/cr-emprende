# Deploy Vercel - Fix Tailwind

Esta versión corrige el error:

```txt
postcss-import: tailwindcss/lib/index.js Unknown word
```

## Cambios

- `src/index.css` usa directivas estables de Tailwind 3:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

- `postcss.config.cjs` usa `tailwindcss` + `autoprefixer`.
- `package.json` fija Tailwind 3.4.17.
- `.gitignore` evita subir `node_modules`, `dist`, `.vercel`, ZIPs y `package-lock.json`.

## Pasos para subir limpio

```bash
git add .
git commit -m "fix: corrige configuracion tailwind para vercel"
git push origin main
```

En Vercel hacer: **Redeploy -> Clear Build Cache**.
