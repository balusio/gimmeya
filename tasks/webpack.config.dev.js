const path = require('path');
const package = require('../package.json');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry:  path.resolve(__dirname, '../app/main.js'),
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
    filename: 'dist.bundle.js',
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
            outputPath:'assets/images'
          }
        }
          
        ]
      }
    ],
  },
  resolve: {
    alias: {
      pages: path.resolve(__dirname, '../app/pages'),
      components: path.resolve(__dirname, '../app/components'),
      containers: path.resolve(__dirname, '../app/containers'),
      utils: path.resolve(__dirname, '../app/utils')
    },
    extensions: ['.js','.jsx'],
    modules: ["node_modules"],
  },
  plugins: [
     new HtmlWebpackPlugin({
      title: package.description,
      baseUrl: process.env.BASE_URL || '/',
      minify: {
        collapseWhitespace: true,
      },
      hash: true,
      template: path.resolve(__dirname,'index.ejs'),
    })
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 4200
  }
};
