const webpack_production_config = require('../config/webpack.production.config');
const webpack = require('webpack');
const debug = require('debug');
const echo = debug('compile:bin');

webpack_production_config().then((config) => {
  webpack(config, (err, stats) => {
    if (err || stats.hasErrors()) {
      echo('webpack compile fail 编译错误！');
      console.log(err);
    } else {
      echo(
        `------------------------------ start ------------------------------`
      );
      echo(
        // minimal 更多选项如: 'verbose' 等](/configuration/stats).
        stats.toJson('minimal')
      );
      echo('webpack compile vendor complete 编译完成');
      echo(
        `-------------------------------  end  ------------------------------`
      );
    }
  });
});
