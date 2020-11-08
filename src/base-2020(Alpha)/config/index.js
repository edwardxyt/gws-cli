const path = require("path");
const ip = require("ip");
const debug = require("debug");
const R = require("ramda");
const projects = require("./project");
const isNotEmpty = R.complement(R.isEmpty);
const isNotNil = R.complement(R.isNil);
const echo = debug("development:config");
const log = console.log;

let app_config = (rootDir = "/") => {
    let entry = process.env.npm_config_ENTRY || process.env.ENTRY;
    let env =
        process.env.npm_config_ENV || process.env.ENV || process.env.NODE_ENV;

    let [cluster, project] = R.split("/", entry);
    let debugging = env !== "production";

    let api_path = projects[cluster][project].env[env].api_path;
    let cdn_path = projects[cluster][project].env[env].cdn_path;
    let Vconsole = projects[cluster][project].env[env].console;

    if (isNotEmpty(entry) && isNotNil(entry)) {
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
            entry, // 启动时传入的参数，既项目目录
            entryDir: path.join(rootDir, "src", `${entry}`),
            env,
            IP: ip.address(),
            main: [path.join(rootDir, "src", `${entry}`, "main.js")], // 启动入口文件
            console: Vconsole
                ? path.join(rootDir, "config", "console.js")
                : Vconsole, // console入口文件
            debug: debugging,
            src: path.resolve(rootDir, "src"), // 源码目录
            dist: path.join(rootDir, "dist"), // 编译文件
            distHtml: path.join(
                rootDir,
                "dist",
                cluster,
                project,
                "index.html"
            ),
            node_module_dir: path.resolve(rootDir, "node_modules"), // 依赖模块目录
            template_path: path.join(rootDir, "src", `${entry}`, "index.hbs"),
            templates_dir: path.join(rootDir, "src", `${entry}`, "/templates"),

            // ----------------------------------
            // babelPlugins
            // babel 基础插件
            // ----------------------------------
            babelBasicPlugins: [
                // Experimental
                ["@babel/plugin-proposal-decorators", {legacy: true}],
                ["@babel/plugin-proposal-class-properties", {loose: true}],
                ["@babel/plugin-proposal-private-methods", {loose: true}],
                "@babel/plugin-proposal-function-bind",
                "@babel/plugin-proposal-do-expressions",
                "@babel/plugin-proposal-optional-chaining",
                "@babel/plugin-proposal-nullish-coalescing-operator",
                "@babel/plugin-proposal-numeric-separator",
                "@babel/plugin-proposal-throw-expressions",
                "@babel/plugin-proposal-partial-application",
                "@babel/plugin-proposal-export-default-from",
                "@babel/plugin-proposal-export-namespace-from",
                [
                    "@babel/plugin-proposal-pipeline-operator",
                    {proposal: "minimal"}
                ],
                // ES2015 ES2016 ES2017 ES2018
                "@babel/plugin-transform-runtime",
                "@babel/plugin-transform-arrow-functions",
                "@babel/plugin-transform-block-scoped-functions",
                "@babel/plugin-transform-block-scoping",
                "@babel/plugin-transform-classes",
                "@babel/plugin-transform-computed-properties",
                "@babel/plugin-transform-for-of",
                "@babel/plugin-transform-destructuring",
                "@babel/plugin-transform-function-name",
                "@babel/plugin-transform-parameters",
                "@babel/plugin-transform-shorthand-properties",
                "@babel/plugin-transform-spread",
                "@babel/plugin-transform-sticky-regex",
                "@babel/plugin-transform-async-to-generator",
                "@babel/plugin-proposal-async-generator-functions",
                "@babel/plugin-proposal-object-rest-spread",
                // others
                "@babel/plugin-transform-object-assign",
                "@babel/plugin-transform-jscript",
                // Modules
                "@babel/plugin-transform-modules-umd"
            ],

            // ----------------------------------
            // babelPlugins
            // babel 压缩，优化，删冗余插件
            // ----------------------------------
            babelMinifyPlugins: [
                // Minification
                "transform-regexp-constructors",
                "transform-property-literals",
                "minify-type-constructors",
                "minify-mangle-names",
                "minify-numeric-literals",
                // Remove
                ["transform-remove-console", {exclude: ["error", "warn"]}],
                "transform-remove-debugger",
                "babel-plugin-transform-remove-undefined"
            ],

            // ----------------------------------
            // inject API
            // 注入前端页面 全局变量
            // ----------------------------------
            inject: {
                __API__: JSON.stringify(api_path),
                __CDN__: JSON.stringify(cdn_path),
                __ENV__: JSON.stringify(env),
                __DEBUG__: JSON.stringify(debugging),
                __PROJECT__: JSON.stringify(entry)
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
                reactBase: /react|mobx|prop-types/,
                utilBase: /axios|crypto-js|dayjs|fetch-jsonp|history|js-cookie|lodash|ramda|ua-parser-js/,
                uiBase: /antd|antd-mobile|nprogress/,
                common: /[\\/]src[\\/]/
            },

            // ----------------------------------
            // externals
            // 防止将某些 import 的包(package)打包到
            // bundle 中，而是在运行时(runtime)再去从
            // 外部获取这些扩展依赖(external dependencies)
            // ** 主要用于模版引擎中 CDN 排除
            // ----------------------------------
            externals: {
                jquery: 'jQuery', //属性名称是 jquery，表示应该排除 import $ from 'jquery' 中的 jquery 模块。为了替换这个模块，jQuery 的值将被用来检索一个全局的 jQuery 变量。
                react: 'react',
                lodash : {
                    commonjs: 'lodash',
                    amd: 'lodash',
                    root: '_' // 指向全局变量
                }
            },

            // ----------------------------------
            // resolve
            // 模块如何被解析
            // @ 入口根目录
            // ～ 入口根目录/common
            // ----------------------------------
            resolve: {
                extensions: [".js", ".jsx"],
                alias: {
                    "@": path.join(rootDir, "src", entry),
                    "~": path.join(rootDir, "src", entry, "common")
                }
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
                port: process.env.npm_package_config_port || 3000
            }
        };
    } else {
        echo("缺少入口地址！");
    }
};

module.exports = app_config;
