const oss = require('./core/oss-factory.js');
const version = require("./package.json").version;


exports = module.exports = oss;
exports.version = version;