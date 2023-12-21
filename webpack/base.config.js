const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BrowserSyncPlugin = require("browser-sync-webpack-plugin");
const WebpackBar = require("webpackbar");

module.exports = (projectOptions) => {
    const jsRules = {
        test: projectOptions.projectJs.rules.test,
        include: projectOptions.projectJsPath,
        exclude: /(node_modules|bower_components|vendor)/,
        use: {
            loader: "babel-loader",
            options: {
                cacheDirectory: true,
                presets: ["@babel/preset-env", "@babel/preset-react"],
            },
        },
    };

    const cssRules = {
        test:
            projectOptions.projectCss.use === "sass"
                ? projectOptions.projectCss.rules.sass.test
                : projectOptions.projectCss.rules.postcss.test,
        // exclude: /(node_modules|bower_components|vendor)/,
        use: [
            MiniCssExtractPlugin.loader,
            "css-loader",
            {
                loader: "postcss-loader",
                options: {
                    postcssOptions: require(projectOptions.projectCss.postCss)(
                        projectOptions
                    ),
                },
            },
        ],
    };
    if (projectOptions.projectCss.use === "sass") {
        cssRules.use.push({
            loader: "sass-loader",
        });
    }

    const optimizationRules = {};

    /**
     * Plugins
     */
    const plugins = [
        new WebpackBar({ reporters: ["profile"], profile: true }),
        new MiniCssExtractPlugin({
            filename: projectOptions.projectCss.filename,
        }),
    ];

    // Add Browsersync to plugins if enabled
    if (projectOptions.browserSync.enable === true) {
        const browserSyncOptions = {
            files: projectOptions.browserSync.files,
            host: projectOptions.browserSync.host,
            port: projectOptions.browserSync.port,
            proxy: projectOptions.browserSync.proxy,
        };
        plugins.push(
            new BrowserSyncPlugin(browserSyncOptions, {
                reload: projectOptions.browserSync.reload,
            })
        );
    }

    return {
        jsRules: jsRules,
        cssRules: cssRules,
        optimizations: optimizationRules,
        plugins: plugins,
    };
};
