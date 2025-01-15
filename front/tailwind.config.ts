import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "src/views/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        color1: "#560004",
        color2: "#861000",
        color3: "#0089ff",
        color4: "#d0d2ff",
        color5: "#ffffff",
      },
      fontFamily: {
        Inter: ['Inter', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 1.5s ease-in-out',
        'slide-in': 'slideIn 1.5s ease-out',
        'pop-in': 'popIn 1s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        popIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      
    },
  },
  plugins: [],
} satisfies Config;
