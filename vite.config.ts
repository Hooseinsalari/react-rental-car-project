// vite.config.ts
import { VitePWA } from "vite-plugin-pwa";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: [
        "maskable.png",
        "favicon.ico",
        "robots.txt",
        "apple-touch-icon.png",
        "logo144.png",
        "logo192.png",
        "logo256.png",
        "logo384.png",
        "logo512.png",
      ],
      manifest: {
        name: "Morent",
        short_name: "Morent",
        theme_color: "#2196f3",
        icons: [
          {
            src: "maskable.png",
            sizes: "196x196",
            type: "image/png",
            purpose: "any maskable",
          },
          {
            src: "logo144.png",
            sizes: "144x144",
            type: "image/png",
          },
          {
            src: "logo192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "logo256.png",
            sizes: "256x256",
            type: "image/png",
          },
          {
            src: "logo384.png",
            sizes: "384x384",
            type: "image/png",
          },
          {
            src: "logo512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
        ],
      },
    }),
  ],
});
