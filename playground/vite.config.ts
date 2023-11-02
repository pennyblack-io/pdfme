import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  build: { target: 'esnext' },
  plugins: [react()],
  resolve: {
    alias: {
      // Map pennyblack packages to pdfme versions
      "@pdfme/ui": path.resolve(__dirname, '../packages/ui/'),
      "@pdfme/schemas": path.resolve(__dirname, '../packages/schemas/'),
      "@pdfme/common": path.resolve(__dirname, '../packages/common/'),
      "@pdfme/generator": path.resolve(__dirname, '../packages/generator/'),
    },
  },
});
