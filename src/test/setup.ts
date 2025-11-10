import '@testing-library/jest-dom/vitest';

// Mock scrollTo used by some components
Object.defineProperty(window, 'scrollTo', { value: () => {}, writable: true });
