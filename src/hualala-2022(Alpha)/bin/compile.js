const webpack_production_config = require("../config/webpack.production.config");
const webpack = require("webpack");
const debug = require("debug");
const echo = debug("compile:bin");

webpack_production_config().then(config => {
    webpack(config, (err, stats) => { 
        if (err || stats.hasErrors()) {
            echo("webpack compile fail 编译错误！");
            echo(err);
        } else {
            echo( `------------------------------ start ------------------------------` );
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
            echo( `-------------------------------  end  ------------------------------` );
        }
      });
});
