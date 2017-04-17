var webpack = require('webpack');

module.exports = {
  entry: require('./entry.js'),
  output: require('./output.js'),
  module: require('./module.js'),
  plugins: require('./plugins.js'),
  resolve: {
    modules: ['node_modules', 'src', 'src/pages', 'src/assets']
  },
   // 打包文件的尺寸超出指定限制时进行提示。可通过 maxEntrypointSize/maxAssetSize 等参数根据实际项目环境进行配置
  performance: {
    hints: 'warning'
  }
}