const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const debug = require("debug");
const echo = debug("development:webpack");
const R = require("ramda");

// 加载全局配置文件
echo("加载配置文件");
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
            path: CONSTANTS.temp
        },
        devtool: "#cheap-module-eval-source-map",
        watch: true,
        resolve: CONSTANTS.resolve,
        watchOptions: {
            ignored: /node_modules/,
            aggregateTimeout: 300,
            poll: undefined // 每秒检查一次变动
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
                                            targets: {
                                                esmodules: true
                                            }
                                        }
                                    ],
                                    "@babel/preset-react"
                                ],
                                plugins: [
                                    [
                                        "@babel/plugin-proposal-decorators",
                                        {legacy: true}
                                    ],
                                    [
                                        "@babel/plugin-proposal-class-properties",
                                        {loose: true}
                                    ],
                                    "@babel/plugin-transform-runtime",
                                    "@babel/plugin-syntax-dynamic-import",
                                    "@babel/plugin-transform-arrow-functions",
                                    CONSTANTS.antd
                                ]
                            }
                        }
                    ],
                    // exclude: [CONSTANTS.node_module_dir],
                    include: [
                        CONSTANTS.src,
                        `${CONSTANTS.node_module_dir}/@edwardxyt/gws-components`
                    ]
                },
                {
                    test: /\.hbs/,
                    loader: "handlebars-loader",
                    options: {
                        partialDirs: [CONSTANTS.templates_dir]
                    },
                    // exclude: [CONSTANTS.node_module_dir],
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
                    include: [
                        CONSTANTS.src,
                        `${CONSTANTS.node_module_dir}/@edwardxyt/gws-components`
                    ]
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
                    ]
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
                    // exclude: [CONSTANTS.node_module_dir],
                    include: [
                        CONSTANTS.src,
                        `${CONSTANTS.node_module_dir}/@edwardxyt/gws-components`
                    ]
                }
            ]
        },
        plugins: [
            //这些变量不必再import了
            new webpack.ProvidePlugin({
                React: "react",
                ReactDOM: "react-dom",
                Component: ["react", "Component"] // 导出react模块中的Component
            }),
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
            })
        ]
    };

    // 启动调试工具
    if (CONSTANTS.console) {
        wbConfig.entry.push(CONSTANTS.console);
    }

    // 启动代码优化
    if (CONSTANTS.eslint) {
        wbConfig.module.rules[0].use.push({loader: "eslint-loader"});
    }

    return wbConfig;
};

module.exports = initConfig;
