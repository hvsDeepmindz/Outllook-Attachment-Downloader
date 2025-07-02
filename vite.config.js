import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "/outlook_mail_loader",
  plugins: [react(), tailwindcss()],
  server: {
    port: 8018,
    host: "0.0.0.0",
    allowedHosts: ["buddy.pharynxai.in"],
    hmr: false, // optional
  },
});
