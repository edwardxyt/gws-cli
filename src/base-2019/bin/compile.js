const webpack_production_config = require("../config/webpack.production.config");
const webpack = require("webpack");
const path = require("path");
const debug = require("debug");
const R = require("ramda");
const echo = debug("compile:bin");
const log = console.log;

let app_config = require("../config")(path.resolve(__dirname, "../"));

webpack_production_config().then(config => {
    webpack(config).run((err, stats) => {
        if (err) {
            echo("webpack compile fail 编译错误！");
            echo(err);
        } else {
            echo(
                `------------------------------ start ------------------------------`
            );
            process.stdout.write(
                stats.toString({
                    colors: true,
                    modules: false,
                    children: false,
                    chunks: false,
                    warnings: false,
                    chunkModules: false
                }) + "\n\n"
            );
            echo("webpack compile vendor complete 编译完成");
            echo(
                `-------------------------------  end  ------------------------------`
            );
        }
    });
});
