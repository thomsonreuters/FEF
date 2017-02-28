var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var helpers = require('./helpers');

module.exports = {

  cache: true,

  debug: true,

  target: 'node', // in order to ignore built-in modules like path, fs, etc. 

  // externals: [nodeExternals()], // in order to ignore all modules in node_modules folder

  output: {
    path: helpers.root('dist'),
    filename: 'templates.js'
  },

  entry: {
    'templates': './src/js/components/app.ts'
  },

  resolve: {
    extensions: ['', '.ts', '.html'],
  },

  module: {

    loaders: [
      {
        test: /\.html$/,
        loader: 'ngtemplate!html'
      }
    ]

  }
};