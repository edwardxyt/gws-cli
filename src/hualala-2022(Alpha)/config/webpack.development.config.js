const webpack = require("webpack");
const path = require("path");
const detect = require("detect-port");
const dayjs = require('dayjs');
const debug = require("debug");
const echo = debug("development:webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

// 加载全局配置文件
echo("加载全局文件");

let rootDir = path.resolve(__dirname, "../");
let app_config = require(".")(rootDir);

module.exports = async () => {
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
            publicPath: '/',
            filename: 'scripts/[name].js',
            path: `${app_config.dist}/${app_config.entry}`
        },
        devtool: 'inline-source-map',
        mode: "development",
        resolve: app_config.resolve,
        externals: app_config.externals,
        module: {
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
                {
                    test: /\.ejs$/,
                    loader: 'ejs-loader',
                    options: {
                        esModule: false
                    }
                }
            ]
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin(),
            // 允许创建一个在编译时可以配置的全局常量
            new webpack.DefinePlugin(app_config.inject),
            // 使用模板引擎生成html
            new HtmlWebpackPlugin({
                title: '生成的HTML文档的标题',
                filename: "index.html",
                template: app_config.template_path,
                templateParameters: {
                    'foo': 'bar',
                    COMPILED_AT: dayjs().format('YYYY-MM-DD HH:mm:ss'),
                    env: app_config.inject.__ENV__,
                    debug: app_config.inject.__DEBUG__,
                    api_path: app_config.inject.__API__,
                    meta: ""
                },
                minify: {
                    // 压缩 HTML 文件
                    removeComments: true, // 移除 HTML 中的注释
                    collapseWhitespace: true, // 删除空白符与换行符
                    minifyCSS: true, // 压缩内联 css
                },
                inject: true, // true或'body'所有javascript资源都将放置在body元素的底部
                // favicon: path.resolve('public/favicon.ico'),
                chunks: ['app'], // entry中的 app 入口才会被打包
            }),
        ],
        devServer: {
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            contentBase: app_config.dist,  // 告诉服务器内容的来源。仅在需要提供静态文件时才进行配置。
            stats: "minimal",  // 只在发生错误或新的编译开始时输出
            // allowedHosts: [], // 该选项允许将允许访问开发服务器的服务列入白名单。
            compress: true,  // 启用http compression(gzip)进行数据压缩传输
            port: app_config.devServer.port,
            host: app_config.IP,
            server: 'http',
            open: true,
            hot: true,
            inline: true,
            disableHostCheck: true,
            overlay: {
                warnings: true,
                errors: true,  // 当出现编译错误或警告时，在浏览器中显示全屏覆盖。
            },
            historyApiFallback: {
                rewrites: [
                    { from: /^\/mobile/, to: '/mobile.html' },
                    { from: /^\/web/, to: '/home.html' },
                ],
            },
            proxy: {
                '/api': {
                    target: 'http://localhost:3000',
                    pathRewrite: { '^/api': '' },
                },
            },
        },
    }
};
