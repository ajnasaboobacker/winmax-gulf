import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import prerender from '@prerenderer/rollup-plugin';
import { fileURLToPath } from "node:url";

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
      prerender({
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
        renderer: '@prerenderer/renderer-puppeteer',
        rendererOptions: {
          renderAfterTime: 5000,
          headless: true,
          args: ['--no-sandbox', '--disable-setuid-sandbox']
        },
        postProcess(renderedRoute) {
          // Clean up the HTML if needed
          renderedRoute.html = renderedRoute.html.replace(
            /http:\/\/localhost:8080/g,
            'https://winmaxgulf.com'
          );
        },
      })
    ] : [])
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
