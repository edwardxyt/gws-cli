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
      console.log(
          stats.toString({
            colors: true, // 在控制台展示颜色
            modules: false,
            children: false,
            chunks: false,  // 使构建过程更静默无输出
            warnings: true,
            chunkModules: false
          })
      )
      echo('webpack compile vendor complete 编译完成');
      echo(
        `-------------------------------  end  ------------------------------`
      );
    }
  });
});
