# Copilot Instructions for Heidenburg Massage Web App

## Project Overview
- This is a Vite + React + TypeScript single-page application for a massage/escort business.
- The app uses React Router for navigation and Tailwind CSS for styling.
- Animations and UI effects are handled with `motion` and custom UI components in `src/components/ui/`.
- The main entry point is `src/App.tsx`, which sets up routing, age confirmation, and global layout.

## Key Directories & Files
- `src/pages/`: Top-level route components (e.g., `Home`, `Kontakt`, `Buchen`).
- `src/components/`: Shared UI and layout components (e.g., `Header`, `Footer`, `Testimonials`).
- `src/components/ui/`: Reusable animated UI primitives (e.g., `ButtonHover`, `TextEffect`).
- `src/lib/`: Utility modules (e.g., `ScrollToTop`, `utils.ts`).
- `public/`: Static assets (images, videos, SVGs).
- `vite.config.ts`: Vite configuration, including alias `@` → `src`.
- `tailwind.config.js`: Tailwind setup; all `src/**/*.{js,ts,jsx,tsx}` and `index.html` are scanned for classes.

## Developer Workflows
- **Start dev server:** `npm run dev` (runs on port 5555 by default)
- **Build for production:** `npm run build`
- **Preview production build:** `npm run preview`
- **Lint code:** `npm run lint` (uses ESLint with TypeScript and React rules)
- **No test scripts or test files are present.**

## Project Conventions & Patterns
- **Routing:** All navigation is handled via React Router in `App.tsx`. Each page is a component in `src/pages/`.
- **Age Confirmation:** Users must confirm age on first visit (`AgeConfirmation` component, state in localStorage).
- **Styling:** Tailwind CSS is used throughout. No CSS-in-JS or styled-components.
- **UI Effects:** Use `motion` and custom primitives from `src/components/ui/` for animation.
- **Component Import Aliases:** Use `@/` to import from `src/` (see `vite.config.ts` and `tsconfig.app.json`).
- **No backend/API integration is present.** All forms (e.g., `Kontakt`) are client-only and do not submit data to a server.

## External Dependencies
- Major libraries: `react`, `react-dom`, `react-router-dom`, `tailwindcss`, `motion`, `lucide-react` (icons), `embla-carousel-react` (carousel), `keen-slider` (slider).
- See `package.json` for full list.

## Example Patterns
- **Animated Button:** Use `<ButtonHover>...</ButtonHover>` from `src/components/ui/button-hover.tsx`.
- **Animated Text:** Use `<TextEffect>` from `src/components/ui/text-effect.tsx`.
- **Page Layout:** Each page component is a functional React component, styled with Tailwind, and may use motion primitives for animation.

## Special Notes
- No server-side code, API, or database integration is present.
- No authentication or user management.
- All data is static or handled in React state only.

---

If you add new workflows, conventions, or architectural changes, update this file to keep AI agents productive.
