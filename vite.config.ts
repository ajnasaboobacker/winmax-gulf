import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { createRequire } from 'node:module';
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const PluginPrerender = require("vite-plugin-prerender");

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
          '/smart-film-for-villas-uae',
          '/smart-film-cost-uae',
          '/switchable-privacy-glass-dubai',
          '/smart-film-for-meeting-rooms',
          '/pdlc-vs-smart-glass',
          '/smart-film-automation',
          '/pdlc-faq',
          '/case-study-difc',
          '/case-study-royal-villa'
        ],
        renderer: new PluginPrerender.PuppeteerRenderer({
          renderAfterTime: 5000,
          headless: true,
          args: ['--no-sandbox', '--disable-setuid-sandbox']
        }),
      })
    ] : [])
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
