const Koa = require("koa");
const static = require("koa-static");
const connectHistory = require("connect-history-api-fallback");
const detect = require("detect-port");
const path = require("path");
const ip = require("ip");
const debug = require("debug");

const echo = debug("development:koa");
const app = new Koa();

let staticDir = path.join(__dirname, "..", "temp");
echo(`staticDir: ${staticDir}`);

// 配置静态web服务的中间件
app.use(static(staticDir));

app.use(() => {
    const middleware = connectHistory();
    return async (ctx, next) => {
        middleware(ctx, null, () => {});
        await next();
    };
});

exports.start = async () => {
    // 端口监测
    let port = process.env.npm_package_config_port;
    let _port = await detect(port);

    if (port == _port) {
        echo(`端口号: ${port} 没有被占用，放心使用。`);
        echo("启动webpack --watch");
        echo(`服务器运行在 http://${ip.address()}:${port}`);
    } else {
        port = _port;
        echo(`端口号: ${port} 已占用, 尝试使用端口号: ${_port}！`);
        echo("启动webpack --watch");
        echo(`服务器运行在 http://${ip.address()}:${_port}`);
    }

    await app.listen(port);
};
