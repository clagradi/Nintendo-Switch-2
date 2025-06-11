import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
      onwarn(warning, warn) {
        // Hide annoying warnings that don't affect functionality
        if (
          warning.code === 'CHUNK_LOAD_ERROR' ||
          warning.code === 'MODULE_LEVEL_DIRECTIVE' ||
          warning.message.includes('chunk')
        ) {
          return;
        }
        warn(warning);
      },
    },
    chunkSizeWarningLimit: 1000, // Increase chunk size limit to reduce warnings
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api'),
      },
    },
  },
  esbuild: {
    // Suppress some console warnings during build
    logOverride: { 
      'this-is-undefined-in-esm': 'silent',
      'empty-import-meta': 'silent'
    }
  }
})
