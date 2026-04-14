import type { Config } from "tailwindcss";
import tailwindAnimate from "tailwindcss-animate";
import typography from "@tailwindcss/typography";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        winmax: {
          orange: "hsl(var(--winmax-orange))",
          "orange-light": "hsl(var(--winmax-orange-light))",
          dark: "hsl(var(--winmax-dark))",
          gray: "hsl(var(--winmax-gray))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ['Outfit', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(40px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "pulse-glow": {
          "0%": { boxShadow: "0 0 20px hsl(217 91% 60% / 0.3)" },
          "100%": { boxShadow: "0 0 40px hsl(217 91% 60% / 0.6)" },
        },
        "slide-in": {
          "0%": { opacity: "0", transform: "translateX(-30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "bounce-gentle": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-5px)" },
        },
        "scale-up": {
          "0%": { transform: "scale(0.95)" },
          "100%": { transform: "scale(1)" },
        },
        "hover-lift": {
          "0%": { transform: "translateY(0) scale(1)" },
          "100%": { transform: "translateY(-5px) scale(1.02)" },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "rotate-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "morph": {
          "0%, 100%": { transform: "scale(1) rotate(0deg)", borderRadius: "20%" },
          "50%": { transform: "scale(1.1) rotate(180deg)", borderRadius: "50%" },
        },
        "glow-pulse": {
          "0%, 100%": { 
            boxShadow: "0 0 20px hsl(var(--winmax-orange) / 0.3)",
            filter: "brightness(1)"
          },
          "50%": { 
            boxShadow: "0 0 40px hsl(var(--winmax-orange) / 0.8), 0 0 60px hsl(var(--winmax-orange) / 0.5)",
            filter: "brightness(1.2)"
          },
        },
        "tilt-3d": {
          "0%": { transform: "perspective(1000px) rotateX(0deg) rotateY(0deg)" },
          "50%": { transform: "perspective(1000px) rotateX(-10deg) rotateY(10deg)" },
          "100%": { transform: "perspective(1000px) rotateX(0deg) rotateY(0deg)" },
        },
        "scroll-parallax": {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-50px)" },
        },
        "elastic-bounce": {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.3)" },
          "75%": { transform: "scale(0.9)" },
          "100%": { transform: "scale(1)" },
        },
        "wiggle": {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        "float-up": {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-10px) rotate(5deg)" },
        },
        "slide-in-up": {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in-down": {
          "0%": { opacity: "0", transform: "translateY(-30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in-left": {
          "0%": { opacity: "0", transform: "translateX(-30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "slide-in-right": {
          "0%": { opacity: "0", transform: "translateX(30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "zoom-in": {
          "0%": { opacity: "0", transform: "scale(0.8)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "flip-in": {
          "0%": { opacity: "0", transform: "perspective(400px) rotateY(90deg)" },
          "100%": { opacity: "1", transform: "perspective(400px) rotateY(0deg)" },
        },
        "bounce-in": {
          "0%": { opacity: "0", transform: "scale(0.3) translateY(100px)" },
          "50%": { opacity: "1", transform: "scale(1.05) translateY(-30px)" },
          "70%": { transform: "scale(0.9) translateY(0px)" },
          "100%": { opacity: "1", transform: "scale(1) translateY(0)" },
        },
        "glow-spin": {
          "0%": { 
            transform: "rotate(0deg)",
            filter: "hue-rotate(0deg) brightness(1)"
          },
          "50%": {
            filter: "hue-rotate(180deg) brightness(1.2)"
          },
          "100%": { 
            transform: "rotate(360deg)",
            filter: "hue-rotate(360deg) brightness(1)"
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.6s ease-out",
        "slide-up": "slide-up 0.6s ease-out",
        "slide-in": "slide-in 0.5s ease-out",
        "float": "float 6s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite alternate",
        "bounce-gentle": "bounce-gentle 2s ease-in-out infinite",
        "scale-up": "scale-up 0.3s ease-out",
        "hover-lift": "hover-lift 0.3s ease-out",
        "shimmer": "shimmer 2s linear infinite",
        "rotate-slow": "rotate-slow 10s linear infinite",
        "morph": "morph 4s ease-in-out infinite",
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
        "tilt-3d": "tilt-3d 6s ease-in-out infinite",
        "scroll-parallax": "scroll-parallax 20s linear infinite",
        "elastic-bounce": "elastic-bounce 0.6s ease-out",
        "wiggle": "wiggle 1s ease-in-out infinite",
        "float-up": "float-up 3s ease-in-out infinite",
        "slide-in-up": "slide-in-up 0.6s ease-out",
        "slide-in-down": "slide-in-down 0.6s ease-out",
        "slide-in-left": "slide-in-left 0.6s ease-out", 
        "slide-in-right": "slide-in-right 0.6s ease-out",
        "zoom-in": "zoom-in 0.5s ease-out",
        "flip-in": "flip-in 0.6s ease-out",
        "bounce-in": "bounce-in 0.8s ease-out",
        "glow-spin": "glow-spin 3s linear infinite",
      },
    },
  },
  plugins: [tailwindAnimate, typography],
} satisfies Config;
