import js from '@eslint/js';
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
    // Ignored files (à laisser en premier)
    {
        ignores: ['dist', 'node_modules', '.next', 'build'],
    },

    // Global JS/TS/React config
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
            prettier: prettierPlugin,
        },

        languageOptions: {
            ecmaVersion: 'latest',
            globals: { ...globals.browser, ...globals.node },
            parserOptions: {
                ecmaFeatures: { jsx: true },
                sourceType: 'module',
            },
        },

        settings: {
            react: {
                version: 'detect',
                jsxRuntime: 'automatic',
            },
        },

        rules: {
            ...js.configs.recommended.rules,
            ...react.configs.recommended.rules,

            // --- 1. Intégration Prettier ---
            'prettier/prettier': 'error', // Fait de toutes les violations de style Prettier des erreurs ESLint

            // --- 2. Règles de Qualité & Stricte ---

            // Nommage et Clarté
            camelcase: ['error', { properties: 'never' }], // Forcer le camelCase (sauf pour destructuration)
            'prefer-template': 'error', // Forcer l'utilisation des template literals
            'prefer-arrow-callback': 'error', // Forcer l'utilisation des fonctions fléchées pour les callbacks

            // Complexité (Resserré pour un code propre)
            complexity: ['error', { max: 7 }], // Max 7
            'max-depth': ['error', 3], // Max 3 niveaux d'imbrication
            'max-params': ['error', 3], // Max 3 arguments par fonction
            'max-lines-per-function': [
                'warn',
                { max: 50, skipBlankLines: true, skipComments: true },
            ], // Max 50 lignes par fonction

            // Variables/Imports
            'no-unused-vars': 'off', // Désactivé au profit de unused-imports
            'unused-imports/no-unused-imports': 'error',
            'unused-imports/no-unused-vars': [
                'warn',
                {
                    vars: 'all',
                    varsIgnorePattern: '^[A-Z_]', // Constantes globales ou préfixe '_'
                    args: 'after-used',
                    argsIgnorePattern: '^_', // Arguments de fonction ignorés avec le préfixe '_'
                },
            ],

            // Ordre des Imports
            'import/order': [
                'error', // Passé à 'error' pour imposer un ordre
                {
                    groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
                    'newlines-between': 'always',
                    alphabetize: { order: 'asc', caseInsensitive: true },
                },
            ],

            // Général
            'no-console': ['error', { allow: ['warn', 'error'] }],
            'no-debugger': 'error',
            'no-var': 'error',
            'prefer-const': 'error',
            eqeqeq: ['error', 'always'],
            'no-shadow': 'error',
            'no-eval': 'error',
            'no-alert': 'error',

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
            'react/react-in-jsx-scope': 'off', // Support du JSX automatique
        },
    },

    // 3. Overrides (API/Pages et Tests)
    {
        // Supprime les restrictions de taille et complexité pour les fichiers de routes ou d'API
        files: [
            'pages/**/*.{js,ts,jsx,tsx}',
            'api/**/*.{js,ts}',
            '**/__tests__/**/*.{js,ts,jsx,tsx}',
            '**/*.test.{js,ts,jsx,tsx}',
        ],
        rules: {
            'max-lines-per-function': 'off',
            'max-lines': 'off',
            complexity: 'off',
            'no-console': 'off',
            // Règles spécifiques aux tests
            'no-unused-expressions': 'off',
            'jest/expect-expect': 'warn',
            'jest/no-disabled-tests': 'warn',
            'jest/no-focused-tests': 'error',
            'testing-library/no-debug': 'warn',
        },
    },

    // deactivate all rules that are unnecessary or might conflict with Prettier
    prettierConfig,
];
