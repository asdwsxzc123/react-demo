const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
var webpack = require('webpack');
// 导入非 webpack 自带默认插件
var ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
module.exports = {
  entry: {
    app: path.resolve(__dirname, './src/app.jsx')
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].[hash].js',
    publicPath: '/dist/'
  },
  devServer: {
    port: 8086,
    clientLogLevel: 'warning',
    historyApiFallback: {
      index: '/dist/index.html'
    },
    proxy: {
      '/api': {
        // target: 'http://localhost:9000',
        target: 'http://adminv2.happymmall.com',
        changeOrigin: true, 
        pathRewrite: {
          '^/api': ''
        },
      },
    }
  },
  resolve: {
    extensions: ['.js','.jsx', '.json', '.scss'],
    alias: {
      page: path.resolve(__dirname, 'src/page'),
      component: path.resolve(__dirname, 'src/component'),
      util: path.resolve(__dirname, 'src/util'),
      scss: path.resolve(__dirname, 'src/scss'),
      service: path.resolve(__dirname, 'src/service'),
    }
  },
  module: {
    rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['env'],
              filename: 'js/'
            }
          }
        },
        {
          test: /\.jsx$/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['env', 'react'],
              filename: 'js/'
            }
          }
        },
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            //如果需要，可以在 sass-loader 之前将 resolve-url-loader 链接进来
            use: ['css-loader']
          })
        },
        {
          test: /\.scss$/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            //如果需要，可以在 sass-loader 之前将 resolve-url-loader 链接进来
            use: ['css-loader', 'sass-loader']
          })
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          use: [
            'url-loader'
          ]
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          use: [
            'url-loader'
          ]
        }
    ],
  },
  plugins: [
    // clear
    // new CleanWebpackPlugin(['dist']),
    // html
    new HTMLPlugin({
      template: 'src/index.html',
      favicon: './favicon.ico'
    }),
    // css抽离
    new ExtractTextPlugin({
      filename: 'css/[name].css'
    }),
    // 构建优化插件
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'js/[name]-[hash].min.js',
    }),
  ]
}