const webpack = require('webpack');
const fs = require("fs");
const path = require('path');
const detect = require('detect-port');
const dayjs = require('dayjs');
const debug = require('debug');
const echo = debug('development:webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const ReactRefreshTypeScript = require('react-refresh-typescript');

const FriendlyErrorsWebpackPlugin = require('@soda/friendly-errors-webpack-plugin'); //终端日志美化工具

// 加载全局配置文件
echo('加载全局文件');

let rootDir = path.resolve(__dirname, '../');
let app_config = require('.')(rootDir);

module.exports = async () => {
  {
    // 启动调试工具
    if (app_config.console) {
      app_config.main.push(app_config.console);
      echo('开启Vconsole');
    }
  }
  {
    // 端口监测
    const port = app_config.devServer.port;
    const _port = await detect(port);
    if (port == _port) {
      echo(`端口号: ${port} 没有被占用，放心使用。`);
      echo('启动webpack-dev-server');
      echo(`服务器运行在 http://${app_config.IP}:${port}`);
    } else {
      app_config.devServer.port = _port;
      echo(`端口号: ${port} 已占用, 尝试使用端口号: ${_port}！`);
      echo('启动webpack-dev-server');
      echo(`服务器运行在 http://${app_config.IP}:${_port}`);
    }
  }
  return {
    entry: {
      app: [...app_config.main],
    },
    output: {
      publicPath: '/',
      filename: 'scripts/[name].[contenthash:8].js',
      path: `${app_config.dist}/${app_config.entry}`,
      chunkFilename: 'scripts/[name].[contenthash:8].chunk.js',
      assetModuleFilename: 'media/[name].[hash][ext]',
    },
    target: 'browserslist', // 配置 package.json 的 browserslist 字段会导致 webpack-dev-server 的热更新功能直接失效，为了避免这种情况需要给 webpack 配上 target 属性
    devtool: 'cheap-module-source-map',  // inline-source-map
    mode: 'development',
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
      version: app_config.environmentHash,
      cacheDirectory: path.resolve(app_config.node_module_dir, '.cache'),
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
    optimization: {
      splitChunks: {
        cacheGroups: {
          chartsVendor: {
            test: app_config.library.chartsVendor.test,
            priority: app_config.library.chartsVendor.priority,
            name: 'chartsVendor',
            chunks: 'all',
          },
          reactVendor: {
            test: app_config.library.reactVendor.test,
            priority: app_config.library.reactVendor.priority,
            name: 'reactVendor',
            chunks: 'all',
          },
          antdVendor: {
            test: app_config.library.antdVendor.test,
            priority: app_config.library.antdVendor.priority,
            name: 'antdVendor',
            chunks: 'all',
          },
          utilsVendor: {
            test: app_config.library.utilsVendor.test,
            priority: app_config.library.utilsVendor.priority,
            name: 'utilsVendor',
            chunks: 'all',
          },
          vendors: {
            test: app_config.library.vendors.test,
            priority: app_config.library.vendors.priority,
            name: 'vendors',
            chunks: 'all',
          },
        },
      },
    },
    module: {
      strictExportPresence: true,  // 将缺失的导出提示成错误而不是警告
      rules: [
        {
          enforce: 'pre',
          exclude: /@babel(?:\/|\\{1,2})runtime/,
          test: /\.(js|mjs|jsx|ts|tsx|css)$/,
          loader: require.resolve('source-map-loader'),
        },
        {
          test: /\.(tsx?|jsx|js)$/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                cacheDirectory: true  // cacheDirectory：babel-loader 在执行的时候，可能会产生一些运行期间重复的公共文件，造成代码体积大冗余，同时也会减慢编译效率，所以开启该配置将这些公共文件缓存起来，下次编译就会加快很多
              },
            },
            {
              loader: 'ts-loader',
              options: {
                getCustomTransformers: () => ({
                  before: [ReactRefreshTypeScript()],
                }),
                transpileOnly: true,
              },
            }
          ],
          exclude: /node_modules/,
        },
        {
          test: /\.ejs$/,
          loader: 'ejs-loader',
          options: {
            esModule: false,
          },
          exclude: /node_modules/,
        },
        {
          test: /\.(le|c)ss$/,
          use: [
            {
              loader: 'style-loader',
            },
            {
              loader: 'css-loader',
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
              options: {
                postcssOptions: {
                  ident: 'postcss',
                  config: false,
                  plugins: [
                    'postcss-flexbugs-fixes',
                    [
                      'postcss-preset-env',
                      {
                        autoprefixer: {
                          flexbox: 'no-2009',
                        },
                        stage: 3,
                      },
                    ],
                    'postcss-normalize',
                  ],
                },
                sourceMap: true,
              },
            },
          ],
        },
        // webpack5 已内置资源模块，因此无需再下载 file-loader、url-loader
        {
          test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
          type: 'asset', // asset：自动选择导出为单独文件或者 dataURL形式（默认为8KB）. 之前有url-loader设置asset size limit 限制实现
          parser: {
            dataUrlCondition: {
              // dataUrlCondition：指定资源大小（单位字节）
              maxSize: 4 * 1024,
            },
          },
        },
        {
          test: /\.(eot|svg|ttf|woff|woff2?)$/,
          type: 'asset/resource', // asset/resource：将资源分割为单独的文件，并导出url，就是之前的 file-loader的功能
        },
      ],
    },
    plugins: [
      new FriendlyErrorsWebpackPlugin(),
      new ESLintPlugin({
        context: app_config.src,
        files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx', '**/*.json'],
        exclude: '/node_modules/',
        emitError: true,
        failOnWarning: true,
        fix: true
      }),
      // 使用ProvidePlugin加载的模块在使用时将不再需要import和require进行引入
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
      }),
      new ReactRefreshWebpackPlugin(),
      // HMR 实际上只开启 hot：true 就会自动识别有无声明该插件，没有则自动引入，但是怕有隐藏问题这里还是手动加上了
      // new webpack.HotModuleReplacementPlugin(),
      // 允许创建一个在编译时可以配置的全局常量
      new webpack.DefinePlugin(app_config.inject),
      // 打包时忽略本地化内容
      // Moment.js是一个非常流行的库，它捆绑了大型locale文件
      //如果你不使用Moment.js，你可以删除它:
      new webpack.IgnorePlugin({
        resourceRegExp: /^\.\/locale$/,
        contextRegExp: /moment$/,
      }),
      // 使用模板引擎生成html
      new HtmlWebpackPlugin({
        title: '生成的HTML文档的标题',
        filename: 'index.html',
        template: app_config.template_path,
        templateParameters: {
          foo: 'bar',
          COMPILED_AT: dayjs().format('YYYY-MM-DD HH:mm:ss'),
          env: app_config.inject.__ENV__,
          debug: app_config.inject.__DEBUG__,
          api_path: app_config.inject.__API__,
          meta: '',
        },
        minify: {
          // 压缩 HTML 文件
          removeComments: true, // 移除 HTML 中的注释
          collapseWhitespace: true, // 删除空白符与换行符
          minifyCSS: true, // 压缩内联 css
        },
        inject: true, // true或'body'所有javascript资源都将放置在body元素的底部
        // favicon: path.resolve('public/favicon.ico'),
        chunks: [
          'chartsVendor',
          'reactVendor',
          'antdVendor',
          'utilsVendor',
          'vendors',
          'app',
        ], // entry中的 app 入口才会被打包
      }),
    ],
    devServer: {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Allow-Headers': '*',
      },
      // allowedHosts: [], // 该选项允许将允许访问开发服务器的服务列入白名单。
      compress: true, // 启用http compression(gzip)进行数据压缩传输
      port: app_config.devServer.port,
      host: app_config.IP,
      client: {
        logging: 'verbose',
        progress: true,
        overlay: {
          // 当出现编译错误或警告时，在浏览器中显示全屏覆盖。
          errors: true,
          warnings: true,
        },
      },
      historyApiFallback: true, // { index: `${app_config.dist}/${app_config.entry}/index.html`}
      proxy: {
        '/api': {
          target: 'http://localhost:3000',
          pathRewrite: { '^/api': '' },
        },
      },
      open: true,
      hot: 'only',  // HMR时 填true
    },
    performance: false, // Turn off performance processing
  };
};
