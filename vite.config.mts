/// <reference types="vitest/config" />
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
// import { libInjectCss } from "vite-plugin-lib-inject-css";
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const dirname =
  typeof __dirname !== 'undefined'
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
const components = [
  'button',
  'checkbox',
  'formLabel',
  'iconButton',
  'listbox',
  'listGroup',
  'listItem',
  'loading',
  'popup',
  'radio',
  'radioGroup',
  'slider',
  'stackPanel',
  'summary',
  'switch',
  'textField',
];
type entry = {
  [index: string]: string;
};
function getComponentsEntry(components: string[]) {
  const value: entry = {};
  components.map((component) => {
    value[component] = `src/${component}.ts`;
  });
  return value;
}

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    copyPublicDir: false,
    cssCodeSplit: true,
    lib: {
      entry: {
        index: 'src/index.ts',
        enum: 'src/enum.ts',
        ...getComponentsEntry(components),
      },
      name: 'litten',
      fileName: 'index',
    },
    outDir: 'dist',
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        'classnames',
        'cyndi/dist/getPrefixNs',
        'litten-hooks/dist/checkedControl',
        'litten-hooks/dist/contentControl',
        'litten-hooks/dist/focusControl',
        'litten-hooks/dist/disabledControl',
        'litten-hooks/dist/enum',
        'litten-hooks/dist/userControl',
        'lodash/max',
        'lodash/isFunction',
        'number-precision',
      ],
      output: [
        {
          format: 'es',
          manualChunks: (id: string) => {
            if (id.includes('node_modules')) {
              if (id.includes('classnames')) {
                return 'classnames';
              }
              if (id.includes('lodash')) {
                return 'lodash';
              }
              if (id.includes('number-precision')) {
                return 'number-precision';
              }
              if (id.includes('cyndi')) {
                return 'cyndi';
              }
              return 'vender';
            }
            if (id.includes('components/control/')) {
              const fileName = id.split('components/control/')[1].split('.');
              return fileName[0];
            }
            if (id.includes('components/buttonBase/')) {
              return 'buttonBase';
            }
            if (id.includes('components/icon/')) {
              return 'icon';
            }
            if (id.includes('components/exceptionBoundary')) {
              return 'exceptionBoundary';
            }
            if (id.includes('components/ripple/')) {
              return 'ripple';
            }
            if (id.includes('global/')) {
              // console.log(id);
              return id.split('global/')[1].split('.')[0];
            }
          },
          chunkFileNames: 'chunks/[name].[hash].js',
          assetFileNames: 'assets/[name][extname]',
          entryFileNames: '[name].js',
        },
      ],
    },
  },
  plugins: [
    react(),
    // libInjectCss(),
    dts(),
    visualizer(),
  ],
  test: {
    projects: [
      {
        extends: true,
        plugins: [
          // The plugin will run tests for the stories defined in your Storybook config
          // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
          storybookTest({
            configDir: path.join(dirname, '.storybook'),
          }),
        ],
        test: {
          name: 'storybook',
          browser: {
            enabled: true,
            headless: true,
            provider: playwright({}),
            instances: [
              {
                browser: 'chromium',
              },
            ],
          },
          setupFiles: ['.storybook/vitest.setup.ts'],
        },
      },
    ],
    coverage: {
      provider: 'istanbul',
      all: true,
      reporter: ['text', 'html', 'clover', 'json-summary', 'lcov'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'src/**/*.stories.{ts,tsx}',
        'src/**/*.test.{ts,tsx}',
        'src/test/**/*.{ts,tsx}',
        'src/**/*.types.ts',
        'src/*.ts',
      ],
      thresholds: {
        statements: 100,
        functions: 100,
        branches: 100,
      },
    },
  },
});
