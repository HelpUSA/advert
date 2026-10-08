import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        helpus: {
          dark: '#020617',
          card: '#0f172a',
          cardSubtle: '#1e293b',
          border: '#1e293b',
          borderHover: '#334155',
          amber: '#fbbf24',
          sky: '#38bdf8',
          blue: '#3b82f6',
        },
      },
    },
  },
  plugins: [],
};

export default config;
