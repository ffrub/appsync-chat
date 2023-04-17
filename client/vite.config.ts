import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import { esbuildCommonjs } from '@originjs/vite-plugin-commonjs';

export default defineConfig({
  plugins: [solidPlugin()],
  optimizeDeps: {
    esbuildOptions: {
      plugins: [esbuildCommonjs(['aws-appsync'])],
    },
  },
  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
});
