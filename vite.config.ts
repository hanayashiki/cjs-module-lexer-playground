import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { svgPlugin } from "vite-plugin-fast-react-svg";

// https://vitejs.dev/config/
export default defineConfig((env) => ({
  server: {
    strictPort: true,
  },
  plugins: [
    react({
      babel: {
        parserOpts: {
          plugins: ["decorators-legacy"],
        },
      },
    }),
    svgPlugin(),
    tsconfigPaths(),
  ],
}));
