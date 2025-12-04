import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5555,
    proxy: {
      '/api': {
        target: 'https://rhein-neckar-massage.de',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api/, '/api'),
      },
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['motion/react', 'lucide-react'],
          'form-vendor': ['react-hook-form', 'zod'],
          // Large third-party libraries
          'vendor': ['@radix-ui/react-dialog', '@radix-ui/react-label', '@radix-ui/react-slot', '@radix-ui/react-tabs'],
        },
      },
    },
    chunkSizeWarningLimit: 1000, // Increase limit to 1000kb
  },
});
