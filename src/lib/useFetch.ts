import { useEffect, useState } from 'react';

type FetchState<T> = {
  data: T | null;
  loading: boolean;
  error: Error | null;
};

// Default API base; can be overridden via Vite env var VITE_API_BASE
// Use Vite env var for API base, fallback to local dev
const API_BASE = (import.meta as any).env?.VITE_API_BASE;

export const API = {
  base: API_BASE,
  angbots: `${API_BASE}/angebots`,
  gaestebuchs: `${API_BASE}/gaestebuchs`,
  ambients: `${API_BASE}/ambients`,
};

function joinUrl(base: string, path: string) {
  if (/^https?:\/\//i.test(path)) return path; // absolute
  return `${base.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
}

export function useFetch<T = any>(url: string, init?: RequestInit) {
  const [state, setState] = useState<FetchState<T>>({ data: null, loading: true, error: null });

  useEffect(() => {
    const controller = new AbortController();
    setState({ data: null, loading: true, error: null });

    const finalUrl = joinUrl(API_BASE, url);

    fetch(finalUrl, { signal: controller.signal, ...init })
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to fetch ${finalUrl}: ${res.status}`);
        return res.json();
      })
      .then((data: T) => setState({ data, loading: false, error: null }))
      .catch((err: any) => {
        if (err?.name === 'AbortError') return;
        setState({ data: null, loading: false, error: err instanceof Error ? err : new Error(String(err)) });
      });

    return () => controller.abort();
  }, [url]);

  return state;
}
