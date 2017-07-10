/* eslint prefer-template: "off" */
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// const PRODUCTION_API_ENDPOINT = 'https://polar-crag-16716.herokuapp.com/v0/bookmarks';
const PRODUCTION_API_ENDPOINT = 'http://puka-api.j3ff.io/v0/bookmarks';
const DEV_API_ENDPOINT = `http://${process.env.PUKA_DEV_API_HOST || 'localhost'}:8088/v0/bookmarks`;

module.exports = {
  devtool: process.env.NODE_ENV === 'production' ? 'hidden-source-map' : '#inline-source-map',
  entry: {
    app: './src/index.js',
  },
  output: {
    filename: '/main.[hash].js',
    path: path.resolve(__dirname, '..', 'output'),
    sourceMapFilename: '[hash].map',
  },
  module: {
    loaders: [
      {
        loaders: process.env.NODE_ENV === 'production' ? ['babel'] : ['react-hot', 'babel'],
        test: /\.jsx?$/,
        include: path.resolve(__dirname, '..', 'src'),
      },
      {
        test: /\.css$/,
        loaders: [
          'style',
          'css?' + JSON.stringify({
            modules: true,
            importLoaders: 1,
            localIdentName: '[name]__[local]___[hash:base64:5]',
          }),
        ],
        include: path.resolve(__dirname, '..', 'src'),
      },
      {
        test: /\.css$/,
        loaders: ['style', 'css'],
        include: path.resolve(__dirname, '..', 'assets'),
      },
      {
        loader: 'file',
        test: /\.(eot|woff|ttf|svg)$/,
        include: [
          path.resolve(__dirname, '..', 'assets'),
        ],
        query: {
          name: '/[path][name].[ext]',
          context: path.resolve(__dirname, '..', 'assets'),
        },
      },
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  plugins: process.env.NODE_ENV === 'production' ? [
    new HtmlWebpackPlugin({
      title: 'Puka',
      template: path.resolve(__dirname, '..', 'src', 'index.html'),
    }),
    new webpack.ProvidePlugin({
      fetch: 'imports?this=>global!exports?global.fetch!whatwg-fetch',
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, [/moment$/]),
    new webpack.DefinePlugin({
      PUKA_API_ENDPOINT: JSON.stringify(PRODUCTION_API_ENDPOINT),
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin(),
  ] : [
      new HtmlWebpackPlugin({
        title: 'Puka Development',
        template: path.resolve(__dirname, '..', 'src', 'index.html'),
      }),
      new webpack.ProvidePlugin({
        fetch: 'imports?this=>global!exports?global.fetch!whatwg-fetch',
      }),
      new webpack.DefinePlugin({
        PUKA_API_ENDPOINT: JSON.stringify(DEV_API_ENDPOINT),
        'process.env': {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV),
          PUKA_DEV_API_HOST: JSON.stringify(process.env.PUKA_DEV_API_HOST),
        },
      }),
    ],
};
