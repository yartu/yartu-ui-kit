import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  build: {
    target: 'es2015',
    emptyOutDir: true,
    lib: {
      entry: fileURLToPath(new URL('./index.js', import.meta.url)),
      name: 'yartu',
      formats: ['es', 'umd'],
      fileName: (format) => (format === 'es' ? 'yartu.es.js' : 'yartu.umd.js'),
      cssFileName: 'yartu',
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: { vue: 'Vue' },
        exports: 'named',
      },
    },
  },
});
