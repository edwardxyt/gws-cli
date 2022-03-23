const path = require('path');
const ip = require('ip');
const debug = require('debug');
const _ = require('lodash');
const projects = require('./project');
const createEnvironmentHash = require('./createEnvironmentHash');

// node 16 npm_config_entry 变小写了
const entry = process.env.npm_config_entry;
const env = process.env.npm_config_env || process.env.NODE_ENV;
const [cluster, project] = _.split(entry, '/', 2);
const debugging = env !== 'production';

const api_path = projects[cluster][project].env[env].api_path;
const cdn_path = projects[cluster][project].env[env].cdn_path;
const Vconsole = projects[cluster][project].env[env].console;
const echo = env === 'production' ? debug('production:config') : debug('development:config');

let app_config = (rootDir = '/') => {
  if (!_.isEmpty(entry) && !_.isNull(entry)) {
    echo(`根路径：${rootDir}`);
    echo(`VConsole：${Vconsole}`);
    echo(`启动项目：${cluster} - ${project}`);
    echo(`API_PATH：${api_path}`);
    echo(`CDN_PATH：${cdn_path}`);
    echo(`启动环境：${env}`);
    echo(`node环境：${process.env.NODE_ENV}`);
    echo(`启动调试：${debugging}`);

    return {
      // ----------------------------------
      // Project Structure
      // 项目结构
      // ----------------------------------
      rootDir, // 项目根目录
      cwd: process.cwd(), // cwd
      entry, // 启动时传入的参数，既项目目录
      entryDir: path.join(rootDir, 'src', `${entry}`),
      env,
      environmentHash: createEnvironmentHash(env),  //环境缓存版本
      IP: ip.address(),
      main: [path.join(rootDir, 'src', `${entry}`, 'main.tsx')], // 启动入口文件
      console: Vconsole ? path.join(rootDir, 'config', 'console.js') : Vconsole, // console入口文件
      debug: debugging,
      src: path.resolve(rootDir, 'src'), // 源码目录
      dist: path.join(rootDir, 'dist'), // 生产编译目录
      distHtml: path.join(rootDir, 'dist', cluster, project, 'index.html'),
      node_module_dir: path.resolve(rootDir, 'node_modules'), // 依赖模块目录
      template_path: path.join(
        rootDir,
        'src',
        `${entry}`,
        '/templates',
        'index.ejs'
      ),
      templates_dir: path.join(rootDir, 'src', `${entry}`, '/templates'),

      // ----------------------------------
      // inject API
      // 注入前端页面 全局变量
      // ----------------------------------
      inject: {
        '__API__': JSON.stringify(api_path),
        '__CDN__': JSON.stringify(cdn_path),
        '__ENV__': JSON.stringify(env),
        '__DEBUG__': JSON.stringify(debugging),
        '__PROJECT__': JSON.stringify(entry),
        '__NODE_ENV__': JSON.stringify(process.env.NODE_ENV)
      },

      // ----------------------------------
      // library
      // 提取第三方库
      // 框架     :      reactBase
      // 工具     :      utilBase
      // UI库     :      uiBase
      // 逻辑代码  :      common
      // ----------------------------------
      library: {
        chartsVendor: {
          test: /[\\/]node_modules[\\/](highcharts|highcharts-react-official)[\\/]/,
          priority: 100,
        },
        reactVendor: {
          test: /[\\/]node_modules[\\/](react|react-dom|react-router-dom|mobx-react|mobx-react-lite)[\\/]/,
          priority: 90,
        },
        antdVendor: {
          test: /[\\/]node_modules[\\/](antd|antd-mobile|@tanem\/react-nprogress|classnames)[\\/]/,
          priority: 70,
        },
        utilsVendor: {
          test: /[\\/]node_modules[\\/](axios|fetch-jsonp|big.js|js-cookie|crypto-js|dayjs|qiankun|ua-parser-js|uuid|vconsole|md5)[\\/]/,
          priority: 60,
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          priority: 50, // 该配置项是设置处理的优先级，数值越大越优先处理
        },
      },

      // ----------------------------------
      // externals
      // 防止将某些 import 的包(package)打包到
      // bundle 中，而是在运行时(runtime)再去从
      // 外部获取这些扩展依赖(external dependencies)
      // ** 主要用于模版引擎中 CDN 排除
      // 注意提取第三方库时，不能含有以下列表，否则将不会打包
      // ----------------------------------
      externals: [
        // 正则表达式
        /^(antd|\$)$/i,
        /^(react|\$)$/i,
        /^(react-dom|\$)$/i,
        /^(lodash|\$)$/i,
        /^(dayjs|\$)$/i,
        /^(@babel\/runtime|\$)$/i,
      ],

      // ----------------------------------
      // resolve
      // 模块如何被解析
      // 这里不能配置 动态入口，因为tsconfig.json不是动态的
      // ----------------------------------
      resolve: {
        extensions: ['.tsx', '.ts', '.js', '.json'],
        alias: {
          '@src': path.resolve(rootDir, './src'),
        },
      },

      // ----------------------------------
      // CDN 地址
      //
      // 如果只有一个cdn服务器 那么写下如下
      // cdn_path: `http://cdn.example.com/static/${cluster}/${project}/`,
      // ----------------------------------
      cdn_path: cdn_path,

      // ----------------------------------
      // server
      // webpack-dev服务器
      // ----------------------------------
      devServer: {
        port: process.env.npm_package_config_port || 3000,
      },
    };
  } else {
    echo('缺少入口地址！');
  }
};

module.exports = app_config;
