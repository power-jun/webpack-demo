const config = require('./webpack.config');
const SshWebpackPlugin = require('ssh-webpack-plugin');

config.plugins.push(
  new SshWebpackPlugin({
    host: '',
    port: '22',
    username: 'root',
    password: '',
    from: './dist',
    cover: false,
    to: ''
  })
);
module.exports = config;