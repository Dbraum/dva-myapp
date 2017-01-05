import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin'
import webpack from 'webpack';


import {
  join
} from 'path';

export default {

  devtool: '#source-map',

  entry: {
    index: [
      'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000',
      './src/index.js'
    ],
  },

  output: {
    filename: '[name].js',
    path: join(__dirname, './dist'),
    publicPath: '/',
  },

  module: {
    loaders: [{
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      }, {
        test: /\.(jpg|png|gif|webp)$/,
        loader: 'url?limit=8000'
      }, {
        test: /\.html$/,
        loader: 'html?minimize=false'
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader']
      },
    ]
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
      filename: '../views/dev/index.html',
      template: './views/tpl/index.tpl.html'
    }),
  ],
};
