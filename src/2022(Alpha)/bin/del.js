const debug = require("debug");
const echo = debug("development:del");
const del = require("del");

del(["build", "dist", "cache", "temp"]).then(paths => {
    echo("删除文件及目录:");

    paths.forEach(i => echo(i));
    if (!paths.length) echo("没有需要删除的目录");
});
