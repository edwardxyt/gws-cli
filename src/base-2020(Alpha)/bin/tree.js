/**
 * 查看项目入口文件，适用于多项目多入口
 * --DIR={All} 传空或all都会查询当前脚手架的所有入口列表
 *
 * @example run tree --scripts-prepend-node-path=auto --DIR=All
 * @type {glob}
 */
const glob = require("glob");
const path = require("path");
const fs = require("fs");
const debug = require("debug");
const echo = debug("tree:bin");

let src = path.join(__dirname, "../", "src");
let options = {
    nodir: true
};

let dirName = process.env.npm_config_DIR || '**';

if (dirName.toLowerCase() === 'all') {
    dirName = '**'
}

console.log(dirName)

// options is optional
glob(`${src}/${dirName}/*/main.js`, options, function(er, files) {
    let total = 0;
    files.map((item, index) => {
        total = index;
        let dirArr = item.split('/');
        let length = dirArr.length;
        let entry = `😊 ${dirArr[length-3]}/${dirArr[length-2]} 😊`;
        echo(item, entry);
    });
    echo(`总数：${total + 1}`);
});
