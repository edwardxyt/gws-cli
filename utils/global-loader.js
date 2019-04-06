let glob = require('glob');

module.exports.globalLoader = pattern => {
  return new Promise((resolve, reject) => {
    console.log('pattern',pattern);
    const arr = [];
    glob(pattern, {
      // ignore: '**/*.js',
      nodir: true
    }, (err, files) => {
      console.log(files);
      if (err) {
        return reject(err)
      }
      files.forEach(file => {
        arr.push(require(file)) // eslint-disable-line global-require, import/no-dynamic-require
      });
      return resolve(arr)
  })
  })
};
