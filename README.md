# @edwardxyt/gws-cli
这是一个web脚手架工具，用于生成基于webpack5,生成typescript+react17+mobx5+reactRouter6的应用。初衷是要解决多入口，多环境。单独编译单独运行的脚手架。做到小而美。决绝锦上添花。
## Getting Started
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

![WX20190411-180931](media/15549621575960/WX20190411-180931.png)


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
请选择Base-2020(Alpha)模式，这是最新版react脚手架，使用技术如下

| 模块名称         | 版本 |
|------------------|------|
| Webpack          | 5    |
| Babel            | 7    |
| react            | 17   |
| antd             | 3    |
| antd-mobile      | 2    |
| mobx-react       | 7    |
| react-router-dom | 6    |

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