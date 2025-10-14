# Dynamic OG Tags in Frontend

To set per-page OG tags dynamically in your React app, use `react-helmet-async`.

## Setup:
1. Wrap your app in `HelmetProvider` in `src/main.tsx` or `src/App.tsx`.

Example in `src/App.tsx`:
```tsx
import { HelmetProvider } from 'react-helmet-async';

function App() {
  return (
    <HelmetProvider>
      {/* Your routes and components */}
    </HelmetProvider>
  );
}
```

2. In each page component, use `Helmet` to set meta tags.

Example in `src/pages/Angebot.tsx`:
```tsx
import { Helmet } from 'react-helmet-async';

const Angebot = () => {
  return (
    <>
      <Helmet>
        <title>Angebot - Rhein Neckar Massage Heidelberg</title>
        <meta property="og:title" content="Angebot - Rhein Neckar Massage Heidelberg" />
        <meta property="og:description" content="Entdecken Sie unsere exklusiven Angebote für sinnliche Massagen." />
        <meta property="og:image" content="https://rhein-neckar-massage.de/assets/angebot-og.jpg" />
        <meta property="og:url" content="https://rhein-neckar-massage.de/angebot" />
      </Helmet>
      {/* Rest of component */}
    </>
  );
};
```

## Notes:
- For crawlers (social media bots), React SPAs may not render meta tags properly because they run JavaScript. Consider:
  - Prerendering with tools like `prerender-spa-plugin` for Vite.
  - Server-side rendering (SSR) with Next.js or Remix if needed.
  - Or use static OG tags as fallback.

- Place page-specific OG images in `frontend/public/assets/` and reference them with full URLs.