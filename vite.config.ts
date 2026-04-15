import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import PluginPrerender from "vite-plugin-prerender";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    ...(mode === 'production' ? [
      PluginPrerender({
        staticDir: path.join(__dirname, 'dist'),
        routes: [
          '/',
          '/pdlc',
          '/led-display',
          '/dj-club-solutions',
          '/smart-automation',
          '/collaboration-av',
          '/solar-solutions',
          '/blog',
          '/smart-film-dubai',
          '/smart-film-for-offices-uae',
          '/pdlc-faq',
          '/case-study-difc'
        ],
      })
    ] : [])
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
