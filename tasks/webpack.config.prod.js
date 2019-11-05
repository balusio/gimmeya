const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const packageJ = require('../package.json');

module.exports = {
  entry: path.resolve(__dirname, '../app/main.js'),
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
    filename: 'dist.bundle.js',
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: false // set to true if you want JS source maps
      }),
    ];
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [{
          loader: 'eslint-loader',
          options: {
            emitError: false,
          },
        }],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        use: [
          'babel-loader',
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        exclude: /node_modules/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'assets/images',
          },
        }],
      },
    ],
  },
  resolve: {
    alias: {
      pages: path.resolve(__dirname, '../app/pages'),
      components: path.resolve(__dirname, '../app/components'),
      containers: path.resolve(__dirname, '../app/containers'),
      utils: path.resolve(__dirname, '../app/utils'),
      assets: path.resolve(__dirname, '../app/assets'),
      services: path.resolve(__dirname, '../app/services'),
    },
    extensions: ['.js', '.jsx'],
    modules: ['node_modules'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: packageJ.description,
      baseUrl: process.env.BASE_URL || '/',
      minify: {
        collapseWhitespace: true,
      },
      hash: true,
      template: path.resolve(__dirname, 'index.ejs'),
    }),
  ]

};
