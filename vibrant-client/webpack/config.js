require('dotenv').load();

// http://stackoverflow.com/questions/29640996/webpack-with-an-array-provided-as-config
module.exports = [
  require('./configs/vue.js'),
  // require('./configs/example.js'),
];
