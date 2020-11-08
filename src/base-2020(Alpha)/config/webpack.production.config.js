const webpack = require("webpack");
const HappyPack = require("happypack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
    .BundleAnalyzerPlugin;

const TerserPlugin = require("terser-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const path = require("path");
const debug = require("debug");
const echo = debug("development:webpack");
const dayjs = require('dayjs');
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

    return {
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
            ? "source-map"
            : "none",
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    use: "happypack/loader?id=jsx",
                    // exclude: [app_config.node_module_dir],
                    include: [
                        app_config.src,
                        /@edwardxyt/
                        // path.join(
                        //     app_config.node_module_dir,
                        //     "_@edwardxyt"
                        // )
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
                    test: /\.(png|svg|jpe?g|gif)$/,
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
                        /@edwardxyt/
                        // path.join(
                        //     app_config.node_module_dir,
                        //     "_@edwardxyt"
                        // )
                    ]
                }
            ]
        },
        optimization: {
            minimize: true,
            minimizer: [
                new TerserPlugin({
                    cache: true,
                    parallel: true,  // 使用多进程并发运行以提高构建速度
                    sourceMap: true, // 如果在生产环境中使用 source-maps，必须设置为 true
                    extractComments: false,  // js注释
                    terserOptions: { // 压缩配置
                        // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
                    }
                }),
                new OptimizeCssAssetsPlugin({}) // css压缩优化
            ],
            splitChunks: {
                cacheGroups: {
                    reactBase: {
                        name: 'reactBase',
                        test: (module) => {
                            return app_config.library.reactBase.test(module.context);
                        },
                        chunks: 'initial',
                        priority: 10,
                    },
                    utilBase: {
                        name: 'utilBase',
                        test: (module) => {
                            return app_config.library.utilBase.test(module.context);
                        },
                        chunks: 'initial',
                        priority: 9,
                    },
                    uiBase: {
                        name: 'uiBase',
                        test: (module) => {
                            return app_config.library.uiBase.test(module.context);
                        },
                        chunks: 'async',
                        priority: 8,
                    },
                    common: {
                        name: "common",
                        test: app_config.library.common,
                        minChunks: 1,
                        minSize: 1024,
                        chunks: "async",
                        priority: 5
                    },
                    // vendor: { // key 为entry中定义的 入口名称
                    //     name: "vendor", // 要缓存的 分隔出来的 chunk 名称
                    //     test: /[\\/]node_modules[\\/]/,
                    //     chunks: "all",
                    //     priority: 10 // 优先级
                    // },
                    // common: {
                    //     name: "common",
                    //     test: /[\\/]src[\\/]/,
                    //     minChunks: 1,
                    //     minSize: 1024,
                    //     chunks: "async",
                    //     priority: 5
                    // }
                }
            }
        },
        plugins: [
            // 打包进度条
            new ProgressBarPlugin(),

            // 打包后在.js/.css页头的时间
            // hash         :[hash]
            // chunkhash    :[chunkhash]
            // name         :[name]
            // filebase     :[filebase]
            // query        :[query]
            // file         :[file]
            new webpack.BannerPlugin({
                banner: `@Last Modified time ${dayjs().format('YYYY-MM-DD HH:mm:ss')}`
            }),

            // 图形查看编译结果
            // new BundleAnalyzerPlugin({
            //     analyzerPort: 27003
            // }),

            // 允许创建一个在编译时可以配置的全局常量
            new webpack.DefinePlugin(app_config.inject),

            // 拷贝文件到目录
            new CopyPlugin({
                patterns: [
                    { from: path.join(app_config.entryDir, "README.md"), to: path.join(app_config.dist, app_config.entry) }
                ],
            }),

            // 多进程编译
            new HappyPack({
                id: "jsx",
                threads: 5,
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
                    removeComments: true, // html注释
                    collapseWhitespace: true,
                    minifyJS: true,
                    minifyCSS: true,
                    removeAttributeQuotes: true // 移除属性的引号
                },
                template: app_config.template_path,
                config: {
                    COMPILED_AT: dayjs().format('YYYY-MM-DD HH:mm:ss'),
                    env: app_config.inject.__ENV__,
                    debug: app_config.inject.__DEBUG__,
                    api_path: app_config.inject.__API__,
                    meta: ""
                }
            })
        ]
    }
};
