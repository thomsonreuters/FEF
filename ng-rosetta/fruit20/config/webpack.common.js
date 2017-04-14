// All base configuration items. This file is combined with the appropriate target build config file (dev, prod, etc.)
var webpack = require('webpack');
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
    'vendor': ['./src/vendor.ts'],
    'app': './src/main.ts'
  },

  // Specifies which file types to analyze, in order of process (right to left).
  resolve: {
    extensions: ['.ts', '.min.js', '.js']
  },

  module: {
    // Specifies the pattern to search for each file type, and which webpack loader to use on each discovered file.
    // Example, *.ts files are processed with both the ts-loader and angular2-template-loader (all downloaded via the npm manifest: package.json)
    // Note that the ts-loader will feed all discovered TypeScript files into the TypeScript compiler.
    // The TypeScript compiler options are still configured via ./tsconfig.json.
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'ts-loader'
          },
          {
            loader: 'angular2-template-loader'
          },
          {
            loader: 'angular2-router-loader'
          }
        ]
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader'
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        use: [
          {
            loader: 'file-loader'
          }
        ]
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
    // The entry blocks specified above are given a priority (right to left).
    // Dependencies found in multiple blocks will be assigned based on the priority below.
    // Example: @angular/core will be found in both the vendor.ts & multiple app files, 
    // but the order specified below indicates that it will be bundled into the vendor.js file. 
    new webpack.optimize.CommonsChunkPlugin({
      name: ['app', 'vendor', 'polyfills']
    }),

    // Specifies which html file to insert the final bundled file references.
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    })
  ]
};
