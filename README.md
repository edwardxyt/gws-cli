![WX20190411-180931](http://xiayuting.cc/gws.png)
# @edwardxyt/gws-cli
![npm](https://img.shields.io/npm/dw/@edwardxyt/gws-cli) ![npm bundle size](https://img.shields.io/bundlephobia/min/@edwardxyt/gws-cli) ![NPM](https://img.shields.io/npm/l/@edwardxyt/gws-cli) ![GitHub User's stars](https://img.shields.io/github/stars/edwardxyt) ![npm (scoped)](https://img.shields.io/npm/v/@edwardxyt/gws-cli)

(Generator website 发电的小风车。简称gws-cli，)这是一个web脚手架工具，用于生成基于webpack5,生成typescript+react17+mobx5+reactRouter6的应用。初衷是要解决多入口，多环境。单独编译单独运行的脚手架。做到小而美。拒绝锦上添花。
## Getting Started
| 模块名称         | 版本 |
|------------------|------|
| Webpack          | 5    |
| Babel            | 7    |
| react            | 17   |
| antd             | 4    |
| antd-mobile      | 2    |
| mobx-react       | 7    |
| react-router-dom | 6    |

### Installing globally:
Using npm:
```
npm -g install @edwardxyt/gws-cli
```
Using yarn:
```
yarn global add @edwardxyt/gws-cli
```

### Usage:

```
gws-cli
```
执行后填写配置，回车执行生产一个脚手架文件夹。
> 注意：gws-cli已经放弃，请安装 @edwardxyt/gws-cli

## Example

![WX20190411-180931](media/WX20190411-180931.png)


```
xiayuting@xiayutingdeMacBook-Pro  ~  gws-cli
[gws-cli] version: 2.3.1
? 项目名称: website2020
? 描述:
? 模式选择: Base-2020(Alpha)
? 是否安装依赖: No
cp: no such file or directory: /Users/xiayuting/.nvm/versions/node/v10.14.2/lib/node_modules/@edwardxyt/gws-cli/src/base-2020(alpha)/
cd: no such file or directory: /Users/xiayuting/website2020
mv: no such file or directory: /Users/xiayuting/website2020/gitignore

[gws-cli] [未安装依赖请手动执行]
[gws-cli] [进入项目] cd website2020
[gws-cli] [安装依赖] npm run install
[gws-cli] [查看项目树] npm run tree --DIR=All
[INFO] --------------------------------------------------------------------------------
[gws-cli] [运行入口news/demo、 启动mock环境] npm run start --ENTRY=news/demo --ENV=mock
[INFO] --------------------------------------------------------------------------------
[INFO] --------------------------------------------------------------------------------
[gws-cli] [编译news/demo、启动test环境] npm run compile --ENTRY=news/demo --ENV=test
[gws-cli] [启动http服务器、项目news/demo] npm run node:server --ENTRY=news/demo
[INFO] --------------------------------------------------------------------------------
 xiayuting@xiayutingdeMacBook-Pro  ~ 
```
请选择2022(Alpha)模式，这是最新版react脚手架，使用技术如下
### Config & Use
上面目录目录结构中，/config/project.js，是您的项目启动配置文件。里面已有案例news/git 项目。如下：

```
module.exports = {
    activity: { // 多入口 “activity/christmas”
        christmas: {
            env: {  //多环境
                mock: {
                    api_path: "123123",
                    console: false,
                    cdn_path: "/"
                },
                development: {
                    api_path: "//:bizdev.aibao.com",
                    console: false,
                    cdn_path: "/"
                },
                test: {
                    api_path: "//:bizapitest.aibao.com",
                    console: false,
                    cdn_path: "/"
                },
                production: {
                    api_path: "//:biz.aibao.com",
                    console: false,
                    cdn_path: "/dist/activity/christmas/"
                }
            }
        }
    }
};
```
> activity/christmas/main.tsx 就是 src目录下的目录下的一个入口文件。

```
npm run start --entry=activity/christmas --env=mock
启动本地webpack-dev-server服务，项目名称为 ctivity/christmas 当前环境为mock 对上面的配置文件载入配置。
```

```
npm run watch --ENTRY=activity/christmas --ENV=production
启动监听文件编译，项目名称为 ctivity/christmas 当前环境为production 生成静态文件dist目录里。
```

```
npm run compile --ENTRY=activity/christmas --ENV=production
启动静态编译模式，项目名称为 news/demo 当前环境为production 生成静态文件dist目录里。
```

```
npm run tree
tree:bin /Users/xiayuting/workBase/gws-cli2/src/news/demo/main.js +0ms
tree:bin 总数：1 +2ms
查看当前脚手架中，已有项目入口
```

-------

## version3，的设计思路仍然没有变化，主要是全面升级webpack和react全家桶。加入typeScript。

## 走着

- [设计初衷](#设计初衷)
- [一个套住你的框框](#一个套住你的框框)
- [升级遇到的坑](#升级遇到的坑)

### 设计初衷

**最新版是2022年1月开发的，对应选项“2022(Alpha)”。**
**杠宝**：首先主流的cli工具不论细节和维护，都要比你的小而美强百倍，为什么你还要写一个这种简单的脚手架呢？
**卡片**：create-react-app确实是顶级优秀的工具，但是，我想要个精简，并且包含固定的react全家桶（react+router+mobx+antd）。并且他可以适合大家随时可以扩展功能，<u>npm-check -u</u>。最主要的一点。就是我要多入口。

**杠宝**：你说什么多入口啊？webpack.entry？那你可以多传几个入口文件，这么简单也叫多入口？
**卡片**：对对对对。其实我的 **“初衷”** 是为了杜绝两件事，
**卡片**：1，公司内部新起一个项目时，我并不想copy一个老项目删除src，或者cli生成一个空的脚手架后，我还需要各种安装package。
**卡片**：2，我希望不论我本地起环境，还是build输出。我只运行或build我已修改的那个入口。而不是你说的webpack.entry。

**杠宝**：那你怎么实现的，难道你可以一个脚手架，里放多个项目嘛？
**卡片**：对对对对。确实我的脚手架可以做到，你在公司里的某一事业部。只用一个脚手架就包含有多个项目，多个端。并且可以单独编译，单独运行。互不影响。
**卡片**：实现是这样的src下是有两层目录的。src/activity/christmas。终端输入<u>npm riun start --entry=activity/christmas --env=mock</u>后，gws就会通过glob找到指定目录下寻找main.tsx的入口文件，并根据ENV加载对应环境的配置。并运行。
**卡片**：这样，你只启动了src/activity/christmas/main.tsx这一个入口，而且环境是随便定义的。您只需要启动时或编译时，带参数即可。简单吧。实用吧。
**卡片**：而且两层目录，给你足够的命名区分业务空间。足够你规划项目分类啦
**卡片**：小而美的定义，就是通过没用的减法，小小设计大大优化。拒绝一切没用的花花

### 一个套住你的框框

> 百度百科：约定大于配置，也可以叫做约定优于配置（convention over
configuration），也称作按约定编程，是一种软件设计范式，指在减少软件开发人员需做决定的数量，获得简单的好处，而又不失灵活性。

使用react，我喜欢的是组件化编程思想，他不再像以前，我们把所有类型文件都放在一个目录下，而现在我可以一个文件夹下，多个不同种类的文件在一起。这个文件夹就是一个组件。当我不需要这个组件时候，直接del。不需要考虑是否少删，是否多删。让大型共建项目，可持续维护。减少冗余。

**所以，gws集成了以下配置，**
1. 入口的html是一个ejs文件，为什么要模版引擎呢？因为在启动或编译时，我注入了运行是环境信息，不但使用webpack.DefinePlugin注入，还注入到了ejs里。这样在此可以将一写配置渲染到index.html中。可以写判断加载非esModule（既\<script src=" "/>）等情况。
2. 以前我们开发活动页面时，需要做移动端和pc端，除了大小不同，元素基本相同。通常是根据域名http://m.xxx访问，并在nginx判断转发。现在我们通过ua来判断加载哪个入口组件解决。不需要二级域名，不需要nginx判断
3. main.tsx除了判断入口组件，还可写pwa、qiankun、并且是使用webpack按需加载的，
4. 所有的多入口多环境，统一在配置文件里配置，不需要写在项目中。
5. gws 使用 react17框架 mobx-react7数据框架 react-router-dom6路由 antd4 antd-mobile2 等。基本上属于最新版。

那什么是约定大于配置呢，脚手架目录src/activity/christmas类似这样的。入口之后的文件安排。全凭开发者自己归纳设计。gws含有eslint，含有typescript等，如何使用全凭开发者选择。我自己也不喜欢大家风格一样。这样就没有创新空间了。所以这里叫做一个套住你的框框。

## 我遇到的坑
### webpack5
- eslint-loader作废，改为eslint-webpack-plugin
- file-loader和url-loader作废，webpack内置集成
- 本地启用devserver命令更改，webpack-dev-server改为webpack serve
- 不支持babel-polyfill，改用@babel/runtime-corejs3和@babel/plugin-transform-runtime
- mini-css-extract-plugin提取到.css文件里，生产环境替换style-loader。
- optimize-css-assets-webpack-plugin作废替换为css-minimizer-webpack-plugin
- clean-webpack-plugin过期，改用bin/del替代
- friendly-errors-webpack-plugin断崖改用@soda/friendly-errors-webpack-plugin
- eslint-webpack-plugin替换es-loader 目前还没有生效
- mobx-react-devtools过时 已经删除
- 加入端口检查（原来有）
- 加入gzip
- 加入pwa
- 加入qiankun
- 加入BundleAnalyzerPlugin（原来有）
- handlebars换成ejs
- less postcss（原来有）

### babel7
- 只安装 >=2021以上的插件。2018、2019、2020都已经集成在env里

### eslint
- husky7目前最高版本，未安装。

### typeScript
- 文件路径问题 include: [  "./typings/**/*" ]
- typeScript-loader不可以用babel插件代替 要配合使用.

### react-router6
- 官方已经放弃class组件，全部都是hook组件，老应用无法升级
- 只支持 Navigate useNavigate 建议用store控制登陆
- history无效 需要实现两种跳转。包括无状态组件和类组件（hoc可以解决）

## License
MIT