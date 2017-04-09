const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.config.common');

module.exports = merge(commonConfig, {
	devtool: 'source-map',

	entry: [
		`bootstrap-loader/lib/bootstrap.loader?configFilePath=${__dirname}/.bootstraprc!bootstrap-loader/no-op.js`,
		'./app/index.jsx',
	],

	module: {
		rules: [
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [
						{
							loader: 'css-loader',
							options: {
								modules: true,
								importLoaders: 1,
								localIdentName: '[path]___[name]__[local]___[hash:base64:5]',
							},
						},
						'resolve-url-loader',
						'postcss-loader',
						'sass-loader',
					],
				}),
			},
		],
	},

	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"production"',
			},
			__DEVELOPMENT__: false,
		}),
		new ExtractTextPlugin({
			filename: 'bundle.css',
			allChunks: true,
		}),
		new webpack.optimize.UglifyJsPlugin({
			sourceMap: true,
			comments: false,
		}),
	],
});
