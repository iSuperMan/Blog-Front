const webpack = require('webpack')
const webpackConfig = require('./common.config')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')

const compiler = webpack(webpackConfig);

module.exports = app => {
	app.use(webpackDevMiddleware(compiler, {
		noInfo: true, publicPath: webpackConfig.output.publicPath,
	}));

	app.use(webpackHotMiddleware(compiler, {
		log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000
	}));
}