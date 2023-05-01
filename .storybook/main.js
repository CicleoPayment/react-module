const path = require("path")
const webpack = require("webpack")

module.exports = {
    stories: [
        "../src/**/*.stories.mdx",
        "../src/**/*.stories.@(js|jsx|ts|tsx)",
    ],
    addons: [
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "@storybook/addon-interactions",
        {
            name: "@storybook/addon-postcss",
            options: {
                postcssLoaderOptions: {
                    implementation: require("postcss"),
                },
            },
        },
    ],
    webpackFinal: async (config, { configType }) => {
        config.resolve.alias = {
            ...config.resolve.alias,
            "@assets": path.resolve(__dirname, "./../src/assets"),
            "@context": path.resolve(__dirname, "./../src/context"),
        };

        config.plugins.push(
            new webpack.ProvidePlugin({
                Buffer: ['buffer', 'Buffer'],
            })
        );

        return config;
    },
    framework: "@storybook/react",
    core: {
        builder: 'webpack5',
    },
   
};
