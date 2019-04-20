let {globalLoader} = require('@edwardxyt/gws-utils');
let shell = require('shelljs');
const chalk = require('chalk');
const log = console.log;

let cpu = {
    totalPercent: 90,
    used: 100,
    total: 3,

};

globalLoader(`${__dirname}/utils/**/*.js`).then(result => {
    console.log(result)
});

// Combine styled and normal strings
log(chalk.blue('Hello') + ' World' + chalk.red('!'));

// Compose multiple styles using the chainable API
log(chalk.blue.bgRed.bold('Hello world!'));

// Pass in multiple arguments
log(chalk.blue('Hello', 'World!', 'Foo', 'bar', 'biz', 'baz'));

// Nest styles
log(chalk.red('Hello', chalk.underline.bgBlue('world') + '!'));

// Nest styles of the same type even (color, underline, background)
log(chalk.green(
    'I am a green line ' +
    chalk.blue.underline.bold('with a blue substring') +
    ' that becomes green again!'
));

// ES2015 template literal
log(`
    CPU: ${chalk.red('90%')}
    RAM: ${chalk.green('40%')}
    DISK: ${chalk.yellow('70%')}
`);

// ES2015 tagged template literal
log(chalk`
    CPU: {red ${cpu.totalPercent}%}
    RAM: {green ${cpu.used / cpu.total * 100}%}
    DISK: {rgb(255,131,0) ${cpu.used / cpu.total * 100}%}
`);

// Use RGB colors in terminal emulators that support it.
log(chalk.keyword('orange')('Yay for orange colored text!'));
log(chalk.rgb(123, 45, 67).underline('Underlined reddish color'));
log(chalk.hex('#DEADED').bold('Bold gray!'));

log(`${chalk.cyan('[INFO]')} ${chalk.blue.bold('[查看项目树]')} ${chalk.green('npm run tree')}`);
log(`${chalk.cyan('[INFO]')} --------------------------------------------------------------------------------`);
log(`${chalk.cyan('[INFO]')} ${chalk.blue.bold('[运行入口news/demo、启动mock环境]')} ${chalk.yellow('npm run start --ENTRY=news/demo --ENV=mock')}`);
log(`${chalk.cyan('[INFO]')} ${chalk.blue.bold('[运行入口news/git、启动mock环境]')} ${chalk.yellow('npm run start --ENTRY=news/git --ENV=mock')}`);
log(`${chalk.cyan('[INFO]')} --------------------------------------------------------------------------------`);

log(`${chalk.cyan('[INFO]')} --------------------------------------------------------------------------------`);
log(`${chalk.cyan('[INFO]')} ${chalk.blue.bold('[编译news/demo、启动test环境]')} ${chalk.yellow('npm run compile --ENTRY=news/demo --ENV=test')}`);
log(`${chalk.cyan('[INFO]')} ${chalk.blue.bold('[启动http服务器、项目news/demo]')} ${chalk.yellow('npm run node:server --ENTRY=news/demo')}`);
log(`${chalk.cyan('[INFO]')} --------------------------------------------------------------------------------`);
