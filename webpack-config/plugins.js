const path = require('path');
const webpack = require('webpack');
const config = require('./config.js');

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

const pages = require('./pages.js');

var plugins = [
  // new webpack.DllReferencePlugin({ //预编译库 
  //   context: __dirname,
  //   manifest: require('./build/budle.manifest.json')
  // }),

  new webpack.optimize.CommonsChunkPlugin({
    name: 'common',
    filename: 'js/[name].js'
  }),

  new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
    'window.$': 'jquery',
    'window.jQuery': 'jquery'
  }),

  // new HtmlWebpackPlugin({
  //   title: 'index',
  //   filename: 'index.html',
  //   template: path.resolve('src/template.html'),
  //   chunks: ['index', 'common'],
  //   minify: {
  //     removeComments: true,
  //     collapseWhitespace: true
  //   }
  // }),

  // new HtmlWebpackPlugin({
  //   title: 'contacts',
  //   filename: 'contacts.html',
  //   template: path.resolve('src/template.html'),
  //   chunks: ['contacts', 'common'],
  //   minify: {
  //     removeComments: true,
  //     collapseWhitespace: true
  //   }
  // }),

  // new HtmlWebpackPlugin({
  //   title: 'announcement',
  //   filename: 'announcement.html',
  //   template: path.resolve('src/template.html'),
  //   chunks: ['announcement', 'common'],
  //   minify: {
  //     removeComments: true,
  //     collapseWhitespace: true
  //   }
  // }),

  // 手工复制指定文件到目标目录
  new CopyWebpackPlugin([{
    from: './build/bundle.js',
    to: path.join(__dirname, '../dist/js')
  }]),

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
];

pages.forEach(function(page) {
  plugins.push(new HtmlWebpackPlugin({
    title: pages,
    filename: page + '.html',
    template: config.srcDir + '/template.html',
    chunks: [page, 'common'],
    minify: {
      removeComments: true,
      collapseWhitespace: true
    }
  }))
});

module.exports = plugins;