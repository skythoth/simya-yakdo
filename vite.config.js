import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const serviceKey = env.SAFETYDATA_SERVICE_KEY || env.VITE_SERVICE_KEY;

  return {
    plugins: [react()],
    server: {
      proxy: {
        "/api/safetydata": {
          target: "https://www.safetydata.go.kr",
          changeOrigin: true,
          rewrite: (path) => {
            const rewrittenPath = path.replace(
              "/api/safetydata",
              "/safetydata-api/V2/api",
            );
            const url = new URL(`http://localhost${rewrittenPath}`);

            if (serviceKey) {
              url.searchParams.set("serviceKey", serviceKey);
            }

            return `${url.pathname}${url.search}`;
          },
        },
      },
    },
  };
});
