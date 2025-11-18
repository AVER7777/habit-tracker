import js from '@eslint/js';
import globals from 'globals';

import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import react from 'eslint-plugin-react';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import importPlugin from 'eslint-plugin-import';
import unusedImports from 'eslint-plugin-unused-imports';
import security from 'eslint-plugin-security';
import jest from 'eslint-plugin-jest';
import testingLibrary from 'eslint-plugin-testing-library';

import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
    // Ignore certain files
    globalIgnores(['dist', 'node_modules', '.next', 'build']),

    // Global config for JS/TS/React
    {
        files: ['**/*.{js,jsx,ts,tsx}'],
        plugins: {
            react,
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
            'jsx-a11y': jsxA11y,
            import: importPlugin,
            'unused-imports': unusedImports,
            security,
            jest,
            'testing-library': testingLibrary,
        },
        languageOptions: {
            ecmaVersion: 'latest',
            globals: { ...globals.browser, ...globals.node },
            parserOptions: {
                ecmaFeatures: { jsx: true },
                sourceType: 'module',
            },
        },
        rules: {
            ...js.configs.recommended.rules,
            ...react.configs.recommended.rules,

            // React / Hooks
            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'warn',
            'react/no-danger': 'error',
            'react/no-direct-mutation-state': 'error',
            'react/prop-types': 'warn',
            'react/self-closing-comp': 'error',
            'react/jsx-boolean-value': ['error', 'never'],
            'react/jsx-curly-brace-presence': ['error', { props: 'never', children: 'never' }],
            'react/jsx-no-useless-fragment': 'error',

            // Core Code Quality
            'no-unused-vars': 'off',
            'unused-imports/no-unused-imports': 'error',
            'unused-imports/no-unused-vars': [
                'warn',
                { vars: 'all', varsIgnorePattern: '^[A-Z_]', args: 'after-used', argsIgnorePattern: '^_' },
            ],
            'no-console': ['error', { allow: ['warn', 'error'] }],
            'no-debugger': 'error',
            'no-var': 'error',
            'prefer-const': 'error',
            eqeqeq: ['error', 'always'],
            complexity: ['warn', { max: 8 }],
            'max-lines': ['warn', { max: 250, skipBlankLines: true, skipComments: true }],
            'max-params': ['warn', 4],
            'max-depth': ['warn', 4],
            'max-lines-per-function': ['warn', { max: 75, skipBlankLines: true, skipComments: true }],
            'no-shadow': 'error',
            'no-eval': 'error',
            'no-alert': 'error',

            // Security
            'security/detect-object-injection': 'warn',
            'security/detect-unsafe-regex': 'error',
            'security/detect-non-literal-regexp': 'warn',
            'security/detect-non-literal-fs-filename': 'warn',
            'security/detect-eval-with-expression': 'error',
            'security/detect-new-buffer': 'warn',

            // Accessibility
            'jsx-a11y/anchor-is-valid': 'warn',
            'jsx-a11y/alt-text': 'warn',
            'jsx-a11y/no-static-element-interactions': 'warn',
            'jsx-a11y/no-noninteractive-element-interactions': 'warn',
            'jsx-a11y/click-events-have-key-events': 'warn',
            'jsx-a11y/control-has-associated-label': 'warn',
            'jsx-a11y/no-autofocus': 'warn',
            'jsx-a11y/no-redundant-roles': 'warn',
            'jsx-a11y/tabindex-no-positive': 'warn',

            // Imports
            'import/no-unresolved': 'error',
            'import/no-absolute-path': 'error',
            'import/no-cycle': 'error',
            'import/no-duplicates': 'error',
            'import/extensions': ['error', 'never'],
            'import/newline-after-import': ['error', { count: 1 }],
            'import/order': [
                'warn',
                { groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'], 'newlines-between': 'always', alphabetize: { order: 'asc', caseInsensitive: true } },
            ],

            // Style
            indent: ['error', 4, { SwitchCase: 1 }],
            semi: ['error', 'always'],
            quotes: ['error', 'single', { avoidEscape: true }],
            'comma-dangle': ['error', 'always-multiline'],
            'brace-style': ['error', '1tbs', { allowSingleLine: true }],
            'arrow-spacing': ['error', { before: true, after: true }],
            'space-before-function-paren': ['error', 'never'],
            'object-curly-spacing': ['error', 'always'],
            'array-bracket-spacing': ['error', 'never'],
            'padding-line-between-statements': [
                'error',
                { blankLine: 'always', prev: 'block-like', next: 'return' },
                { blankLine: 'always', prev: 'const', next: '*' },
                { blankLine: 'always', prev: '*', next: 'const' },
            ],
        },
    },

    // Next.js pages / API routes override
    {
        files: ['pages/**/*.{js,ts,jsx,tsx}', 'api/**/*.{js,ts}'],
        rules: {
            'max-lines-per-function': 'off',
            'max-lines': 'off',
            complexity: 'off',
            'no-console': 'off',
        },
    },

    // Tests override
    {
        files: ['**/__tests__/**/*.{js,ts,jsx,tsx}', '**/*.test.{js,ts,jsx,tsx}'],
        plugins: ['jest', 'testing-library'],
        rules: {
            'no-unused-expressions': 'off',
            'jest/expect-expect': 'warn',
            'jest/no-disabled-tests': 'warn',
            'jest/no-focused-tests': 'error',
            'testing-library/no-debug': 'warn',
        },
    },
]);
