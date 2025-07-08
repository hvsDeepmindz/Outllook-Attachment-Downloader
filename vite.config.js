// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import tailwindcss from "@tailwindcss/vite";

// export default defineConfig({
//   base: "/outlook_mail_loader",
//   plugins: [react(), tailwindcss()],
//   server: {
//     port: 8018,
//     host: "0.0.0.0",
//     allowedHosts: ["buddy.pharynxai.in"],
//     hmr: false, // optional
//   },
// });





import { defineConfig , loadEnv} from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  console.log("MODE:", mode);
  let env = loadEnv(mode,process.cwd(), '');
  console.log("PORT:", env, "\nBASE:", env.VITE_BASE_PATH);

  return {
    // define: {
    //   ...env
    // },
    plugins: [react(),tailwindcss()],
    base: `${env.VITE_BASE_PATH != "" ? `/${env.VITE_BASE_PATH}` : ""}`,
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      port: env.PORT ? parseInt(env.PORT) : 3000,
    },
  };
});
