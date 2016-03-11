const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: '#inline-source-map',
  entry: [
    './src/index.js'
  ],
  output: {
    filename: 'main.js',
    path: __dirname + '/build'
  },
  module: {
    loaders: [
      {
        loader: "babel",
        test: /\.jsx?$/,
        include: [
          path.resolve(__dirname, "src"),
        ],
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx'] 
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Puka'
    })
  ]
};
