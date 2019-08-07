const webpack = require("webpack");
const path = require("path");
const debug = require("debug");
const echo = debug("compile:webpack-vendor");
const log = console.log;

// 加载全局配置文件
echo("加载全局文件");
let rootDir = path.resolve(__dirname, "../");
let app_config = require(".")(rootDir);

module.exports = async () => {
    // log(app_config);

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                entry: {
                    vendor: app_config.library
                },
                output: {
                    path: `${app_config.dist}/${app_config.entry}/static/dll`,
                    filename: "MyDll.[name].js",
                    library: "[name]_[hash]"
                },
                resolve: app_config.resolve,
                plugins: [
                    new webpack.DllPlugin({
                        path: path.join(
                            app_config.dist,
                            app_config.entry,
                            "static",
                            "dll",
                            "[name]-manifest.json"
                        ),
                        name: "[name]_[hash]"
                    })
                ]
            });
        }, 0);
    });
};
