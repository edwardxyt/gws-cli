![WX20190411-180931](http://xiayuting.cc/gws.png)

# @edwardxyt/gws-cli

![npm](https://img.shields.io/npm/dw/@edwardxyt/gws-cli) ![npm bundle size](https://img.shields.io/bundlephobia/min/@edwardxyt/gws-cli) ![NPM](https://img.shields.io/npm/l/@edwardxyt/gws-cli) ![GitHub User's stars](https://img.shields.io/github/stars/edwardxyt) ![npm (scoped)](https://img.shields.io/npm/v/@edwardxyt/gws-cli)

(Generator website 发电的小风车。简称 **gws-cli**，)这是一个**web模版**脚手架工具。用于生成基于 webpack5,生成 typescript+react17+mobx5+reactRouter6 的应用。初衷是要解决多入口，多环境。单独编译单独运行的脚手架。做到小而美。拒绝锦上添花。


🍙 插件化的企业级前端应用框架。

> Please consider following this project's author, [edwardxyt](https://github.com/edwardxyt), and consider starring the project to show your ❤️ and support.

---

## 特性

- 🎉 **可扩展**，gws-cli, 主要提供选中模版，生成不同类型的脚手架。
- 📦 **开箱即用**，每个脚手架都使用了webpack运行开发和生产。
- 🐠 **企业级**，经蚂蚁内部 3000+ 项目以及阿里、优酷、网易、飞猪、口碑等公司项目的验证，值得信赖。
- 🚀 **大量自研**，目前都是作者孤独奋战，如果有缺陷请您邮件我56833517@qq.com。
- 🌴 **技术栈**，目前常用模版两个`2022(alpha)`和`workspaces-2022`两个react全家桶。
- 🚄 **面向未来**，如果您需要react mobx typescript router less eslint stylelint prettier husky conventional-changelog。等可以考虑开箱即用。

## 快速上手

通过cli创建项目，

```bash
# 全局安装
$ npm -g install @edwardxyt/gws-cli

# 生成项目目录、选择模版、运行消息
$ gws-cli
```

## 模版选择
```bash
$ gws-cli
[gws-cli] version: 3.5.0
? 项目名称: website2022
? 描述:
? 模式选择: (Use arrow keys)
❯ 2022(Alpha)  // 多入口多环境react+antd+mobx的脚手架
workspaces-2022  // monorepo 组件库
Base-2020(Alpha)  // 过时
Base-2019  // 过时
Simple-2018  // 过时
```

### 2022(alpha) 模版
```bash
[gws-cli] [未安装依赖请手动执行]
[gws-cli] [进入项目] cd dir
[gws-cli] [安装依赖] npm run install
[gws-cli] [查看项目树] npm run tree
[INFO] --------------------------------------------------------------------------------
[gws-cli] [运行入口activity/christmas、 启动mock环境] npm run start --ENTRY=activity/christmas --ENV=mock
[gws-cli] [运行入口activity/christmas、启动mock环境] npm run watch --ENTRY=activity/christmas --ENV=mock
[INFO] --------------------------------------------------------------------------------
[gws-cli [编译activity/christmas、启动test环境] npm run build --ENTRY=activity/christmas --ENV=production
[INFO] --------------------------------------------------------------------------------
```

### workspaces-2022 模版
```bash
[gws-cli] [未安装依赖请手动执行]
[gws-cli] [进入项目] cd dir
[gws-cli] [安装依赖] npm run install
[INFO] --------------------------------------------------------------------------------
[gws-cli-lerna] [组件库案例入口example] npm run start --ENTRY=example
[INFO] --------------------------------------------------------------------------------
[gws-cli-lerna] [编译子组件modulea] npm run build --ENTRY=modulea
[INFO] --------------------------------------------------------------------------------
```
## 链接


## 贡献


## 反馈


## LICENSE

[MIT]()