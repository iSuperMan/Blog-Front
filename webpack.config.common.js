const path = require('path');

module.exports = {
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js',
		publicPath: '/',
	},

	resolve: {
		extensions: ['*', '.jsx', '.js', '.json', '.css'],
		modules: ['node_modules', path.resolve(__dirname, 'app')],
	},

	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
			},
		],
	},
};
