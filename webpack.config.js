const path = require('path');
const webpack = require('webpack')

const commonsPlugin = new webpack.optimize.CommonsChunkPlugin({
  name: 'common',
  filename: 'js/[name].js'
});

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    index: path.resolve('./src/pages/index/index.js'),
    contacts: path.resolve('./src/pages/contacts/index.js'),
    announcement: path.resolve('./src/pages/announcement/index.js')
  },

  output: {
    path: path.resolve(__dirname, './assets/'),
    filename: 'js/[name]-[chunkhash:8].js', //各页面模块对应的主要 js 文件命名
    chunkFilename: 'js/[name]-[id]-[chunkhash:8].js', // 分块后异步请求的 js 文件存放路径及命名
  },

  plugins: [
    commonsPlugin,
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.$': 'jquery',
      'window.jQuery': 'jquery'
    }),
    new HtmlWebpackPlugin({
      title: 'index',
      filename: 'index.html',
      template: path.resolve('src/template.html'),
      chunks: ['index', 'common'],
      minify: {
        removeComments: true,
        collapseWhitespace: true
      }
    }),

    new HtmlWebpackPlugin({
      title: 'contacts',
      filename: 'contacts.html',
      template: path.resolve('src/template.html'),
      chunks: ['contacts', 'common'],
      minify: {
        removeComments: true,
        collapseWhitespace: true
      }
    }),

    new HtmlWebpackPlugin({
      title: 'announcement',
      filename: 'announcement.html',
      template: path.resolve('src/template.html'),
      chunks: ['announcement', 'common'],
      minify: {
        removeComments: true,
        collapseWhitespace: true
      }
    }),

    new ExtractTextPlugin({
      filename: 'css/[name].css'
    })

  ],

  module: {
    rules: [{
      test: require.resolve('jquery'),
      use: [
        'expose-loader?$',
        'expose-loader?jQuery'
      ]
    }, {
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: "style-loader",
        use: "css-loader",
        publicPath: '../'
      })
    }, {
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['es2015']
        }
      }
    }, {
      test: /\.html$/,
      use: 'coala-dot-loader'
    }, {
      test: /\.(eot|svg|ttf|woff)\??.*$/,
      use: 'file-loader?name=static/img/[name]-[hash:8].[ext]'
    }, {
      test: /\.(jpg|png|gif)$/,
      use: 'file-loader?name=static/img/[name]-[hash:8].[ext]'
    }]
  },

  resolve: {
    modules: ['node_modules', 'src', 'src/pages', 'src/assets']
  },

  devServer: {
    port: 8000,
    hot: true,
    compress: true,
    host: '0.0.0.0',
    historyApiFallback: false,
    inline: true,
    publicPath: '/webpack-demo/',
    headers: { 'X-My-Header': '^_^' }, //自定义返回头
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  }
}