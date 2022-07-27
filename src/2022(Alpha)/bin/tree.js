/**
 * 查看项目入口文件，适用于多项目多入口
 * --DIR={All} 传空或all都会查询当前脚手架的所有入口列表
 *
 * @example run tree --scripts-prepend-node-path=auto --DIR=All
 * @type {glob}
 */
const glob = require('glob');
const path = require('path');
const chalk = require('chalk');
const log = console.log;

log(`
  ${chalk.white(`bin:tree`)} - ${chalk.red(`项目目录`)}
`);

let src = path.join(__dirname, '../', 'src');
let options = {
    nodir: true,
};

let dirName = process.env.npm_config_DIR || '**';

if (dirName.toLowerCase() === 'all') {
    dirName = '**';
}

// options is optional
glob(`${src}/${dirName}/*/main.tsx`, options, function (er, files) {
    let total = 0;
    files.map((item, index) => {
        total = index;
        let dirArr = item.split('/');
        let length = dirArr.length;
        let entry = `😊 ${dirArr[length - 3]}/${dirArr[length - 2]} 😊`;
        log(` ${item} - ${chalk.magenta(`${entry}`)}`);
    });
    log(` ${chalk.white(`main.js 总数`)}：${chalk.yellow(`${total + 1}`)}`);
});

glob(`${src}/${dirName}/*/main.js`, options, function (er, files) {
    let total = 0;
    files.map((item, index) => {
        total = index;
        let dirArr = item.split('/');
        let length = dirArr.length;
        let entry = `😊 ${dirArr[length - 3]}/${dirArr[length - 2]} 😊`;
        log(` ${item} - ${chalk.magenta(`${entry}`)}`);
    });
    log(` ${chalk.white(`main.js 总数`)}：${chalk.yellow(`${total + 1}`)}`);
});
