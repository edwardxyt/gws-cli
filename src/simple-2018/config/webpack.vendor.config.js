const webpack = require("webpack");
const path = require("path");
const debug = require("debug");
const echo = debug("compile:webpack-vendor");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

// 加载全局配置文件
echo("加载配置文件");
let app_config = require(".")(path.resolve(__dirname, "../"));

module.exports = function(CONFIG = {}) {
    return new Promise(function(resolve, reject) {
        resolve({
            entry: {
                vendor: app_config.library
            },
            output: {
                path: `${app_config.dist}/${app_config.entry}`, // /static/PROJECT/
                filename: "javascripts/dll/[name]_dll.js",
                library: "_dll_[name]"
            },
            resolve: app_config.resolve,
            optimization: {
                minimizer: [
                    new UglifyJsPlugin({
                        cache: true,
                        parallel: true, // 并行
                        // sourceMap: true // set to true if you want JS source maps
                    })
                ]
            },
            plugins: [
                new webpack.DllPlugin({
                    path: path.join(
                        `${app_config.dist}/${app_config.entry}`,
                        "./javascripts/dll",
                        "manifest.json"
                    ),
                    name: "_dll_[name]"
                })
            ]
        });
    });
};
