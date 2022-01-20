#!/usr/bin/env node
"use strict";
const version = require("../package.json").version;
const inquirer = require("inquirer");
const fs = require("fs-extra");
const path = require("path");
const chalk = require("chalk");
const {globalLoader} = require("@edwardxyt/gws-utils");
const shell = require("shelljs");
const log = console.log;

const rootPath = path.resolve(__dirname, "../");

const cwd = process.cwd();
log(chalk.blue(`[gws-cli] version: ${version}`));
/*
log(chalk.red(`[INFO] ${cwd}`));
log(shell.pwd());
log(__dirname);
log(__filename);
*/

/*
let name = process.argv[2];
let exec = require("child_process").exec;

let child = exec("echo hello " + name, function(err, stdout, stderr) {
  if (err) throw err;
  log(stdout);
});
*/

const promptList = [
    {
        type: "input",
        message: "项目名称:",
        name: "name",
        default: "website2022" // 默认值
    },
    {
        type: "input",
        message: "描述:",
        name: "description",
        default: "" // 默认值
    },
    {
        type: "list",
        message: "模式选择:",
        name: "pattern",
        choices: ["2022(Alpha)", "Base-2020(Alpha)", "Base-2019", "Simple-2018"],
        filter: function(val) {
            // 使用filter将回答变为小写
            return val.toLowerCase();
        }
    },
    {
        type: "confirm",
        message: "是否安装依赖:",
        name: "watch"
    },
    {
        type: "list",
        message: "选择包管理器",
        name: "npm",
        choices: ["npm", "cnpm", "yarn"],
        when(answers) {
            // 当watch为true的时候才会提问当前问题
            return answers.watch;
        }
    }
];

inquirer.prompt(promptList).then(answers => {
    globalLoader(`${rootPath}/src/${answers.pattern}/package.json`).then(
        async result => {
            let pa = Object.assign({}, result[0], answers);

            // 判断项目文件是否已存在
            if (fs.pathExistsSync(`${cwd}/${answers.name}`)) {
                log(
                    `${chalk.red("[ERROR]")} ${chalk.blue.bold(
                        "[目录已存在]"
                    )} ${chalk.green(`${cwd}/${answers.name}`)}`
                );
                return false;
            }

            //生成文件 修改gitignore
            await shell.cp(
                "-rf",
                `${rootPath}/src/${answers.pattern}/`,
                `${cwd}/${answers.name}`
            );
            await shell.cd(`${cwd}/${answers.name}`);
            await shell.mv(
                `${cwd}/${answers.name}/gitignore`,
                `${cwd}/${answers.name}/.gitignore`
            );

            // 写文件内容（如果文件不存在会创建一个文件）
            // 写入时会先入清空文件
            await fs.outputFile(
                `${cwd}/${answers.name}/package.json`,
                JSON.stringify(pa),
                err => {
                    if (err) {
                        throw err;
                    }

                    // 写入成功后读取测试
                    fs.readFile(
                        `${cwd}/${answers.name}/package.json`,
                        "utf-8",
                        (err, data) => {
                            if (err) {
                                throw err;
                            }
                            // console.log('生成文件：', JSON.parse(data));

                            // 安装包
                            if (answers.watch) {
                                //执行npm run build 命令
                                log(
                                    chalk.blue(
                                        `\n[gws-cli] ${answers.npm} install...`
                                    )
                                );
                            } else {
                                log(
                                    `\n${chalk.cyan(
                                        "[gws-cli]"
                                    )} ${chalk.blue.bold(
                                        "[未安装依赖请手动执行]"
                                    )}`
                                );
                            }

                            if (
                                answers.npm &&
                                answers.watch &&
                                shell.exec(`${answers.npm} install --registry=https://registry.npm.taobao.org`, {
                                    silent: false
                                }).code !== 0
                            ) {
                                //执行npm run build 命令
                                shell.echo(
                                    `[ERROR]: ${answers.npm} instll failed`
                                );
                                shell.exit(1);
                            }

                            if (answers.npm) {
                                log(
                                    chalk.blue(
                                        `[gws-cli] ${
                                            answers.npm
                                        } install success!`
                                    )
                                );
                            }

                            log(
                                `${chalk.cyan("[gws-cli]")} ${chalk.blue.bold(
                                    "[进入项目]"
                                )} ${chalk.green(`cd ${answers.name}`)}`
                            );
                            if (!answers.npm) {
                                log(
                                    `${chalk.cyan(
                                        "[gws-cli]"
                                    )} ${chalk.blue.bold(
                                        "[安装依赖]"
                                    )} ${chalk.green(`npm run install`)}`
                                );
                            }
                            log(
                                `${chalk.cyan("[gws-cli]")} ${chalk.blue.bold(
                                    "[查看项目树]"
                                )} ${chalk.green("npm run tree")}`
                            );
                            log(
                                `${chalk.cyan(
                                    "[INFO]"
                                )} --------------------------------------------------------------------------------`
                            );
                            log(
                                `${chalk.cyan("[gws-cli]")} ${chalk.blue.bold(
                                    "[运行入口activity/christmas、 启动mock环境]"
                                )} ${chalk.yellow(
                                    "npm run start --ENTRY=activity/christmas --ENV=mock"
                                )}`
                            );
                            log(
                                `${chalk.cyan("[gws-cli]")} ${chalk.blue.bold(
                                    "[运行入口activity/christmas、启动mock环境]"
                                )} ${chalk.yellow(
                                    "npm run watch --ENTRY=activity/christmas --ENV=mock"
                                )}`
                            );
                            log(
                                `${chalk.cyan(
                                    "[INFO]"
                                )} --------------------------------------------------------------------------------`
                            );
                            log(
                                `${chalk.cyan("[gws-cli]")} ${chalk.blue.bold(
                                    "[编译activity/christmas、启动test环境]"
                                )} ${chalk.yellow(
                                    "npm run compile --ENTRY=activity/christmas --ENV=test"
                                )}`
                            );
                            log(
                                `${chalk.cyan(
                                    "[INFO]"
                                )} --------------------------------------------------------------------------------`
                            );
                        }
                    );
                }
            );
        }
    );
});

exports.version = version;
