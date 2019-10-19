const webpack_production_config = require("../config/webpack.production.config");
const webpack = require("webpack");
const path = require("path");
const debug = require("debug");
const R = require("ramda");
const fs = require("fs-extra");
const echo = debug("compile:bin");
let app_config = require("../config")(path.resolve(__dirname, "../"));

webpack_production_config().then(config => {
	webpack(config).run((err, stats) => {
		if (err) {
			echo("webpack compile fail 编译错误！");
			echo(err);
			return;
		}

		fs.pathExists(app_config.distHtml).then(exists => {
			if (!exists) {
				// process.exit(0);
				throw new Error(`status is ${exists}!!!! "webpack compile fail 编译错误！"`);
			} else {
                echo(`------------------------------ start ------------------------------`);
				process.stdout.write(stats.toString({
					colors: true,
					modules: false,
					children: false,
					chunks: false,
					warnings: false,
					chunkModules: false
				}) + '\n\n');
                echo("webpack compile complete 编译完成");
                echo(`-------------------------------  end  ------------------------------`);
			}
		});
	});
});
