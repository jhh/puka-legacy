const hostname = 'localhost';
const port = 8000;

module.exports = {
  devtool: 'eval-source-map',
  entry: 'mocha!./test/index.js',
  output: {
    filename: 'test.build.js',
    path: 'test/',
    publicPath: `http://${hostname}:${port}/test`,
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel-loader'],
        exclude: [
          /node_modules/,
          /output/,
        ],
      },
      {
        test: /(\.css|\.less)$/,
        loader: 'null-loader',
        exclude: [
          /build/,
        ],
      },
      {
        test: /(\.jpg|\.jpeg|\.png|\.gif)$/,
        loader: 'null-loader',
      },
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  devServer: {
    host: hostname,
    port,
  },
};
