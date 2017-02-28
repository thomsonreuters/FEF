// This is the development configuration file. It refernces both the helper and common config files.
var webPack = require('webpack');
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');
var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var WebpackBrowserPlugin = require("webpack-browser-plugin");            // Automatically launches the browser on a build

module.exports = webpackMerge(commonConfig, {
  // Enable the generation of ts file source maps.
  devtool: 'source-map',

  // Specifies where to deploy the bundled files and how to name them.
  // filename: '[name].js' indicates that each entry block should be created with 
  // the block name as its filename. 
  // A single file name (ex: filename: bundled.js) will combine all file bundles into a single file.
  output: {
    path: helpers.root('dist'),
    publicPath: 'http://localhost:8080/',
    filename: '[name].js',
    chunkFilename: '[id].chunk.js'
  },

  plugins: [
    // new webPack.optimize.UglifyJsPlugin({
    //   compress: {
    //     warnings: true
    //   }
    // }),
    new ExtractTextPlugin('[name].css'),  
    new WebpackBrowserPlugin({
      url: "http://localhost"
    })
  ],

  // Webpack Dev Server Configuration
  devServer: {
    historyApiFallback: true,
    stats: 'minimal'
  }
});