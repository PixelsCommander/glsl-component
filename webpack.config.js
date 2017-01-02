var webpack = require('webpack');
var path = require('path');
var uglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
//var Visualizer = require('webpack-visualizer-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: './dist',
    filename: 'glsl-component.js',
    sourceMapFilename: "main.js.map"
  },
  devtool: "#source-map",
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        //plugins: ['transform-runtime'],
        presets: ['es2015'],
      }
    }]
  },
  plugins: [
    new uglifyJsPlugin({
      minimize: true,
      sourceMap: true,
      output: {
        comments: false
      },
      compressor: {
        warnings: false
      }
    })
  ]
}
