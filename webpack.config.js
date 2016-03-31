const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const nodeEnv = process.env.NODE_ENV || 'development';
const isProd = nodeEnv === 'production';

module.exports = {
  devtool: isProd ? 'hidden-source-map' : '#inline-source-map',
  devServer: {
    historyApiFallback: true,
  },
  entry: isProd
    ? ['./src/index.js']
    : [
      'webpack-dev-server/client?http://0.0.0.0:8080', // WebpackDevServer host and port
      'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
      './src/index.js',
    ],
  output: {
    filename: '/main.js',
    path: `${__dirname}/public`,
    sourceMapFilename: '[hash].map',
  },
  module: {
    loaders: [
      {
        loaders: isProd ? ['babel'] : ['react-hot', 'babel'],
        test: /\.jsx?$/,
        exclude: /node_modules/,
      },
      { test: /\.css$/,
        loaders: [
          'style',
          'css?' + JSON.stringify({       // eslint-disable-line prefer-template
            modules: true,
            importLoaders: 1,
            localIdentName: '[name]__[local]___[hash:base64:5]',
          }),
        ],
        include: path.resolve(__dirname, 'src'),
      },
      {
        test: /\.css$/,
        loaders: ['style', 'css'],
        include: path.resolve(__dirname, 'assets'),
      },
      {
        loader: 'file',
        test: /\.(eot|woff|ttf|svg)$/,
        include: [
          path.resolve(__dirname, 'assets'),
        ],
        query: {
          name: '/[path][name].[ext]',
          context: path.resolve(__dirname, 'assets'),
        },
      },
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Puka',
      template: path.resolve(__dirname, 'src', 'index.html'),
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, [/moment$/]),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(nodeEnv),
      },
    }),
    isProd ? new webpack.optimize.OccurenceOrderPlugin(true) : f => f,
    new webpack.ProvidePlugin({
      fetch: 'imports?this=>global!exports?global.fetch!whatwg-fetch',
    }),
  ],
};
