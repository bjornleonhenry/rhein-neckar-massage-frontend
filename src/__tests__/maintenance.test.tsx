import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';

// Mock translation hook to return keys as text
vi.mock('@/hooks/useTranslation', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    language: 'en',
    setLanguage: () => {},
  }),
}));

// Avoid actual router navigation warnings by ensuring default path
beforeEach(() => {
  const fetchMock = vi.fn();
  (globalThis as unknown as { fetch: typeof fetch }).fetch = fetchMock as unknown as typeof fetch;
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('Maintenance gating', () => {
  it('renders Maintenance component when maintenance_mode=true on non-admin path', async () => {
    // Mock settings endpoint response
    const fetchMock = globalThis.fetch as unknown as ReturnType<typeof vi.fn>;
    fetchMock.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ maintenance_mode: true, age_confirmation: false }),
    });

    render(<App />);

    // Wait for settings to load and Maintenance to be displayed
    await waitFor(() => {
      // We mocked t to echo keys, so look for a known maintenance key
      expect(screen.getByText('maintenance.description1')).toBeInTheDocument();
      expect(screen.getByText('maintenance.confirm')).toBeInTheDocument();
    });
  });
});
