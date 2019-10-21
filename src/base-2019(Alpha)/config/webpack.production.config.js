const webpack = require("webpack");
const HappyPack = require("happypack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
    .BundleAnalyzerPlugin;

const TerserPlugin = require("terser-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const path = require("path");
const debug = require("debug");
const echo = debug("development:webpack");
const log = console.log;

// 加载全局配置文件
echo("加载全局文件");
let rootDir = path.resolve(__dirname, "../");
let app_config = require(".")(rootDir);

module.exports = async () => {
    {
        // 启动调试工具
        if (app_config.console) {
            app_config.main.push(app_config.console);
            echo("开启Vconsole");
        }
    }

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                entry: {
                    app: [...app_config.main]
                },
                output: {
                    filename: "static/js/[name].[chunkhash:5].js",
                    chunkFilename: "static/js/chunk.[name].[chunkhash:5].js",
                    publicPath: app_config.cdn_path || "./", // 需要cdn 就开启
                    path: `${app_config.dist}/${app_config.entry}` // /static/PROJECT/
                },
                mode: "production",
                resolve: app_config.resolve,
                // externals: app_config.externals,
                devtool: app_config.debug
                    ? "cheap-module-eval-source-map"
                    : false,
                module: {
                    rules: [
                        {
                            test: /\.(js|jsx)$/,
                            use: "happypack/loader?id=jsx",
                            // exclude: [app_config.node_module_dir],
                            include: [
                                app_config.src,
                                path.join(
                                    app_config.node_module_dir,
                                    "_@edwardxyt"
                                )
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
                            test: /\.(le|c)ss$/,
                            use: [
                                MiniCssExtractPlugin.loader,
                                {
                                    loader: "css-loader"
                                },
                                {
                                    loader: "postcss-loader"
                                },
                                {
                                    loader: "less-loader", // 放在后面的先被解析
                                    options: {
                                        javascriptEnabled: true
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
                                        name:
                                            "static/images/[name]-[hash:8].[ext]"
                                    }
                                }
                            ],
                            // exclude: [CONSTANTS.node_module_dir],
                            include: [
                                app_config.src,
                                path.join(
                                    app_config.node_module_dir,
                                    "_@edwardxyt"
                                )
                            ]
                        }
                    ]
                },
                optimization: {
                    minimizer: [
                        new TerserPlugin(),
                        new OptimizeCssAssetsPlugin({})
                    ]
                },
                plugins: [
                    // 图形查看编译结果
                    // new BundleAnalyzerPlugin({
                    //     analyzerPort: 27003
                    // }),
                    // 允许创建一个在编译时可以配置的全局常量
                    new webpack.DefinePlugin(app_config.inject),
                    // 打包后在.js/.css页头的时间
                    new webpack.BannerPlugin(`xs build at ${Date.now()}`),
                    // 拷贝文件到目录
                    new CopyPlugin([
                        {
                            from: path.join(app_config.entryDir, "README.md"),
                            to: path.join(app_config.dist, app_config.entry)
                        }
                    ]),
                    // 多进程编译
                    new HappyPack({
                        id: "jsx",
                        loaders: [
                            {
                                loader: "babel-loader",
                                options: {
                                    presets: [
                                        "@babel/preset-env",
                                        "@babel/preset-react"
                                    ],
                                    plugins: app_config.debug
                                        ? app_config.babelBasicPlugins
                                        : app_config.babelBasicPlugins.concat(
                                              app_config.babelMinifyPlugins
                                          )
                                }
                            }
                        ]
                    }),
                    // 提取css到文件
                    new MiniCssExtractPlugin({
                        filename: "static/css/[name].[hash:5].css",
                        chunkFilename: "static/css/chunk.[id].[hash:5].css"
                    }),
                    // 使用模板引擎生成html
                    new HtmlWebpackPlugin({
                        filename: "index.html",
                        favicon: path.resolve(
                            app_config.entryDir,
                            "favicon.ico"
                        ),
                        minify: {
                            removeAttributeQuotes: true // 移除属性的引号
                        },
                        chunks: ["app"], // chunks主要用于多入口文件，当你有多个入口文件，那就会编译后生成多个打包后的文件，那么chunks 就能选择你要使用那些js文件
                        template: app_config.template_path,
                        config: {
                            COMPILED_AT: new Date().toString(),
                            env: app_config.inject.__ENV__,
                            debug: app_config.inject.__DEBUG__,
                            api_path: app_config.inject.__API__,
                            meta: ""
                        }
                    })
                ]
            });
        }, 0);
    });
};
