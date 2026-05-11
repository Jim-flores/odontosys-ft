# AGENTS.md

## Dev Commands
- `npm install`
- `cp .env.example .env` (or create `.env` with `API_URL`)
- `npm run dev` (Vite dev server)
- `npm run build` (TypeScript build + Vite build)
- `npm run preview` (serve production build)
- `npm run lint` (ESLint)
- Pre-commit hook runs `npx lint-staged`.
- `src/**/*.{ts,tsx,js,jsx}` -> `prettier --write` + `eslint --fix`.
- `src/**/*.{json,md}` -> `prettier --write`.

## Folder Architecture
- `src/modules/*`: feature-first domains (`auth`, `users`, `company`, `tables`, `forms`, `charts`), usually split into `pages`, `components`, `hooks`, `services`, `constants`, `interfaces`/`schema`.
- `src/components/ui`: shared shadcn/Radix primitives (button, input, dialog, table, etc.).
- `src/components/table`, `src/components/customFormFields`, `src/components/dialogs`: app-level reusable composed components.
- `src/layouts`: dashboard shell and layout components.
- `src/routes`: router and route guards.
- `src/providers`: global providers (TanStack Query).
- `src/store`: Zustand stores.
- `src/api`, `src/services`, `src/storage`, `src/config`, `src/utils`, `src/lib`: cross-cutting infrastructure/utilities.
- Path alias: use `@/` for `src/*`.

## Coding Rules
- TypeScript is strict (`strict`, `noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch`).
- Use function components with hooks and typed props/interfaces.
- Keep imports alias-first (`@/...`) over deep relative paths.
- Components/pages/layouts: `PascalCase`.
- Hooks: `useXxx`.
- Services/constants/schema: domain-scoped under each module.
- Use shared infra instead of duplicating.
- HTTP through `src/api/api.ts`.
- Global state through Zustand stores in `src/store`.
- Query logic through TanStack Query hooks/providers.
- Follow existing formatter/lint output; do not fight lint-staged auto-fixes.

## UI Patterns (shadcn)
- Reuse primitives from `src/components/ui` before creating custom UI.
- Use `cn()` from `src/lib/utils` for class composition and `cva` for variants (see `ui/button.tsx`).
- Keep theming token-based via CSS variables in `src/index.css` (`bg-background`, `text-foreground`, `border-border`, etc.).
- Prefer composition over ad-hoc styles.
- Tables via shared `AppTable*` wrappers on top of shadcn table + TanStack Table.
- Forms via React Hook Form + Zod + shared field wrappers (`customFormFields`).
- Dialogs/toasts via shared `AppDialog` and `sonner`.
- For new base components, align with `components.json`.
- style: `new-york`.
- Tailwind v4 + CSS variables.
- aliases: `@/components`, `@/components/ui`, `@/lib/utils`, `@/hooks`.
