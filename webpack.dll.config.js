var webpack = require('webpack');

module.exports = {
  entry: {
    bundle: [
      'jquery',
      'coala'
    ]
  },

  output: {
    path: '/build',
    publicPath: '/',
    filename: '[name].js',
    library: '[name]_library'
  },

  plugins: [
    new webpack.DllPlugin({
      path: './build/budle.manifest.json',
      name: '[name]_library'
    })
  ]
}