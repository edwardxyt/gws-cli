const webpack = require("webpack");
const path = require("path");
const detect = require("detect-port");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
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

    return {
        entry: {
            app: [...app_config.main]
        },
        output: {
            filename: "bundle.js",
            path: app_config.dist
        },
        mode: "development",
        devtool: "eval-source-map",  //inline-source-map
        resolve: app_config.resolve,
        devServer: {
            headers: {
                'X-Custom-Foo': 'bar'
            },
            overlay: { // 出现编译器错误或警告时，在浏览器中显示全屏覆盖。
                warnings: true,
                errors: true
            },
            open: true,
            inline: true,  // 将在 bundle 中插入脚本以进行实时重新加载，并且构建消息将出现在浏览器控制台中。
            hot: true,  // 要完全启用 HMR，需要 webpack.HotModuleReplacementPlugin。
            stats: "minimal",  // 只在发生错误或新的编译开始时输出
            contentBase: app_config.dist,  // 告诉服务器内容的来源。仅在需要提供静态文件时才进行配置。
            compress: true,  // 为每个静态文件开启 gzip compression
            port: app_config.devServer.port,
            host: app_config.IP,
            disableHostCheck: true, // 当将此项配置设置为 true 时，将会跳过 host 检查. 这是不推荐的 因为不检查host的应用容易受到DNS重新绑定攻击。
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
                                plugins: app_config.babelBasicPlugins.concat(
                                    app_config.babelDevPlugins
                                )
                            }
                        }
                    ],
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
                        "style-loader",
                        "css-loader",
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
                    test: /\.(png|svg|jpe?g|gif)$/,
                    use: [
                        {
                            loader: 'file-loader',
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
