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
            path: `${app_config.dist}/${app_config.entry}`,
            chunkFilename: 'scripts/[name].[chunkhash].js'
        },
        target: 'web',  // 配置 package.json 的 browserslist 字段会导致 webpack-dev-server 的热更新功能直接失效，为了避免这种情况需要给 webpack 配上 target 属性
        devtool: 'inline-source-map',  // cheap-module-source-map
        mode: "development",
        resolve: app_config.resolve,
        // externals: app_config.externals, // 注意抽包的类库不可以在此包含
        optimization:{
            splitChunks:{
                cacheGroups: {
                    vendor: {
                        test: /[\\/]node_modules[\\/](react|react-dom|lodash)[\\/]/,
                        name: 'vendor',
                        chunks: 'all',
                    },
                },
            }
        },
        module: {
            rules: [
                // {
                //     test: /\.tsx?$/,
                //     use: 'ts-loader',
                //     exclude: /node_modules/,
                // },
                {
                    test: /\.(tsx?|jsx|js)$/,
                    loader: 'babel-loader',
                    options: { cacheDirectory: true },
                    exclude: /node_modules/,
                },
                {
                    test: /\.ejs$/,
                    loader: 'ejs-loader',
                    options: {
                        esModule: false
                    }
                },
                {
                    test: /\.(le|c)ss$/,
                    use: [
                        {
                            loader: "style-loader",
                        },
                        {
                            loader: "css-loader",
                        },
                        {
                            loader: "less-loader",
                            options: {
                                lessOptions: {
                                    strictMath: true,
                                },
                            },
                        },
                        {
                            loader: "postcss-loader",
                            options: {
                                postcssOptions: {
                                    plugins: [
                                        [
                                            "postcss-preset-env",
                                        ],
                                    ],
                                },
                            },
                        },
                    ],
                },
                {
                    test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2|jpeg)$/,
                    use: {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                        },
                    },
                },
            ],
        },
        plugins: [
            // 实际上只开启 hot：true 就会自动识别有无声明该插件，没有则自动引入，但是怕有隐藏问题这里还是手动加上了
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
                chunks: ['vendors', 'app'], // entry中的 app 入口才会被打包
            }),
        ],
        devServer: {
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
            // allowedHosts: [], // 该选项允许将允许访问开发服务器的服务列入白名单。
            compress: true,  // 启用http compression(gzip)进行数据压缩传输
            port: app_config.devServer.port,
            host: app_config.IP,
            open: true,
            hot: true,
            client: {
                progress: true,
                overlay: {// 当出现编译错误或警告时，在浏览器中显示全屏覆盖。
                    errors: true,
                    warnings: false,
                },
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