const glob = require('glob');
const config = require('./config');

var pages = glob.Glob('!(_)*', {
  sync: true,
  cwd: config.srcDir + '/pages'
}).found;

module.exports = pages;