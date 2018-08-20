var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var commonConfig = require('./webpack.common.js');
var root = require('./root-helper');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = webpackMerge(commonConfig, {
  devtool: 'cheap-source-map',
  output: {
    path: root.root('dist'),
    publicPath: '/',
    filename: '[name].js',
    chunkFilename: '[id].chunk.js'
  },
  
  module: {
    rules: [
      {
        test: /Cesium\.js$/,
        loader: 'script-loader'
      }
    ]
  },
  
  plugins: [
    new ExtractTextPlugin('[name].css'),
    new CopyWebpackPlugin([
       { from: './assets/**/*', context: 'demo', to: './' },
    ])
  ],
  
  devServer: {
    historyApiFallback: true,
    stats: 'minimal'
  }
});