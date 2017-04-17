const devServer = {
  port: 8000,
  hot: true,
  compress: true,
  host: '0.0.0.0',
  historyApiFallback: false,
  inline: true,
  publicPath: '/webpack-demo/',
  headers: {
    'X-My-Header': '^_^'
  }, //自定义返回头
  proxy: {
    "/api": {
      target: "http://localhost:3000",
      pathRewrite: {
        "^/api": ""
      }
    }
  }
}

module.exports = devServer;