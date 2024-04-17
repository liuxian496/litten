import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import { visualizer } from "rollup-plugin-visualizer";
// import { libInjectCss } from "vite-plugin-lib-inject-css";

const components = [
    "button",
    "checkbox",
    "form",
    "formControl",
    "formLabel",
    "useForm",
    "iconButton",
    "loading",
    "popup",
    "radio",
    "radioGroup",
    "slider",
    "stackPanel",
    "summary",
    "switch",
    "textField",
];

function getComponentsEntry(components: string[]) {
    const value: any = {};
    components.map((component) => {
        value[component] = `src/${component}.ts`;
    });
    return value;
}

// https://vitejs.dev/config/
export default defineConfig({
    build: {
        copyPublicDir: false,
        cssCodeSplit: true,
        lib: {
            entry: {
                index: "src/index.ts",
                ...getComponentsEntry(components),
            },
            name: "litten",
            fileName: "index",
        },
        outDir: "build",
        rollupOptions: {
            external: ["react", "react-dom", "react/jsx-runtime"],
            output: [
                {
                    format: "es",
                    manualChunks: (id: string) => {
                        if (id.includes("node_modules")) {
                            if (id.includes("classnames")) {
                                return "classnames";
                            }
                            if (id.includes("lodash")) {
                                return "lodash";
                            }
                            if (id.includes("number-precision")) {
                                return "number-precision";
                            }
                            return "vender";
                        }

                        if (id.includes("components/ripple")) {
                            return "ripple";
                        }

                        if (id.includes("components/buttonBase")) {
                            return "buttonBase";
                        }

                        if (id.includes("components/icon")) {
                            return "icon";
                        }

                        if (id.includes("components/control")) {
                            return id
                                .split("components/control/")[1]
                                .split(".")[0];
                        }

                        if (id.includes("global")) {
                            return id.split("global/")[1].split(".")[0];
                        }
                    },
                    chunkFileNames: "chunks/[name].[hash].js",
                    assetFileNames: "assets/[name][extname]",
                    entryFileNames: "[name].js",
                },
            ],
        },
    },
    plugins: [
        react(),
        // libInjectCss(),
        dts(),
        visualizer(),
    ],
});
