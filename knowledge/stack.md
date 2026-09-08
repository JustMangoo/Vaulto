# Tech Stack & Architecture Decisions

_Last updated: 2026-08-28_

## Architecture

Single Laravel app using Inertia (not a decoupled Vue SPA + separate JSON
API). Laravel's official Vue+Inertia starter kit scaffolds Inertia 3 + Vue 3
+ TypeScript + Fortify-backed auth (login/register/password reset/email
verification/profile page all built in) in one project: one `package.json`,
one `composer.json`, Vue pages under `resources/js/pages`, routes defined
server-side in `routes/web.php` via `Inertia::render()`.

This superseded an earlier plan to keep `client/` (Vue SPA) and `server/`
(Laravel API) as two fully separate apps talking over Sanctum SPA cookie
auth across origins. That approach was abandoned mid-restart once Inertia
was chosen, since Inertia removes the need for a separate origin, CORS
config, and most of the Sanctum SPA cookie setup for the main web app. The
standalone `client/` folder was retired on the `restart` branch; the whole
app now lives in `server/` (kept as the folder name for now - purely
cosmetic that it holds frontend + backend both, not worth renaming yet).

Sanctum is still part of the stack, but narrowed: not needed for the main
web app's auth (that's session-based via Fortify/Inertia now), reserved
specifically for a future token-based API for a browser extension (a
separate-origin client that can't share first-party session cookies).
`php artisan install:api` can be deferred until the extension work actually
starts.

## Styling

The Vue+Inertia starter kit bundles Tailwind CSS v4 + shadcn-vue components
by default. This is being stripped out, since the design direction is
meant to be custom rather than utility-framework-flavored: hand-written SCSS
in Vue's scoped SFC blocks. A design-token layer (CSS custom properties for
color, type scale, spacing, radii) should sit underneath the SCSS to keep
the look consistent.

Animation library not chosen yet. Candidates:
- GSAP - bespoke, timeline-driven, fully free/MIT now.
- motion-v - Vue port of Framer Motion/Motion, declarative layout animations.
- @vueuse/motion - lighter, directive-based.

Decide once actually building the interactive pieces (side panel slide,
vault card hover peek, gem hover states).

Reka UI (renamed from radix-vue) is the pick for accessible headless
primitives (dropdowns/dialogs/popovers), replacing shadcn-vue. Lucide for
icons (`lucide-vue-next`, migrating to `@lucide/vue`).

## Backend / Database

Laravel + PostgreSQL (not MySQL - Postgres's JSONB fits the vault/gem
custom-fields model better). Every gem has a fixed baseline (media, title,
description, tags) plus a per-vault `custom_fields` JSONB column holding
whatever that vault's template defines (e.g. Music: artist/bpm,
Photography: camera/f-stop). JSONB lets Postgres still index/query into
those fields and combine with normal SQL joins (for tag search, the All
Gems pooled view) - the thing a pure MongoDB document store makes more
awkward. Laravel's Eloquent ORM supports JSON casting/querying natively.

## Media storage

Laravel's `Storage` abstraction pointed at S3-compatible object storage
(e.g. Cloudflare R2), not a local uploads folder - the old Node server's
local uploads approach caused real image files to end up committed to git
history.

## Hosting

Laravel Cloud (official managed platform: git-based deploys, managed
Postgres, scale-to-zero, Starter tier priced for a small/spiky hobby app)
is the default pick. Railway is a simpler alternative with ready-made
Laravel+Postgres templates. Forge/Vapor not needed unless more infra
control is wanted later.

## Why Laravel over continuing with Node/Express/Mongo

Partly technical (JSONB reasoning above), partly that Alex already knows
and enjoys Laravel from past projects and wants to write more PHP - for a
hobby project, enjoying the stack matters.

## Why Inertia over a decoupled API (and why not Blade)

Blade was ruled out outright: it's server-rendered PHP templating,
incompatible with the Vue frontend already decided. Between a decoupled
API and Inertia, the original call was decoupled - reasoning was the repo
already being shaped as two separate folders/dev servers, and the planned
browser extension needing a reusable JSON API rather than Inertia's
page-prop responses. That reasoning still holds for the extension
specifically (hence Sanctum being kept, narrowed to that use case), but the
simplicity of Inertia (built-in auth, no CORS/cookie complexity for the
main app) won out for the web app itself.

## Repo strategy

Staying in the same GitHub repo (`JustMangoo/Vaulto`), rebuilding on a
`restart` branch (branched from `main`). `main` is left untouched as the
full archive of the old Collections/Items-based build (marketing pages, old
auth, `style.css` token system, custom fonts Bricolage Grotesque/Literata/
Open Sans) in case anything from it is worth revisiting later - the font
choice in particular is an open decision, not resolved by the restart.

## Update (2026-08-28): server/ folder flattened to repo root

Since `client/` was removed entirely (the Vue SPA plan was already dead once
Inertia was chosen), keeping everything nested one level down under
`server/` no longer served any purpose - there was no second sibling folder
for it to be "the backend half" of. The whole Laravel+Inertia+Vue app now
lives directly at the repo root (`app/`, `resources/`, `routes/`, `config/`,
etc. are all top-level). `server/` as a folder no longer exists in the repo.

Mechanics used: `git mv` per top-level tracked file/directory (preserves
git history/blame rather than showing as delete+add). `vendor/` and
`node_modules/` were left behind and NOT moved, since both are fully
git-ignored/disposable and moving ~10,700 and ~25,000 files respectively
over a network-mounted folder was extremely slow - much faster to run
`composer install` and `npm install` fresh at the new root. The two
`.gitignore` files (a minimal root one added during the restart, and the
Laravel-default one that lived in `server/`) were merged into a single
root-level `.gitignore`, with the `/server/storage/...` and
`/server/bootstrap/cache/*` rules rewritten to drop the now-wrong `/server/`
prefix.

## Update (2026-08-28): Tailwind actually removed

Went with a clean break (removed the build tooling in one pass, rather than
a gradual per-page swap), since none of the app's current pages are real
Vaulto UI yet, they're all generic Fortify/Inertia starter-kit scaffolding
(login, register, 2FA, passkeys, settings/profile) that was always going to
be rebuilt once real design work starts.

What actually happened:
- Removed from `package.json`: `tailwindcss`, `@tailwindcss/vite`,
  `tw-animate-css`, `prettier-plugin-tailwindcss`, plus the Tailwind v4
  oxide/lightningcss native-binary optional deps. Added `sass` as a
  devDependency (Vite has SCSS support built in, it just needs the compiler
  present).
- Kept `clsx`, `tailwind-merge`, and `class-variance-authority` even though
  they're part of the shadcn-vue pattern, they're just JS class-string
  utilities (no dependency on the Tailwind compiler), and the 139-file
  `resources/js/components/ui/` library plus most of the starter's pages
  still call `cn()` (which wraps clsx+twMerge) and `cva()`. Removing them
  would have broken the build; removing Tailwind itself does not, since it
  only makes those class names stop having any visual effect, not stop
  existing.
- `resources/css/app.css` -> `resources/css/app.scss`: dropped the
  Tailwind-specific bits (`@import 'tailwindcss'`, `@theme inline {}`,
  `@apply`, `@custom-variant`, the `@source` content-scan hints) but kept
  the actual design tokens (`:root`/`.dark` color and radius custom
  properties) as plain CSS custom properties, that data was never
  Tailwind-specific, it's the real color system and is now the foundation
  the hand-written SCSS builds on.
- Deleted `components.json` (the shadcn-vue CLI config, meaningless without
  Tailwind) and cleaned the now-broken Tailwind references out of
  `.prettierrc` and `vite.config.ts`.
- Deliberately did NOT delete `resources/js/components/ui/` (the shadcn
  component library) or touch the ~136 `.vue` files that still reference
  Tailwind utility classes in their markup. Deleting the ui library would
  have cascaded into broken imports across most of the app; instead those
  classes are now inert (harmless, just unstyled) and get replaced
  incrementally as each screen is actually rebuilt with real SCSS.
- Verified via `npm install` (clean) and compiling `app.scss` directly with
  `sass` (no errors). Could not run the full `npm run build` here since it
  shells out to `php artisan wayfinder:generate`, and PHP isn't reachable
  from this environment, only from Alex's actual Windows terminal - worth
  running `npm run build` there once to confirm end-to-end.
