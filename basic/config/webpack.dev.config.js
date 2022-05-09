const { merge } = require('webpack-merge');
const common = require('./webpack.common.config.js');

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    port: 8080,
    historyApiFallback: true,
    // allowedHosts: 'all',
  }
})