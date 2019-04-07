const webpack_development_config = require("../config/webpack.development.watch.config");
const webpack = require("webpack");
const moment = require("moment");
const debug = require("debug");
const echo = debug("development:watch");

const { start } = require("./koa.server.js");

start();

webpack_development_config().then(config => {
    webpack(config).watch({}, (err, stats) => {
        const buildDate = new Date().toLocaleString();
        // 在这里打印 watch/build 结果...
        echo(
            `=============================== ${moment(stats.startTime).format(
                "YYYY-MM-DD HH:mm:ss"
            )} ===============================`
        );
        if (err) {
            echo("webpack watch fail 编译错误！");
            echo(err);
            return;
        }
        echo(`编译ID：${stats.hash}`);
        echo(`编译时间：${stats.endTime - stats.startTime}`);
        echo(stats.toJson("minimal"));
        echo(
            `=============================== ${moment(stats.endTime).format(
                "YYYY-MM-DD HH:mm:ss"
            )} ===============================`
        );
    });
});
