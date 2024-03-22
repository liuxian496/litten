
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { resolve } from 'path'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
  build:{
    copyPublicDir:false,
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'litten',
      formats: ['es','cjs'],
      fileName: 'index',
    },
    outDir:'build',
    rollupOptions:{
      output:{
        assetFileNames:`index.[ext]`
      }
    }
  },
  plugins: [react(),dts()],
})
