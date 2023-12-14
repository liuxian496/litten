import type { AddonOptionsBabel } from "@storybook/addon-coverage";
import type { StorybookConfig } from "@storybook/react-webpack5";

const coverageConfig: AddonOptionsBabel = {
    istanbul: {
        include: ["**"],
        exclude: ["**/src/test/**"],
        excludeNodeModules: true,
    },
};

const config: StorybookConfig = {
    stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
    addons: [
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "@storybook/addon-interactions",
        {
            name: "@storybook/preset-create-react-app",
            options: {
                craOverrides: {
                    fileLoaderExcludes: ["less"],
                },
            },
        },
        {
            name: "@storybook/addon-coverage",
            options: {
                ...coverageConfig,
            },
        },
        {
            name: "@storybook/addon-styling",
            options: {
                less: {
                    // Require your Less preprocessor here
                    implementation: require("less"),
                },
            },
        },
    ],
    framework: {
        name: "@storybook/react-webpack5",
        options: {},
    },
    docs: {
        autodocs: "tag",
    },
    staticDirs: ["../public"],
};
export default config;
