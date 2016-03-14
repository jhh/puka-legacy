const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const nodeEnv = process.env.NODE_ENV || 'development';
const isProd = nodeEnv === 'production';

module.exports = {
  devtool: isProd ? 'hidden-source-map' : '#inline-source-map',
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
          path.resolve(__dirname, 'src'),
        ],
        query: {
          presets: ['es2015', 'react', 'babel-preset-stage-3'],
          plugins: ['transform-object-rest-spread']
        }
      },
      { loaders: ['style', 'css'],
        test: /\.css$/
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Puka',
      template: path.resolve(__dirname, 'src', 'index.html')
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, [/moment$/])
  ]
}
