import { useEffect, useState } from 'react';

type FetchState<T> = {
  data: T | null;
  loading: boolean;
  error: Error | null;
};

// Helper to resolve API base at runtime
const getApiBase = () => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const buildTime = (import.meta as any).env?.VITE_API_BASE as string | undefined;
    if (buildTime && buildTime !== 'undefined') return buildTime.replace(/\/$/, '');
  } catch {
    // ignore
  }
  // Allow injecting at runtime via a global
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const runtime = (window as any).__API_BASE || (window as any).__RUNTIME_CONFIG?.VITE_API_BASE;
  if (runtime) return String(runtime).replace(/\/$/, '');
  // Fallback to same-origin /api
  return `${window.location.origin.replace(/\/$/, '')}/api`;
};

const API_BASE = getApiBase();

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
      .catch((err: unknown) => {
        if (err && typeof err === 'object' && 'name' in err && err.name === 'AbortError') return;
        setState({ data: null, loading: false, error: err instanceof Error ? err : new Error(String(err)) });
      });

    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return state;
}
