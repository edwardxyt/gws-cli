let {globalLoader} = require('./utils/global-loader');
let shell = require('shelljs');

globalLoader(`${__dirname}/utils/**/*.js`).then(result => {
    console.log(result)
});
