var path = require('path');
var config = require('./config.js');

var output = {
  path: config.distDir,//path.resolve(__dirname, '../dist/'),
  filename: 'js/[name]-[hash:8].js', //各页面模块对应的主要 js 文件命名
  chunkFilename: 'js/[name]-[id]-[chunkhash:8].js', // 分块后异步请求的 js 文件存放路径及命名
}

module.exports = output;