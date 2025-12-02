import js from '@eslint/js';
import typescriptParser from '@typescript-eslint/parser';
import prettierConfig from 'eslint-config-prettier';
import importPlugin from 'eslint-plugin-import';
import jest from 'eslint-plugin-jest';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import prettierPlugin from 'eslint-plugin-prettier';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import security from 'eslint-plugin-security';
import testingLibrary from 'eslint-plugin-testing-library';
import unusedImports from 'eslint-plugin-unused-imports';
import globals from 'globals';

export default [
    // -------------------------------------------------------------------------
    // 0. GLOBAL CONFIGURATION (Root)
    // Applies to all files (backend, frontend, and root)
    // -------------------------------------------------------------------------
    {
        // Files to ignore
        ignores: [
            'dist',
            'node_modules',
            '.next',
            'build',
            'frontend/dist',
            'backend/node_modules',
        ],
    },

    // 1. JAVASCRIPT DEFAULTS AND COMMON RULES FOR ALL FILES
    {
        files: ['**/*.{js,jsx,ts,tsx}'],

        plugins: {
            import: importPlugin,
            'unused-imports': unusedImports,
            security,
            prettier: prettierPlugin,
        },

        languageOptions: {
            ecmaVersion: 'latest',
            // Both environments are included here because this block is global
            globals: { ...globals.browser, ...globals.node },
            parserOptions: {
                sourceType: 'module',
            },
        },

        rules: {
            ...js.configs.recommended.rules,

            // --- Prettier Integration ---
            'prettier/prettier': 'error',

            // --- General Quality Rules ---
            camelcase: ['error', { properties: 'never' }],
            'prefer-template': 'error',
            'prefer-arrow-callback': 'error',
            complexity: ['error', { max: 7 }],
            'max-depth': ['error', 3],
            'max-params': ['error', 3],
            'no-unused-vars': 'off', // Handled by unused-imports
            'unused-imports/no-unused-imports': 'error',
            'unused-imports/no-unused-vars': [
                'warn',
                {
                    vars: 'all',
                    varsIgnorePattern: '^[A-Z_]',
                    args: 'after-used',
                    argsIgnorePattern: '^_',
                },
            ],
            'no-console': ['error', { allow: ['warn', 'error'] }],
            'no-debugger': 'error',
            'no-var': 'error',
            'prefer-const': 'error',
            eqeqeq: ['error', 'always'],
            'no-shadow': 'error',
            'no-eval': 'error',
            'no-alert': 'error',

            // Import Order (Applied wherever imports are possible)
            'import/order': [
                'error',
                {
                    groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
                    'newlines-between': 'always',
                    alphabetize: { order: 'asc', caseInsensitive: true },
                },
            ],
        },
    },

    // -------------------------------------------------------------------------
    // 2. FRONTEND OVERRIDE (React/Vite)
    // Applies React/JSX specific rules to files in frontend/
    // -------------------------------------------------------------------------
    {
        files: ['frontend/**/*.{js,jsx,ts,tsx}'],

        plugins: {
            react,
            'react-hooks': reactHooks,
            'react-refresh': reactRefresh,
            'jsx-a11y': jsxA11y,
            jest,
            'testing-library': testingLibrary,
            // Other plugins are inherited from the global block
        },

        languageOptions: {
            parser: typescriptParser,
            parserOptions: {
                ecmaFeatures: { jsx: true },
            },
            globals: globals.browser,
        },

        settings: {
            react: {
                version: 'detect',
                jsxRuntime: 'automatic',
            },
        },

        rules: {
            // Activation of React rules
            ...react.configs.recommended.rules,

            // Complexity (Adjusted for frontend if needed, otherwise inherited)
            'max-lines-per-function': [
                'warn',
                { max: 50, skipBlankLines: true, skipComments: true },
            ],

            // React / Hooks specific rules
            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'warn',
            'react/no-danger': 'error',
            'react/no-direct-mutation-state': 'error',
            'react/prop-types': 'warn',
            'react/self-closing-comp': 'error',
            'react/jsx-boolean-value': ['error', 'never'],
            'react/jsx-curly-brace-presence': ['error', { props: 'never', children: 'never' }],
            'react/jsx-no-useless-fragment': 'error',
            'react/react-in-jsx-scope': 'off',
        },
    },

    // -------------------------------------------------------------------------
    // 3. BACKEND OVERRIDE (Node.js/Express)
    // Applies server-specific rules to files in backend/
    // -------------------------------------------------------------------------
    {
        files: ['backend/**/*.{js,ts}'],

        // Important: Resets React/JSX plugins
        plugins: {
            import: importPlugin, // The import plugin remains useful
            'unused-imports': unusedImports,
            security: security,
            prettier: prettierPlugin,
            // No React, JSX-A11y, Jest, or Testing-Library plugins here
        },

        languageOptions: {
            // Activates Node.js environment
            globals: globals.node,
        },

        rules: {
            // Deactivate all React/JSX rules that might have been inherited
            // or do not make sense on the server
            'react/react-in-jsx-scope': 'off',
            'react/prop-types': 'off',
            'react-hooks/rules-of-hooks': 'off',
            'react-hooks/exhaustive-deps': 'off',
            'jsx-a11y/alt-text': 'off',

            // Complexity (Backend functions are often longer, relaxing slightly)
            'max-lines-per-function': 'off',
            complexity: ['error', { max: 10 }], // Max 10 (more permissive)
        },
    },

    // -------------------------------------------------------------------------
    // 4. TESTS OVERRIDE (Adjusted to target both folders)
    // -------------------------------------------------------------------------
    {
        // Targets test files in both subfolders (frontend and backend)
        files: [
            '**/{frontend,backend}/**/__tests__/**/*.{js,ts,jsx,tsx}',
            '**/{frontend,backend}/**/*.test.{js,ts,jsx,tsx}',
        ],

        plugins: {
            jest,
            'testing-library': testingLibrary,
        },

        rules: {
            // Relaxed rules for tests
            'max-lines-per-function': 'off',
            'max-lines': 'off',
            complexity: 'off',
            'no-console': 'off',

            // Specific rules for testing
            'no-unused-expressions': 'off',
            'jest/expect-expect': 'warn',
            'jest/no-disabled-tests': 'warn',
            'jest/no-focused-tests': 'error',
            'testing-library/no-debug': 'warn',
        },
    },

    // 5. PRETTIER CONFIGURATION (Must always be the last one)
    prettierConfig,
];
