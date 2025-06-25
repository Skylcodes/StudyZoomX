// @ts-check

import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import eslint from '@eslint/js';
import prettier from 'eslint-plugin-prettier/recommended';
import tailwindcss from 'eslint-plugin-tailwindcss';
import tseslint from 'typescript-eslint';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const flatCompat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: eslint.configs.recommended,
  allConfig: eslint.configs.all
});

// If you use compats that are not flat/eslint 9 compatible, you have to use fixupConfigRules from @eslint/compat.
const compatConfigs = flatCompat.extends(
  'next/core-web-vitals',
  'next/typescript',
  // Versions for flat config exist, but would conflict with next.
  'plugin:react/recommended',
  'plugin:react-hooks/recommended'
);

const config = tseslint.config(
  // Ignore all folders and files we don't want to lint
  {
    ignores: [
      '**/.content-collections/',
      '**/.next/',
      '**/.turbo/',
      '**/.vercel/',
      '**/build/',
      '**/coverage/',
      '**/dist/',
      '**/node_modules/',
      '**/out/',
      '**/public/',
      '**/*.d.ts'
    ]
  },
  // Flat configuration
  eslint.configs.recommended,
  tseslint.configs.recommended,
  ...compatConfigs,
  ...tailwindcss.configs['flat/recommended'],
  {
    files: ['**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}'],
    settings: {
      react: { version: 'detect' },
      tailwindcss: {
        callees: ['cn', 'cva'],
        config: 'tailwind.config.cjs'
      }
    },
    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    // Overrides
    rules: {
      '@next/next/no-img-element': 'off',

      '@typescript-eslint/no-empty-object-type': 'off',
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/no-wrapper-object-types': 'off',
      '@typescript-eslint/no-unsafe-function-type': 'off',
      '@typescript-eslint/no-unused-expressions': 'off',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_'
        }
      ],

      'react/display-name': 'off',
      'react/no-unescaped-entities': 'off',
      'react/no-unknown-property': 'off',
      'react/prop-types': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/self-closing-comp': [
        'error',
        {
          component: true,
          html: true
        }
      ],

      'tailwindcss/no-custom-classname': 'off',
      'tailwindcss/classnames-order': 'error'
    }
  },
  // Has to be last to ensure compatibility with prettier
  prettier
);

export default config;
