# ENGG 152 — Exam 2 Study Guide

Mobile-friendly crash course for block diagrams, stability, Routh-Hurwitz, and steady-state error.

## Local dev

```
pnpm install
pnpm dev          # http://localhost:5173
```

## Quality gates

```
pnpm typecheck    # tsc --noEmit, strict mode
pnpm lint         # eslint strict type-checked, max warnings = 0
pnpm build        # production bundle → dist/
```

## Deploy to Cloudflare Pages

### One-time (via dashboard)

1. Push this folder to a GitHub repo.
2. Cloudflare dashboard → Workers & Pages → Create application → Pages → Connect to Git.
3. Build command: `pnpm build`. Build output directory: `dist`.
4. Node version: `20`.
5. Deploy.

### CLI (wrangler)

```
pnpm build
npx wrangler pages deploy dist --project-name=engg152-study-guide
```

`wrangler.toml` has the project configured; `public/_headers` sets caching + minimal security headers.
