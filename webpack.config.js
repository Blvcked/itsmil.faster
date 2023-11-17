const path = require("path");

const projectPaths = {
    projectJsPath: path.resolve(__dirname, "src/js"),
    projectScssPath: path.resolve(__dirname, "src/scss"),
    projectOutput: path.resolve(__dirname, "dist"),
    projectWebpack: path.resolve(__dirname, "webpack"),
};

const projectFiles = {
    browserSync: {
        enable: true,
        host: "localhost",
        port: 3000,

        mode: "proxy",
        proxy: "http://sebtheme.faster",

        // files: "**/*.php",
        // reload: true,

        // This setup provides hotswap CSS
        files: [
            "**/*.php",
            projectPaths.projectOutput + "/js/*.js",
            projectPaths.projectOutput + "/css/*.css",
        ],
        reload: false,
    },

    projectJs: {
        filename: "js/[name].js",
        entry: {
            frontend: projectPaths.projectJsPath + "/frontend.js",
            backend: projectPaths.projectJsPath + "/backend.js",
        },
        rules: {
            test: /\.js$/,
        },
    },

    projectCss: {
        postCss: projectPaths.projectWebpack + "/postcss.config.js",
        filename: "css/[name].css",
        use: "sass", // sass || postcss
        rules: {
            sass: {
                test: /\.scss$/,
            },
            postcss: {
                test: /\.pcss$/,
            },
        },
    },

    projectSourceMaps: {
        enable: false,
        env: "dev-prod",
        devtool: "source-map", // source-map || cheap-source-map
    },
};

// Merging the projectPaths & projectFiles objects
const projectOptions = {
    ...projectPaths,
    ...projectFiles,
    projectConfig: {
        // add extra options here
    },
};

// Get the development or production setup based on the script from package.json
module.exports = (env) => {
    if (env.NODE_ENV === "production") {
        return require("./webpack/production.config")(projectOptions);
    } else {
        return require("./webpack/development.config")(projectOptions);
    }
};
