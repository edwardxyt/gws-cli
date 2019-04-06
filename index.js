let {globalLoader} = require('./utils/global-loader');
let shell = require('shelljs');
let fs = require('fs-extra');

globalLoader(`${__dirname}/template/**/*.js`).then(result => {
    console.log(result)
});
