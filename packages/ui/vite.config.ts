import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import topLevelAwait from 'vite-plugin-top-level-await';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths({root: '.'}),
    topLevelAwait({
      promiseExportName: '__tla',
      promiseImportName: (i) => `__tla_${i}`,
    }),
    cssInjectedByJsPlugin(),
  ],
  build: {
    lib: {
      entry: 'src/index.ts',
      name: '@pdfme/ui',
      fileName: () => `index.js`,
      formats: ['es'],
    },
  },
  resolve: {
    alias: {
      // Map pennyblack packages to pdfme versions
      "@pdfme/common": path.resolve(__dirname, '../common/'),
      "@pdfme/schemas": path.resolve(__dirname, '../schemas/'),
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'pdfjs-dist', 'antd'],
    exclude: ['@pdfme/common', '@pdfme/schemas'],
  },
});
