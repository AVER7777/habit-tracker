/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                ios: {
                    bg: 'var(--ios-bg)',
                    label: 'var(--ios-label)',
                    secondary: 'var(--ios-secondary)',
                    tertiary: 'var(--ios-tertiary)',
                    quaternary: 'var(--ios-quaternary)',
                },
            },
            fontFamily: {
                apple: [
                    '-apple-system',
                    'BlinkMacSystemFont',
                    '"Segoe UI"',
                    'Roboto',
                    'Helvetica',
                    'Arial',
                    'sans-serif',
                ],
            },
        },
    },
    plugins: [],
};
