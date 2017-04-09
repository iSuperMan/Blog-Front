const webpack = require('webpack');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.config.common');

module.exports = merge(commonConfig, {
	devtool: 'cheap-module-eval-source-map',

	entry: [
		'react-hot-loader/patch',
		'webpack-dev-server/client?http://localhost:3000',
		'webpack/hot/only-dev-server',
		`bootstrap-loader/lib/bootstrap.loader?configFilePath=${__dirname}/.bootstraprc!bootstrap-loader/no-op.js`,
		'./app/index.jsx',
	],

	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					{
						loader: 'style-loader',
						options: {
							sourceMap: true,
						},
					},
					{
						loader: 'css-loader',
						options: {
							modules: true,
							importLoaders: 1,
							localIdentName: '[path]___[name]__[local]___[hash:base64:5]',
						},
					},
					'postcss-loader',
					'sass-loader',
				],
			},
		],
	},

	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"development"',
			},
			__DEVELOPMENT__: true,
		}),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NamedModulesPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
	],

	devServer: {
		host: 'localhost',
		port: 3000,
		historyApiFallback: true,
		hot: true,
	},
});
