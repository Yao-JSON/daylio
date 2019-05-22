const webpack = require('webpack');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const baseResolve = require('./webpack.config.base.resolve');
const baseLoaders = require('./webpack.config.base.loaders');
const baseCacheGroups = require('./webpack.config.base.cachegroups');

module.exports = {
  mode: 'development',
  target: 'node',
  devtool: false,
  watchOptions: {
    ignored: /node_modules/,
    poll: 1000
  },
  resolve: baseResolve,
  module: { rules: baseLoaders },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            drop_console: false
          },
          output: {
            comments: false
          }
        },
        parallel: true
      })
    ],
    concatenateModules: false,
    // minimize: false,
    concatenateModules: false,
    splitChunks: {
      cacheGroups: baseCacheGroups
    }
  },
  plugins: [
    // new BundleAnalyzerPlugin({
    //   generateStatsFile: false
    // }),
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(process.env.NODE_ENV === 'production')
    })
  ]
};
