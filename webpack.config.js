const path = require('path'); 
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      { 
        test: /\.js$/, // регулярное выражение, которое ищет все js файлы
        use: { loader: "babel-loader" }, // весь JS обрабатывается пакетом babel-loader
        exclude: /node_modules/ // исключает папку node_modules
      },
      {
        test: /\.css$/, // применять это правило только к CSS-файлам
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'] // к этим файлам нужно применить пакеты, которые мы уже установили
      },
      {
        test: /\.(png|jpe?g|gif|ico|svg)$/, 
        use: [
          'file-loader?name=./images/[name].[ext]',
          {
            loader: 'image-webpack-loader',
          }
        ]
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/, 
        loader: 'file-loader?name=./fonts/[name].[ext]'
      }
    ]
  },
  plugins: [ 
    new MiniCssExtractPlugin({
      filename: 'style.[contenthash].css'
    }),
    new HTMLWebpackPlugin({
      inject: false, // стили НЕ нужно прописывать внутри тегов
      template: './src/index.html', // откуда брать образец для сравнения с текущим видом проекта
      filename: 'index.html' // имя выходного файла, то есть того, что окажется в папке dist после сборки
    }),
    new WebpackMd5Hash(),
    new CleanWebpackPlugin()
  ]
};