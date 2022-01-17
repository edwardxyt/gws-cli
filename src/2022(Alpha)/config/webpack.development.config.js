const webpack = require("webpack");
const path = require("path");
const detect = require("detect-port");
const dayjs = require('dayjs');
const debug = require("debug");
const echo = debug("development:webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ESLintPlugin = require('eslint-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('@soda/friendly-errors-webpack-plugin');

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
            publicPath: '/',
            filename: 'scripts/[name].[hash:5].js',
            path: `${app_config.dist}/${app_config.entry}`,
            chunkFilename: 'scripts/[name].[chunkhash].js',
            assetModuleFilename: 'images/[name].[contenthash:8].[ext]',
        },
        target: 'web',  // 配置 package.json 的 browserslist 字段会导致 webpack-dev-server 的热更新功能直接失效，为了避免这种情况需要给 webpack 配上 target 属性
        devtool: 'inline-source-map',
        mode: "development",
        resolve: app_config.resolve,
        // externals: app_config.externals, // 注意抽包的类库不可以在此包含
        stats: {
            preset: 'minimal',
            source: true,
            moduleTrace: true,
            errorDetails: true,
        },
         cache: {
            type: 'filesystem', // cache.type：缓存类型，值为 memory 或 filesystem，分别代表基于内存的临时缓存，以及基于文件系统的持久化缓存
            buildDependencies: {  // cache.buildDependencies：全局缓存失效的一种机制，配置 {config: [__filename]}，表示当配置文件内容或配置文件依赖的模块文件发生变化时，当前的构建缓存即失效`
                config: [__filename],
            },
        },
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
                {
                    test: /\.(tsx?|jsx|js)$/,
                    use: [
                        {
                            loader: "babel-loader",
                            options: { cacheDirectory: true }, // cacheDirectory：babel-loader 在执行的时候，可能会产生一些运行期间重复的公共文件，造成代码体积大冗余，同时也会减慢编译效率，所以开启该配置将这些公共文件缓存起来，下次编译就会加快很多
                        },
                        {
                            loader: "source-map-loader",
                        },
                    ],
                    exclude: /node_modules/,
                },
                {
                    test: /\.ejs$/,
                    loader: 'ejs-loader',
                    options: {
                        esModule: false
                    },
                    exclude: /node_modules/,
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
                // webpack5 已内置资源模块，因此无需再下载 file-loader、url-loader
                {
                    test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                    type: 'asset', // asset：自动选择导出为单独文件或者 dataURL形式（默认为8KB）. 之前有url-loader设置asset size limit 限制实现
                    parser: {
                      dataUrlCondition: { // dataUrlCondition：指定资源大小（单位字节）
                        maxSize: 4 * 1024,
                      },
                    },
                },
                {
                    test: /\.(eot|svg|ttf|woff|woff2?)$/,
                    type: 'asset/resource',  // asset/resource：将资源分割为单独的文件，并导出url，就是之前的 file-loader的功能
                },
            ]
        },
        plugins: [
            new FriendlyErrorsWebpackPlugin(),
            new ESLintPlugin({
                extensions: ['js', 'jsx', 'json', 'ts', 'tsx'],
                exclude: '/node_modules/',
            }),
            // 使用ProvidePlugin加载的模块在使用时将不再需要import和require进行引入
            new webpack.ProvidePlugin({
                '$': 'jquery',
                'jQuery': 'jquery',
                'window.jQuery': 'jquery',
            }),
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
            client: {
                logging: 'verbose',
                progress: true,
                overlay: {// 当出现编译错误或警告时，在浏览器中显示全屏覆盖。
                    errors: true,
                    warnings: true,
                },
            },
            historyApiFallback: true,  // { index: `${app_config.dist}/${app_config.entry}/index.html`}
            proxy: {
                '/api': {
                    target: 'http://localhost:3000',
                    pathRewrite: { '^/api': '' },
                },
            },
            open: true,
            hot: true,
        },
    }
};