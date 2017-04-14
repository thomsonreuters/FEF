// All base configuration items. This file is combined with the appropriate target build config file (dev, prod, etc.)
var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var helpers = require('./helpers');

module.exports = {

  // Each entry point described below represents a block of references.
  // Each reference represents the head of a different dependency chain (main.ts is the custom application entry point).
  // Blocks are given priority below so that references are not duplicated.
  // Each block is output as a seperate js file and inserted into the DOM as a <script> tag. 
  entry: {
    'polyfills': './src/polyfills.ts',
    'vendor': './src/vendor.ts',
    'legacy': './src/legacy.ts',
    'main': './src/main.ts'
  },

  resolve: {
    extensions: ['.js', '.ts'],
    alias: {
      "@angular/upgrade/static": "@angular/upgrade/bundles/upgrade-static.umd.js"
    }
  },

  module: {

    noParse: [
      path.join(__dirname, 'node_modules', 'zone.js', 'dist'),
      path.join(__dirname, 'node_modules', 'angular2', 'bundles')
    ],

    rules: [
      {
        test: /\.ts$/,
        exclude: ['./src/js'],    
        use: [
          { loader: 'ts-loader' }, 
          { loader: 'angular2-template-loader' }
        ]
      },
      {
        test: /\.html$/,
        use: [{ loader: 'html-loader' }]
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        use: [{ loader: 'file-loader '}] 
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          }
        ]
      }
    ]
  },
  
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: ['main', 'legacy', 'vendor', 'polyfills']
    }),
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: {
    //     warnings: false
    //   }
    // })
  ]
};
