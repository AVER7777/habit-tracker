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

            keyframes: {
                bump: {
                    '0%, 100%': { transform: 'scale(1)' },
                    '50%': { transform: 'scale(0.95)' },
                },
                shake: {
                    '0%, 100%': { transform: 'translateX(0)' },
                    '25%': { transform: 'translateX(-4px)' },
                    '75%': { transform: 'translateX(4px)' },
                },
            },
            animation: {
                bump: 'bump 0.2s ease-in-out',
                shake: 'shake 0.3s ease-in-out',
            },
        },
    },
    plugins: [],
};
