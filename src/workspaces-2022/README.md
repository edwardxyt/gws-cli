# gws-lerna

### 初衷
Yarn Workspaces 是Yarn提供的monorepo的依赖管理机制，从Yarn 1.0开始默认支持，用于在代码仓库的根目录下管理多个package的依赖。能更好的统一管理有多个项目的仓库，既可在每个项目下使用独立的 package.json 管理依赖，又可便利的享受一条 yarn 命令安装或者升级所有依赖等。更重要的是可以使多个项目共享同一个 node_modules 目录，提升开发效率和降低磁盘空间占用。

### Monorepo
假如你是一个npm工具的维护者，管理着多个功能相近的包，或者这些包之间存在依赖关系。如果将这些包拆分在不同仓库里，那么面临要跨多个包进行更改时，工作会非常繁琐和复杂。

Menorepo的优点是可以在一个仓库里维护多个package，可统一构建，跨package调试、依赖管理、版本发布都十分方便，搭配工具还能统一生成CHANGELOG；

babel使用Monorepo
```
babel/
|--package.json
|--yarn.lock
|--packages/
|  |--babel-cli/
|  |  |--package.json
|  |--babel-core/
|  |  |--package.json
|  |--babel-parser/
|  |  |--package.json
```
### 优点
* 仅一个git仓库 管理多个package，通过lerna生成目录，发布包，添加依赖，结合Workspace安装提取依赖。
* 所有package的依赖会安装在最根目录的node_modules下，节省磁盘空间，且给了yarn更大的依赖优化空间

### 缺点
代码仓库体积会变大，只开发其中一个package也需要安装整个项目的依赖。

### Lerna
* 是社区主流的monorepo管理工具之一，集成了依赖管理、版本发布管理等功能。
* 使用Learn管理的项目的目录结构和yarn workspace类似。
* Lerna的依赖管理是也基于yarn/npm，但是安装依赖的方式和yarn workspace有些差异：
* Yarn workspace只会在根目录安装一个node_modules，这有利于提升依赖的安装效率和不同package间的版本复用。而Lerna默认会进到每一个package中运行yarn/npm install，并在每个package中创建一个node_modules。
* 目前社区中最主流的方案，也是yarn官方推荐的方案，是集成yarn workspace和lerna。使用yarn workspace来管理依赖，使用lerna来管理npm包的版本发布。

### 使用说明
首先下载脚手架，以后会迁移到gws-cli的模版中。
```
git clone https://github.com/edwardxyt/gws-lerna.git
cd gws-lerna
rm -rf .git/
git init //配置新库
lerna bootstrap //安装依赖
npm run xxxxxx  //执行npm scripts

npm run start --ENTRY=example // 开发模式
npm run build --ENTRY=modulea // 编译模式
```
#### 目录

```js
.
├── config 
├── lerna.json
├── package.json
├── packages
│   ├── modulea            // a组件（案例组件）
│   │   ├── README.md
│   │   ├── asset
│   │   │   ├── avatar.png
│   │   │   ├── favicon.ico
│   │   │   ├── logo.svg
│   │   │   └── webpack.svg
│   │   ├── index.less
│   │   ├── index.tsx
│   │   ├── lib
│   │   │   ├── README.md
│   │   │   ├── modulea.js
│   │   │   └── modulea.min.css
│   │   ├── package-lock.json
│   │   ├── package.json
│   │   └── yarn.lock
│   ├── moduleb            // b组件（案例组件）
│   │   ├── README.md
│   │   ├── index.tsx
│   │   ├── lib
│   │   │   ├── README.md
│   │   │   └── moduleb.js
│   │   ├── package-lock.json
│   │   └── package.json
│   └── modulec            // c组件（展示案例页面）
│       ├── README.md
│       ├── __tests__
│       │   └── moduleC.test.js
│       ├── index.less
│       ├── index.tsx
│       ├── lib
│       │   └── moduleC.js
│       ├── main.tsx
│       ├── package.json
│       ├── store
│       │   ├── actions
│       │   ├── index.tsx
│       │   └── protoTypes
│       └── templates
│           └── index.ejs
├── tsconfig.json
└── typings
```
a和b是案例组件，c是预览页面，他引入了a和b，并提供了dev页面。
a组件（案例）导出了，一个hook react组件，引入less，图片base64，可使用antd、lodash等 `export default MA;`
b组件（案例）导出多个出口。`export { MB, year }`
c组件 是完整的页面，目前没引router。可用于软链 a和b 展示和开发使用。

#### npm scripts
```node
// 启动modulec项目 本地开发调试
npm run start --ENTRY=modulec

// 编译子组件
npm run build --ENTRY=modulea
npm run build --ENTRY=moduleb

// --ENTRY=对应packages目录下文件夹名称
```

#### Lerna scripts
##### lerna create
[loc]
创建一个包，name包名，loc 位置可选
```node
//  新增moduled子组件 既packeages目录下新增moduled文件夹
lerna create moduled
```

#####  lerna add
[@version] [--dev] [--exact]
增加本地或者远程package做为当前项目packages里面的依赖
```node
//  @edwardxyt/modulec 子组件内 devDependencies 添加 lodash
lerna add lodash --scope=@edwardxyt/modulec --dev

//  @edwardxyt/modulec 子组件内 dependencies 添加 @edwardxyt/moduleb
lerna add @edwardxyt/moduleb --scope=@edwardxyt/module
```

##### lerna clean
删除所有包的node_modules目录

##### lerna bootstrap
默认是npm i,因为我们指定过yarn，so,run yarn install,会把所有包的依赖安装到根node_modules.
> 从新安装node_modules 要先执行lerna clean 再执行lerna bootstrap

##### lerna publish
发布到npm服务器上，注意自己的`registry`地址是否正确。

```
npm set registry http://sinopia.node.hualala.com
npm adduser --registry http://sinopia.node.hualala.com
npm profile set password --registry http://sinopia.node.hualala.com

yarn config set registry http://sinopia.node.hualala.com
```

> 推荐使用nrm管理 registry
> http://sinopia.node.hualala.com/ 公司verdaccio-npm服务器

### 具体开发说明
#### webpack.ProvidePlugin
`webpack.ProvidePlugin` webpack配置ProvidePlugin后，在使用时将不再需要import和require进行引入，直接使用即可。
```js
plugins: [
    ...
    new webpack.ProvidePlugin({
      'api': 'api'
    }),
    ...
]
```

```js
resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      'api': resolve('src/api/index.js'),
    }
 },
```

```js
...
mounted() {
    api.getData().then(res => {
      this.items = res
    }).catch(err => {
      console.log(err)
    })
},
...
```
### 坑
1. Minified React error #321
2. cache 目录同名导致 首次编译失败
3. 路径问题
4. 软链载入问题 用相对路径先解决
5. umb问题

### TODO package
- [ ] `gws-lerna`会迁移到`gws-cli`的模版中
- [ ] husky install
- [ ] commit cz
- [ ] genlog conventional-changelog
- [ ] {
  "*.{js,jsx,ts,tsx}": ["eslint --fix", "prettier --write"],
  "*.{less,scss}": "prettier --write",
  "*.{js,css,json,md}": ["prettier --write"]
  }
- [ ] 编译优化