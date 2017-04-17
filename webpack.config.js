const path = require('path');
const webpack = require('webpack');

const commonsPlugin = new webpack.optimize.CommonsChunkPlugin({
  name: 'common',
  filename: 'js/[name].js'
});

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const Happypack = require('happypack');

const happypackThreadPool = Happypack.ThreadPool({
  size: 8
});

function createHappyPlugin(id, loaders) {
  return new Happypack({
    id: id,
    loaders: loaders,
    threadPool: happypackThreadPool,
    cache: true
  })
}

module.exports = {
  devtool: 'eval',
  entry: {
    index: path.resolve('./src/pages/index/index.js'),
    contacts: path.resolve('./src/pages/contacts/index.js'),
    announcement: path.resolve('./src/pages/announcement/index.js')
  },

  output: {
    path: path.resolve(__dirname, './assets/'),
    filename: 'js/[name]-[hash:8].js', //各页面模块对应的主要 js 文件命名
    chunkFilename: 'js/[name]-[id]-[chunkhash:8].js', // 分块后异步请求的 js 文件存放路径及命名
  },

  plugins: [
    // new webpack.DllReferencePlugin({ //预编译库 
    //   context: __dirname,
    //   manifest: require('./build/budle.manifest.json')
    // }),
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

    // 手工复制指定文件到目标目录
    new CopyWebpackPlugin([{from: './build/bundle.js', to: path.join(__dirname, './assets/js')}]),


    createHappyPlugin('html', ['coala-dot-loader']),
    createHappyPlugin('css', ['css-loader?minimize']),
    createHappyPlugin('js', ['babel-loader']),
    createHappyPlugin('image', ['file-loader?name=static/img/[name]-[hash:8].[ext]']),

    createHappyPlugin('font-ttf', ['file-loader?minetype=application/octet-stream&name=static/fonts/[name]-[hash:8].[ext]']),
    createHappyPlugin('font-eot', ['file-loader?name=static/fonts/[name]-[hash:8].[ext]']),
    createHappyPlugin('font-svg', ['file-loader?minetype=image/svg+xml&name=static/fonts/[name]-[hash:8].[ext]']),
    createHappyPlugin('font-woff', ['file-loader?minetype=application/font-woff&name=static/fonts/[name]-[hash:8].[ext]']),

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
          use: 'happypack/loader?id=css',
          publicPath: '../'
        })
      },
      // {
      //   test: /\.js$/,
      //   exclude: /node_modules/,
      //   use: {
      //     loader: 'babel-loader',
      //     // use: 'happypack/loader?id=js',
      //     options: {
      //       presets: ['es2015']
      //     }
      //   }
      // }, 
      {
        test: /\.html$/,
        use: {
          loader: 'happypack/loader?id=html'
        }
      }, {
        test: /\.ttf\??.*$/,
        include: path.resolve('./src/assets/vendors/'),
        loader: 'file-loader?name=static/fonts/[name]-[hash:8].[ext]&minetype=application/octet-stream'
      }, {
        test: /\.eot\??.*$/,
        include: path.resolve('./src/assets/vendors/'),
        loader: 'file-loader?name=static/fonts/[name]-[hash:8].[ext]'
      }, {
        test: /\.svg\??.*$/,
        include: path.resolve('./src/assets/vendors/'),
        loader: 'file-loader?name=static/fonts/[name]-[hash:8].[ext]&minetype=image/svg+xml'
      }, {
        test: /\.(woff|woff2)\??.*$/,
        include: path.resolve('./src/assets/vendors/'),
        loader: 'file-loader?name=static/fonts/[name]-[hash:8].[ext]&minetype=application/font-woff'
      },
      {
        test: /\.(jpg|png|gif)$/,
        use: 'file-loader?name=static/img/[name]-[hash:8].[ext]'
      }
    ]
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
}