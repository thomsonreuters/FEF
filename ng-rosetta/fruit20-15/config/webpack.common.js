var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var helpers = require('./helpers');

module.exports = {
  entry: {
    'polyfills': './src/polyfills.ts',
    'vendor': './src/vendor.ts',
    'legacy': './src/legacy.ts',
    'main': './src/main.ts'
  },

  resolve: {
    extensions: ['', '.js', '.ts'],
    alias: {
      "@angular/upgrade/static": "@angular/upgrade/bundles/upgrade-static.umd.js"
    }
  },

  module: {

    preLoaders: [
      {
        test: /\.js$/,
        loader: 'source-map-loader',
        exclude: [
          // these packages have problems with their sourcemaps
          path.join(__dirname, 'node_modules', 'rxjs'),
          path.join(__dirname, 'node_modules', '@angular2-material'),
          path.join(__dirname, 'node_modules', '@angular'),
          path.join(__dirname, 'node_modules', 'angular'),
        ]
      }
    ],

    noParse: [
      path.join(__dirname, 'node_modules', 'zone.js', 'dist'),
      path.join(__dirname, 'node_modules', 'angular2', 'bundles')
    ],

    loaders: [
      {
        test: /\.ts$/,
        exclude: [
          './src/js'
        ],    
        loaders: ['ts', 'angular2-template-loader']
      },
      {
        test: /\.html$/,
        loader: 'html'
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loader: 'file?name=assets/[name].[hash].[ext]'
      },
      {
        test: /\.css$/,
        loader: 'raw'
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
