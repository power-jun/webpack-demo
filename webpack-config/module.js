const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = require('./config.js');

var modules = {
  rules: [{
      test: require.resolve('jquery'),
      use: [
        'expose-loader?$',
        'expose-loader?jQuery'
      ]
    }, {
      test: /\.css$/,
      include: config.srcDir,
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
      include: config.srcDir,
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
};

module.exports = modules;