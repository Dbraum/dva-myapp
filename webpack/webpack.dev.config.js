import ExtractTextPlugin from 'extract-text-webpack-plugin';
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
    }, {
      test: /\.css$/,
      exclude: /node_modules/,
      loader: ExtractTextPlugin.extract(
        'css-loader?sourceMap&modules&localIdentName=[local]___[hash:base64:5]'
      ),
    }]
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin('[name].css', {
      disable: false,
      allChunks: true,
    }),
  ],
};
