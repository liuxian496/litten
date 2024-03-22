import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import { resolve } from "path";
// import { visualizer } from "rollup-plugin-visualizer";

// https://vitejs.dev/config/
export default defineConfig({
    build: {
        copyPublicDir: false,
        lib: {
            entry: resolve(__dirname, "src/index.ts"),
            name: "litten",
            formats: ["es", "cjs"],
            fileName: "index",
        },
        outDir: "build",
        rollupOptions: {
            external: ["react", "react-dom","react/jsx-runtime"],
            output: {
                assetFileNames: `index.[ext]`,
            },
        },
    },
    plugins: [
        react(),
        dts({
            outDir: "build/types",
        }),
        // visualizer(),
    ],
});
