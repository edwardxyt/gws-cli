const chalk = require('chalk');
const log = console.log;
const del = require('del');

del(['build', 'dist', 'cache', 'temp']).then((paths) => {
    log(`
  ${chalk.white(`bin:del`)} - ${chalk.red(`删除文件`)}
`);

    paths.forEach((i) => log(`${chalk.white(`${i}`)}`));
    if (!paths.length) log(` ${chalk.red(` 没有需要删除的目录`)}`);
});
