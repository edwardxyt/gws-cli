const Koa = require("koa");
const serve = require("koa-static");
const connectHistory = require("connect-history-api-fallback");
const detect = require("detect-port");
const path = require("path");
const ip = require("ip");
const R = require("ramda");
const debug = require("debug");

const echo = debug("server:koa");
const app = new Koa();
const port = process.env.npm_package_config_koa_port;

let entry = process.env.npm_config_ENTRY;
let [cluster, project] = R.split("/", entry);
let staticDir = path.join(__dirname, "..", "dist", cluster, project);
echo(`staticDir: ${staticDir}`);

// 配置静态web服务的中间件
app.use(serve(staticDir));

app.use(() => {
    const middleware = connectHistory();
    return async (ctx, next) => {
        middleware(ctx, null, () => {});
        await next();
    };
});

app.listen(port);
echo(`服务器运行在 http://${ip.address()}:${port}`);
