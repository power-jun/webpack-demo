var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: {
    bundle: [
      'jquery',
      'coala'
    ]
  },

  output: {
    path: path.join(__dirname, './build'),
    filename: '[name].js',
    library: '[name]_library'
  },

  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, './build/budle.manifest.json'),
      name: '[name]_library'
    })
  ]
}