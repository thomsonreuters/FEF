// All base configuration items. This file is combined with the appropriate target build config file (dev, prod, etc.)
var webpack = require('webpack');
var path = require('path');
var ngToolsWebpack = require('@ngtools/webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var CompressionPlugin = require("compression-webpack-plugin");
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

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
      'legacy-vendor': './src/legacy/legacy-vendor.ts',
      'vendor': './src/vendor.ts',
      'fruit15': './src/legacy/legacy.ts',
      'app': './src/main.ts'
    },

    // Specifies which file types to analyze, in order of process (right to left).
    resolve: {
      extensions: ['.js', '.min.js', '.ts'],
      alias: {
        "@angular/upgrade/static": "@angular/upgrade/bundles/upgrade-static.umd.js"
      }
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
          exclude: [path.resolve(__dirname, './src/index.html')],
          use: [{ loader: 'html-loader' }]
        },

        {
          test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
          use: [{ loader: 'file-loader' }]
        },

        {
          test: /\.css$/,
          use: [
            { loader: 'style-loader' },
            { loader: 'css-loader' }
          ]
        }
      ]
    },

    plugins: [

      // The entry blocks specified in the name property below are given a priority (right to left).
      // Dependencies found in multiple blocks will be assigned based on the priority below.
      // Example: @angular/core will be found in both the vendor.ts & multiple app files, 
      // but the order specified below indicates that it will be bundled into the vendor.js file. 
      new webpack.optimize.CommonsChunkPlugin({
        name: ['app', 'fruit15', 'vendor', 'legacy-vendor', 'polyfills']
      }),

      // Specifies which html file to insert the final bundled file references.
      new HtmlWebpackPlugin({
        template: 'src/index.html'
      }),

      new CopyWebpackPlugin([
        {
          from: path.resolve(__dirname, 'src/data'),
          to: 'data'
        }
      ]),

      // new BundleAnalyzerPlugin()
    ]

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
        tsConfigPath: 'tsconfig.aot.json',  // Using an alternate tsconfig that exludes the AngularJS path.
        entryModule: path.resolve(__dirname, './src/app/app.module#AppModule')
      }),

      // TODO: Enable minification. The current minification configuration breaks the AOT version of the fruit-detail component.
      // The production build will minify and mangle the source code.
      // new webpack.optimize.UglifyJsPlugin({
      // beautify: false,
      // compress: {
      //   warnings: false,
      //   screw_ie8: true
      // },
      // comments: false,
      // mangle: {
      //   screw_ie8: true,
      //   keep_fnames: true
      // }
      // }),

      new CompressionPlugin({
        asset: "[path].gz[query]",
        algorithm: "gzip",
        test: /\.(js|html)$/,
        threshold: 10240,
        minRatio: 0.8
      })

    );

    // The production build will use the @ngtools/webpack loader to prepare the bundles for the AotPlugin.
    config.module.rules.push({
      test: /\.ts$/,
      exclude: [
        path.resolve(__dirname, './src/main.ts') // Do not process the non-aot version of the entry file.
      ],
      use: [
        { loader: '@ngtools/webpack' },
        { loader: 'angular2-template-loader' },
        { loader: 'angular2-router-loader' }
      ]
    });

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
        exclude: [
          path.resolve(__dirname, './src/main.aot.ts'),
          path.resolve(__dirname, './src/app/**/*.html')
        ],
        use: [{ loader: 'ts-loader' }]
      }
    );

  }

  return config;
};