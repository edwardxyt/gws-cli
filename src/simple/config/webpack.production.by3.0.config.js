const webpack = require("webpack");
const HappyPack = require("happypack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
    .BundleAnalyzerPlugin;

const path = require("path");
const debug = require("debug");
const echo = debug("compile:webpack");

// 加载全局配置文件
echo("加载配置文件");
let app_config = require(".")(path.resolve(__dirname, "../"));

let initConfig = async () => {
    // 组装部署-webpack配置
    let wbConfig = {
        entry: {
            app: ["@babel/polyfill", "whatwg-fetch", app_config.main]
        },
        mode: "production",
        output: {
            filename: "javascripts/[name].[chunkhash:5].js",
            chunkFilename: "javascripts/chunk.[name].[chunkhash:5].js",
            publicPath: app_config.cdn_path || "./", // 需要cdn 就开启
            path: `${app_config.dist}/${app_config.entry}` // /static/PROJECT/
        },
        resolve: app_config.resolve,
        externals: app_config.externals,
        devtool: app_config.debug
            ? "cheap-module-eval-source-map" // 1.09 MiB
            : "eval", // 354
        // : "cheap-eval-source-map",   //904
        // : "eval-source-map",   //952
        // : "cheap-source-map",   // fail
        // : "cheap-module-source-map", // fail
        // : "source-map", // fail
        // : "hidden-source-map", // fail
        // : "nosources-source-map", // fail
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    use: "happypack/loader?id=jsx",
                    // exclude: [app_config.node_module_dir],
                    include: [
                        app_config.src,
                        `${
                            app_config.node_module_dir
                        }/@edwardxyt/gws-components`
                    ]
                },
                {
                    test: /\.hbs/,
                    loader: "handlebars-loader",
                    options: {
                        partialDirs: [app_config.templates_dir]
                    },
                    // exclude: [app_config.node_module_dir],
                    include: [app_config.src]
                },
                {
                    test: /\.less$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: "css-loader",
                            options: {
                                // minimize: true,
                                modules: false,
                                localIdentName:
                                    "src.[name]__[local]--[hash:base64:6]"
                            }
                        },
                        "less-loader"
                    ],
                    include: [
                        app_config.src,
                        `${
                            app_config.node_module_dir
                        }/@edwardxyt/gws-components`
                    ]
                },
                {
                    test: /\.css$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: "css-loader",
                            options: {
                                // minimize: true,
                                modules: false,
                                localIdentName:
                                    "node_modules.[name]__[local]--[hash:base64:6]"
                            }
                        },
                        "postcss-loader"
                    ]
                },
                {
                    test: /\.(png|svg|jpg|gif)$/,
                    use: [
                        {
                            loader: "file-loader",
                            options: {
                                hash: "sha512",
                                name: "images/[name]-[hash:5].[ext]"
                            }
                        }
                    ],
                    // exclude: [app_config.node_module_dir],
                    include: [
                        app_config.src,
                        `${
                            app_config.node_module_dir
                        }/@edwardxyt/gws-components`
                    ]
                }
            ]
        },
        optimization: {
            minimizer: [
                new UglifyJsPlugin({
                    cache: true,
                    parallel: true, // 并行
                    sourceMap: true // set to true if you want JS source maps
                })
            ],
            splitChunks: {
                chunks: "async", //默认只作用于异步模块，为`all`时对所有模块生效,`initial`对同步模块有效
                minSize: 30000, //合并前模块文件的体积
                minChunks: 1, //最少被引用次数
                maxAsyncRequests: 5, //根据需要加载块时的最大并行请求数将小于或等于5
                maxInitialRequests: 3, //初始页面加载时的最大并行请求数将小于或等于3
                automaticNameDelimiter: "~", //自动命名连接符
                cacheGroups: {
                    //缓存组可以从 splitChunks 继承和/或覆盖任何选项
                    vendors: {
                        test: /[\\/]node_modules[\\/]/,
                        priority: -10
                    },
                    default: {
                        minChunks: 2,
                        priority: -20,
                        reuseExistingChunk: true
                    }
                }
            }
        },
        plugins: [
            // new BundleAnalyzerPlugin({
            // 	analyzerPort: 27003,
            // }),
            new webpack.DllReferencePlugin({
                manifest: path.join(
                    `${app_config.dist}/${app_config.entry}`,
                    "./javascripts/dll",
                    "manifest.json"
                )
            }),
            new HappyPack({
                id: "jsx",
                threads: 4,
                loaders: [
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
                                app_config.antd
                            ]
                        }
                    }
                ]
            }),
            new webpack.optimize.ModuleConcatenationPlugin(),
            new webpack.LoaderOptionsPlugin({minimize: true}),
            new webpack.DefinePlugin(app_config.inject),
            new OptimizeCSSAssetsPlugin(),
            new MiniCssExtractPlugin({
                filename: "styles/[name].[contenthash].css",
                chunkFilename: "styles/[id].[contenthash].css"
            }),
            new HtmlWebpackPlugin({
                filename: "index.html",
                favicon: path.resolve(app_config.entryDir, "favicon.ico"),
                minify: {
                    removeAttributeQuotes: true // 移除属性的引号
                },
                chunks: ["app"], // chunks主要用于多入口文件，当你有多个入口文件，那就会编译后生成多个打包后的文件，那么chunks 就能选择你要使用那些js文件
                template: app_config.template_path,
                COMPILED_AT: new Date().toString(),
                CONFIG: {
                    dll: true,
                    env: app_config.inject.__ENV__,
                    debug: app_config.inject.__DEBUG__,
                    api_path: app_config.inject.__API__,
                    meta: ""
                }
            })
        ]
    };

    // 启动调试工具
    if (app_config.console) {
        wbConfig.entry.app.push(app_config.console);
        echo("开启Vconsole");
    }

    // 模块策略提醒
    // 1 不使用DLL, externals库名并引入对应CDN
    // 2 使用DLL并引入dll.js文件，externals为空对象
    if (Object.keys(app_config.externals).length > 0) {
        echo("开启externals，请清除index.hbs里 dll.js的引用。并注入CDN");
    } else {
        echo("开启DLL，请引入dll.js。并删除CDN引用。");
    }

    return wbConfig;
};
module.exports = initConfig;
