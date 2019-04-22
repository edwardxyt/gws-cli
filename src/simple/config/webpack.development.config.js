const webpack = require("webpack");
const path = require("path");
const detect = require("detect-port");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const debug = require("debug");
const echo = debug("development:webpack");
const R = require("ramda");

// 加载全局配置文件
echo("加载全局文件");
let app_config = require(".")(path.resolve(__dirname, "../"));

// 加载本地配置文件 给我自己使用的
let settings = {};
try {
    settings = require("./localhost.settings.js");
    echo("加载本地应用配置。");
    echo("合并本地应用配置。");
} catch (e) {
    echo("无本地应用配置文件可用！");
}
// 合并本地与全局
const CONSTANTS = R.mergeDeepRight(app_config, settings);

let initConfig = async () => {
    // 组装开发-webpack配置
    let wbConfig = {
        entry: ["@babel/polyfill", "whatwg-fetch", CONSTANTS.main],
        mode: "development",
        output: {
            filename: "bundle.js",
            publicPath: CONSTANTS.cdn_path,
            path: CONSTANTS.dist
        },
        resolve: CONSTANTS.resolve,
        devtool: "cheap-module-eval-source-map",
        devServer: {
            // fake数据使用，如果接口是跨域的 这也可以使用
            // proxy: CONSTANTS.devServer.proxy,
            overlay: {
                warnings: true,
                errors: true
            },
            open: true,
            inline: true,
            hot: true,
            stats: "minimal",
            contentBase: CONSTANTS.dist,
            compress: true,
            port: CONSTANTS.devServer.port,
            host: CONSTANTS.IP,
            disableHostCheck: true,
            historyApiFallback: true
        },
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    use: [
                        {
                            loader: "babel-loader",
                            options: {
                                presets: [
                                    [
                                        "@babel/preset-env",
                                        {
                                            "targets": {
                                                "esmodules": true
                                            }
                                        }
                                    ],
                                    '@babel/preset-react'
                                ],
                                plugins: [
                                    ["@babel/plugin-proposal-decorators", { "legacy": true }],
                                    ["@babel/plugin-proposal-class-properties", { "loose" : true }],
                                    "@babel/plugin-transform-runtime",
                                    "@babel/plugin-syntax-dynamic-import",
                                    CONSTANTS.antd
                                ]
                            }
                        }
                    ],
                    // exclude: [CONSTANTS.node_module_dir],
                    include: [CONSTANTS.src, `${CONSTANTS.node_module_dir}/@edwardxyt/gws-components`]
                },
                {
                    test: /\.hbs/,
                    loader: "handlebars-loader",
                    options: {
                        partialDirs: [CONSTANTS.templates_dir]
                    },
                    exclude: [CONSTANTS.node_module_dir],
                    include: [CONSTANTS.src]
                },
                {
                    test: /\.less$/,
                    use: [
                        {
                            loader: "style-loader",
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: "css-loader",
                            options: {
                                sourceMap: true,
                                modules: false,
                                localIdentName:
                                    "[name]__[local]--[hash:base64:6]"
                            }
                        },
                        "less-loader"
                    ],
                    include: [CONSTANTS.src]
                },
                {
                    test: /\.css$/,
                    use: [
                        {
                            loader: "style-loader",
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: "css-loader",
                            options: {
                                sourceMap: true,
                                modules: true,
                                localIdentName:
                                    "[name]__[local]--[hash:base64:6]"
                            }
                        },
                        // {
                        //     loader: "resolve-url-loader",
                        //     options: {
                        //         debug: true
                        //     }
                        // },
                        {
                            loader: "postcss-loader",
                            options: {
                                sourceMap: true
                            }
                        }
                    ],
                    include: [CONSTANTS.src]
                },
                {
                    test: /\.css$/,
                    use: [
                        {
                            loader: "style-loader",
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: "css-loader",
                            options: {
                                sourceMap: true,
                                modules: false,
                                localIdentName:
                                    "[name]__[local]--[hash:base64:6]"
                            }
                        },
                        {
                            loader: "postcss-loader",
                            options: {
                                sourceMap: true
                            }
                        }
                    ],
                    include: [CONSTANTS.node_module_dir]
                },
                {
                    test: /\.(png|svg|jpg|gif)$/,
                    use: [
                        {
                            loader: "file-loader",
                            options: {
                                hash: "sha512",
                                digest: "hex",
                                name: "images/[name]-[hash:8].[ext]"
                            }
                        }
                    ],
                    exclude: [CONSTANTS.node_module_dir],
                    include: [CONSTANTS.src]
                }
            ]
        },
        plugins: [
            // 热启动
            new webpack.HotModuleReplacementPlugin(),
            new webpack.DefinePlugin(CONSTANTS.inject),
            new HtmlWebpackPlugin({
                filename: "index.html",
                template: CONSTANTS.template_path,
                COMPILED_AT: new Date().toString(),
                CONFIG: {
                    dll: false,
                    env: CONSTANTS.inject.__ENV__,
                    debug: CONSTANTS.inject.__DEBUG__,
                    api_path: CONSTANTS.inject.__API__,
                    meta: ""
                }
            }),
            new webpack.NamedModulesPlugin()
        ]
    };

    // 启动调试工具
    if (CONSTANTS.console) {
        wbConfig.entry.push(CONSTANTS.console);
    }

    // 启动代码优化
    if (CONSTANTS.eslint) {
        wbConfig.module.rules[0].use.push({ loader: "eslint-loader" });
    }

    // 端口监测
    const port = CONSTANTS.devServer.port;
    const _port = await detect(port);
    if (port == _port) {
        echo(`端口号: ${port} 没有被占用，放心使用。`);
        echo("启动webpack-dev-server");
        echo(`服务器运行在 http://${CONSTANTS.IP}:${port}`);
    } else {
        wbConfig.devServer.port = _port;
        echo(`端口号: ${port} 已占用, 尝试使用端口号: ${_port}！`);
        echo("启动webpack-dev-server");
        echo(`服务器运行在 http://${CONSTANTS.IP}:${_port}`);
    }

    return wbConfig;
};

module.exports = initConfig;
