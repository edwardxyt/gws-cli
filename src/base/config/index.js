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

    let mobile = projects[cluster][project].mobile;

    let api_path = projects[cluster][project].env[env].api_path;
    let cdn_path = projects[cluster][project].env[env].cdn_path;
    let Vconsole = projects[cluster][project].env[env].console;

    if (isNotEmpty(entry) && isNotNil(entry)) {
        echo(`根路径：${rootDir}`);
        echo(`VConsole：${Vconsole}`);
        echo(`是否移动开发：${mobile}`);
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
            mobile,
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
            // ----------------------------------
            library: [
                "mobx",
                "mobx-react",
                "react",
                "react-dom",
                "react-router-dom"
                // "antd",
                // "axios"
            ],

            // ----------------------------------
            // externals
            // 防止将某些 import 的包(package)打包到
            // bundle 中，而是在运行时(runtime)再去从
            // 外部获取这些扩展依赖(external dependencies)。
            // ----------------------------------
            externals: {
                react: "React",
                "react-dom": "ReactDOM"
            },

            // ----------------------------------
            // resolve
            // 模块如何被解析
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
