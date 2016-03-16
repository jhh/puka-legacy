const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const nodeEnv = process.env.NODE_ENV || 'development';
const isProd = nodeEnv === 'production';

module.exports = {
  devtool: isProd ? 'hidden-source-map' : '#inline-source-map',
  devServer: {
    historyApiFallback: {
      index: '/index.html',
      verbose: true
    }
  },
  entry: {
    app: './src/index.js',
    vendor: ['axios', 'moment', 'react', 'react-dom', 'react-router']
  },
  output: {
    filename: '/main.js',
    path: __dirname + '/public',
    sourceMapFilename: '[hash].map'
  },
  module: {
    loaders: [
      {
        loader: 'babel',
        test: /\.jsx?$/,
        exclude: /node_modules/,
        query: {
          plugins: ['transform-object-rest-spread']
        }
      },
      { loaders: ['style', 'css'],
        test: /\.css$/
      },
      {
        loader: 'file',
        test: /\.(eot|woff|ttf|svg)$/,
        include: [
          path.resolve(__dirname, 'assets')
        ],
        query: {
          name: '/[path][name].[ext]',
          context: path.resolve(__dirname, 'assets')
        }
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
    new webpack.IgnorePlugin(/^\.\/locale$/, [/moment$/]),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(nodeEnv)
      }
    }),
     new webpack.optimize.CommonsChunkPlugin('vendor', '/vendor.bundle.js')
  ]
}
