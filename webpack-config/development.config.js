var webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  devServer: require('./dev-server'),
  entry: require('./entry.js'),
  output: require('./output.js'),
  module: require('./module.js'),
  plugins: require('./plugins.js'),
  resolve: {
    modules: ['node_modules', 'src', 'src/pages', 'src/assets']
  }
}