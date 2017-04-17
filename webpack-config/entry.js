var path = require('path');
var config = require('./config');
var pages = require('./pages.js');
var entrys = {};

pages.forEach(function(page) {
  entrys[page] = path.resolve(config.srcDir + '/pages', page + '/index.js');
});

module.exports = entrys;