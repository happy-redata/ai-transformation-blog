import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                'zt-bg-cream': '#faf9f6',
                'zt-bg-dark': '#1a1a1a',
                'zt-text-main': '#1a1a1a',
                'zt-text-secondary': '#666',
                'zt-text-muted': '#999',
                'zt-accent-orange': '#ff5e00',
                'zt-border': '#e5e5e5',
            },
            fontFamily: {
                sans: ['var(--font-inter)'],
                serif: ['var(--font-merriweather)'],
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
        },
    },
    plugins: [],
};
export default config;
