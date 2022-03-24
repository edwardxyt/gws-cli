const webpack = require('webpack');
const fs = require("fs");
const path = require('path');
const dayjs = require('dayjs');
const CopyPlugin = require('copy-webpack-plugin'); //复制静态资源
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin'); //压缩css
const TerserPlugin = require('terser-webpack-plugin'); // 压缩js
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); //提取到.css文件里
const chalk = require('chalk');
const log = console.log;

// 加载全局配置文件
log(chalk.white('webpack:production') + ' - ' + chalk.green('加载全局文件'));

let rootDir = path.resolve(__dirname, '../');
let app_config = require('.')(rootDir);

module.exports = async () => {
    return {
        entry: {
            app: [...app_config.main],
        },
        output: {
            publicPath: '/', // https://oss.hualala.com/static/images/
            filename: `${app_config.entry}.js`,
            path: `${app_config.libDir}`,
            globalObject: 'this',
            library: {
                name: `${app_config.entry}`,
                type: 'umd',
                umdNamedDefine: true,
                auxiliaryComment: '这里是插入的注释',
            },
        },
        target: 'web', // 配置 package.json 的 browserslist 字段会导致 webpack-dev-server 的热更新功能直接失效，为了避免这种情况需要给 webpack 配上 target 属性
        bail: true,  // 在第一个错误出现时抛出失败结果，而不是容忍它。
        devtool: false,  // 'source-map'
        mode: 'production',
        resolve: app_config.resolve,
        externals: app_config.externals,
        cache: {
            type: 'filesystem',
            version: app_config.environmentHash,
            cacheDirectory: path.resolve(app_config.node_module_dir, '.cacheP'),
            store: 'pack',
            buildDependencies: {
                defaultWebpack: ['webpack/lib/'],
                config: [__filename],
                tsconfig: [path.resolve(app_config.rootDir, 'tsconfig.json')].filter(f =>
                    fs.existsSync(f)
                ),
            },
        },
        infrastructureLogging: {
            level: 'none',
        },
        stats: {
            preset: 'normal',
            colors: true,
            source: true,
            moduleTrace: true,
            errorDetails: true,
        },
        optimization: {
            minimize: true,
            minimizer: [
                new CssMinimizerPlugin(), // 就像 optimize-css-assets-webpack-plugin 一样，但在 source maps 和 assets 中使用查询字符串会更加准确，支持缓存和并发模式下运行。
                new TerserPlugin({
                    extractComments: false,
                    parallel: true, // 使用多进程并发运行以提高构建速度
                    terserOptions: {
                        mangle: {
                            safari10: true, // 混淆，默认也是开的，mangle也是可以配置很多选项的
                        },
                        parse: {
                            ecma: 8,
                        },
                        compress: {
                            ecma: 5,
                            inline: 2,
                            warnings: false,
                            drop_console: true, //传true就是干掉所有的console.*这些函数的调用.
                            drop_debugger: true, //干掉那些debugger;
                            comparisons: false,
                            pure_funcs: ['console.log'], // 如果你要干掉特定的函数比如console.info ，又想删掉后保留其参数中的副作用，那用pure_funcs来处理
                        },
                        output: {
                            ecma: 5,
                            comments: false,
                            ascii_only: true,
                        },
                    },
                }),
            ]
        },
        module: {
            strictExportPresence: true,  // 将缺失的导出提示成错误而不是警告
            rules: [
                {
                    test: /\.(tsx?|jsx|js)$/,
                    use: [
                        {
                            loader: 'babel-loader',
                            options: { cacheDirectory: true }, // cacheDirectory：babel-loader 在执行的时候，可能会产生一些运行期间重复的公共文件，造成代码体积大冗余，同时也会减慢编译效率，所以开启该配置将这些公共文件缓存起来，下次编译就会加快很多
                        },
                        {
                            loader: 'ts-loader',
                        },
                    ],
                    exclude: /node_modules/,
                },
                {
                    test: /\.(le|c)ss$/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader, // 非DEV环境，这里替换style-loader，即可提取css文件
                        },
                        {
                            loader: 'css-loader',
                            options: {
                                modules: {
                                    mode: 'local',
                                    localIdentName: '[name]__[local]--[hash:base64:8]',
                                },
                            },
                        },
                        {
                            loader: 'less-loader',
                            options: {
                                lessOptions: {
                                    strictMath: true,
                                },
                            },
                        },
                        {
                            loader: 'postcss-loader',
                        },
                    ],
                },
                {
                    test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.svg$/],
                    type: 'asset/inline'
                },
                {
                    test: /\.md$/,
                    type: 'asset/source'
                }
            ],
        },
        plugins: [
            // 打包后在.js/.css页头的时间
            // hash         :[hash]
            // chunkhash    :[chunkhash]
            // name         :[name]
            // filebase     :[filebase]
            // query        :[query]
            // file         :[file]
            new webpack.BannerPlugin({
                banner: `@Last Modified time ${dayjs().format('YYYY-MM-DD HH:mm:ss')}`,
            }),
            // 解决 hash 频繁变动的问题
            new webpack.ids.HashedModuleIdsPlugin({
                context: __dirname,
                hashFunction: 'sha256',
                hashDigest: 'hex',
                hashDigestLength: 20,
            }),
            // 允许创建一个在编译时可以配置的全局常量
            new webpack.DefinePlugin(app_config.inject),
            // 和 style-loader 功能一样，只是打包后会单独生成 css 文件而非直接写在 html 文件中，用于生产环境，开发环境不需要另外生成文件使用 style-loader 即可
            new MiniCssExtractPlugin({
                filename: `${app_config.entry}.min.css`,
                chunkFilename: "[id].min.css"
            }),
            // 打包时忽略本地化内容
            // Moment.js是一个非常流行的库，它捆绑了大型locale文件
            //如果你不使用Moment.js，你可以删除它:
            new webpack.IgnorePlugin({
                resourceRegExp: /^\.\/locale$/,
                contextRegExp: /moment$/,
            }),
            // 静态文件处理
            new CopyPlugin({
                patterns: [
                    {
                        from: path.join(app_config.entryDir, 'README.md'),
                        to: path.join(app_config.libDir),
                    },
                ],
            }),
        ]
    };
};
