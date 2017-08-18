// All base configuration items. This file is combined with the appropriate target build config file (dev, prod, etc.)
var webpack = require('webpack');
var path = require('path');
var ngToolsWebpack = require('@ngtools/webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

// As this is the common configuration portion, it will be consumed and merged with the actual dev & prod config files.
// Each of those files will pass the environment configuration object (env) into this file.
// We'll default the env parameter to an empty object to prevent errors accessing it in case it's undefined.
module.exports = (env = {}) => {

  // We will create a common configuration object and return it 
  const config = {

    // Each entry point described below represents a block of references.
    // Each reference represents the head of a different dependency chain (main.ts is the custom application entry point).
    // Blocks are given priority below so that references are not duplicated.
    // Each block is output as a seperate js file and inserted into the DOM as a <script> tag. 
    entry: {
      'polyfills': './src/polyfills.ts',
      'vendor': './src/vendor.ts',
      'app': './src/main.ts'
    },

    plugins: [

      // The entry blocks specified in the name property below are given a priority (right to left).
      // Dependencies found in multiple blocks will be assigned based on the priority below.
      // Example: @angular/core will be found in both the vendor.ts & multiple app files, 
      // but the order specified below indicates that it will be bundled into the vendor.js file. 
      new webpack.optimize.CommonsChunkPlugin({
        name: ['app', 'vendor', 'polyfills']
      }),

      // Specifies which html file to insert the final bundled file references.
      new HtmlWebpackPlugin({
        template: 'src/index.html'
      }),

      new ExtractTextPlugin({
        filename: "[name].css"
      })

    ],

    // Specifies which file types to analyze, in order of process (right to left).
    resolve: {
      extensions: ['.ts', '.min.js', '.js']
    },

    module: {
      // Specifies the pattern to search for each file type, and which webpack loader to use on each discovered file.
      // Example, *.ts files are processed with both the ts-loader and angular2-template-loader (all downloaded via the npm manifest: package.json)
      // Note that the ts-loader will feed all discovered TypeScript files into the TypeScript compiler.
      // The TypeScript compiler options are still configured via ./tsconfig.json.
      // Note also the that ts rule is conditionally applied below.
      rules: [
        {
          enforce: 'pre',
          test: /\.ts$/,
          loader: 'tslint-loader',
          exclude: /(node_modules)/,
          options: {
            configFile: 'tslint.json'
          }
        },

        {
          test: /\.html$/,
          use: [{ loader: 'html-loader' }]
        },
        {
          test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
          use: [{ loader: 'file-loader' }]
        },

        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: "css-loader"
          })
        }
      ]
    }
  }

  if (env.production) {

    // The production build will use the Angular Ahead Of Time (AOT) version of the main entry file.
    config.entry.app = './src/main.aot.ts';

    config.output = {
      path: path.resolve(__dirname, './dist/prod'),
      filename: '[name].js',
      chunkFilename: '[id].chunk.js'
    };

    config.plugins.push(

      // The production build will use the AotPlugin to invoke the @angular/compile-cli tool.
      new ngToolsWebpack.AotPlugin({
        tsConfigPath: 'tsconfig.json',
        entryModule: path.resolve(__dirname, './src/app/app.module#AppModule')
      }),

      // The production build will minify and mangle the source code.
      new webpack.optimize.UglifyJsPlugin({
        beautify: false,
        compress: {
          warnings: false,
          screw_ie8: true
        },
        comments: false,
        mangle: {
          screw_ie8: true,
          keep_fnames: true
        }
      })
    );

    // The production build will use the @ngtools/webpack loader to prepare the bundles for the AotPlugin.
    config.module.rules.push(
      {
        test: /\.ts$/,
        exclude: [path.resolve(__dirname, './src/main.ts')], // Do not process the non-aot version of the entry file.
        use: [
          { loader: '@ngtools/webpack' },
          { loader: 'angular2-template-loader' },
          { loader: 'angular-router-loader?aot=true&genDir=./src/aot' }
        ]
      }
    );

  } else {

    config.output = {
      path: path.resolve(__dirname, './dist/dev'),
      filename: '[name].js',
      chunkFilename: '[id].chunk.js'
    };

    // Enable the generation of ts file source maps.
    config.devtool = 'source-map';

    config.module.rules.push(
      {
        test: /\.ts$/,
        exclude: [path.resolve(__dirname, './src/main.aot.ts')],
        use: [
          { loader: 'ts-loader' },
          { loader: 'angular2-template-loader' },
          { loader: 'angular-router-loader' }
        ]
      }
    );

  }
  return config;
};