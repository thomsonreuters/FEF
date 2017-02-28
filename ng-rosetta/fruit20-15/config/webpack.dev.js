var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');
var WebpackBrowserPlugin = require("webpack-browser-plugin");            // Automatically launches the browser on a build

module.exports = webpackMerge(commonConfig, {
  devtool: 'cheap-module-eval-source-map',
  cache: true,
  debug: true,
  output: {
    path: helpers.root('src/js/generated'),
    filename: '[name].js',
    sourceMapFilename: '[name].map',
    chunkFilename: '[id].chunk.js'
  },

  plugins: [
    new ExtractTextPlugin('[name].css'),
    new WebpackBrowserPlugin()
  ],

  devServer: {
    contentBase: './src',
    historyApiFallback: true,
    stats: 'minimal'
  }
});
