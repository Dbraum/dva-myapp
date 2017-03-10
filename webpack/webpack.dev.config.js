import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin'
import webpack from 'webpack';

//参考 https://www.npmjs.com/package/progress-bar-webpack-plugin
import ProgressBarPlugin from 'progress-bar-webpack-plugin';

import {join} from 'path';

export default {

	devtool: '#source-map',

	entry: {
		index: ['webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000', './src/index.js']
	},
	node: {
		fs: "empty"
	},
	output: {
		filename: '[name].js',
		path: join(__dirname, './dist'),
		publicPath: '/'
	},

	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			}, {
				test: /\.(jpg|png|gif|webp)$/,
				loader: 'url?limit=8000'
			}, {
				test: /\.html$/,
				loader: 'html?minimize=false'
			}, {
				test: /\.css$/,
				loaders: [
					'style-loader', 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64' +
					':5]!postcss-loader'
				]
			}, {
				test: /\.less$/,
				exclude: /node_modules/, //这个less loader 用于本地，Support CSS Modules
				loaders: [
					'style-loader', 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64' +
					':5]!postcss-loader',
					'less-loader'
				]
			}, {
				test: /\.less$/,
				loader: `style!css!less`,
				include: /node_modules/ //这个less loader 用于node_modules,不使用 CSS Modules
			}, {
				test: /\.css$/,
				loader: `style!css`,
				include: /node_modules/ //这个csc loader 用于node_modules,不使用 CSS Modules
			}
		]
	},

	plugins: [
		new webpack
			.optimize
			.OccurenceOrderPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin(),
		new ProgressBarPlugin(),
		new HtmlWebpackPlugin({filename: '../views/dev/index.html', template: './views/tpl/index.tpl.html'})
	]
};
