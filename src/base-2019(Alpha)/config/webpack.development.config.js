const webpack = require("webpack");
const path = require("path");
const detect = require("detect-port");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
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

    {
        // 端口监测
        const port = app_config.devServer.port;
        const _port = await detect(port);
        if (port == _port) {
            echo(`端口号: ${port} 没有被占用，放心使用。`);
            echo("启动webpack-dev-server");
            echo(`服务器运行在 http://${app_config.IP}:${port}`);
        } else {
            app_config.devServer.port = _port;
            echo(`端口号: ${port} 已占用, 尝试使用端口号: ${_port}！`);
            echo("启动webpack-dev-server");
            echo(`服务器运行在 http://${app_config.IP}:${_port}`);
        }
    }

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({
                entry: [...app_config.main],
                output: {
                    filename: "bundle.js",
                    path: app_config.dist
                },
                mode: "development",
                devtool: "eval-source-map",
                resolve: app_config.resolve,
                devServer: {
                    overlay: {
                        warnings: true,
                        errors: true
                    },
                    open: true,
                    inline: true,
                    hot: true,
                    stats: "minimal",
                    contentBase: app_config.dist,
                    compress: true,
                    port: app_config.devServer.port,
                    host: app_config.IP,
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
                                            "@babel/preset-env",
                                            "@babel/preset-react"
                                        ],
                                        plugins: app_config.babelBasicPlugins
                                    }
                                }
                            ],
                            // exclude: [app_config.node_module_dir],
                            include: [
                                app_config.src,
                                path.join(
                                    app_config.node_module_dir,
                                    "@edwardxyt",
                                    "gws-components"
                                ),
                                path.join(
                                    app_config.node_module_dir,
                                    "@edwardxyt",
                                    "gws-javascripts"
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
                                {
                                    loader: "style-loader",
                                    options: {
                                        sourceMap: true
                                    }
                                },
                                {
                                    loader: "css-loader",
                                    options: {
                                        sourceMap: true
                                    }
                                },
                                {
                                    loader: "postcss-loader",
                                    options: {
                                        sourceMap: true
                                    }
                                },
                                {
                                    loader: "less-loader", // 放在后面的先被解析
                                    options: {
                                        sourceMap: true,
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
                                        name: "images/[name]-[hash:8].[ext]"
                                    }
                                }
                            ],
                            // exclude: [CONSTANTS.node_module_dir],
                            include: [
                                app_config.src,
                                path.join(
                                    app_config.node_module_dir,
                                    "@edwardxyt",
                                    "gws-components"
                                )
                            ]
                        }
                    ]
                },
                plugins: [
                    new CleanWebpackPlugin(),
                    // 模块热替换插件
                    new webpack.HotModuleReplacementPlugin(),
                    // 允许创建一个在编译时可以配置的全局常量
                    new webpack.DefinePlugin(app_config.inject),
                    // 使用模板引擎生成html
                    new HtmlWebpackPlugin({
                        filename: "index.html",
                        template: app_config.template_path,
                        config: {
                            COMPILED_AT: new Date().toString(),
                            env: app_config.inject.__ENV__,
                            debug: app_config.inject.__DEBUG__,
                            api_path: app_config.inject.__API__,
                            meta: ""
                        }
                    }),
                    // 当开启 HMR 的时候使用该插件会显示模块的相对路径，建议用于开发环境。
                    new webpack.NamedModulesPlugin()
                ]
            });
        }, 0);
    });
};
