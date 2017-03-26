const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
    devtool: 'source-map',

    entry: [
        'bootstrap-loader',
        'bootstrap-loader/extractStyles'
    ],

    output: {
        publicPath: '/',
    },

    module: {
        loaders: [{
            test: /\.css$/,
            // TODO fix production configuration
            // loader: ExtractTextPlugin.extract({
            //     fallback: 'style?sourceMap',
            //     use: 'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]!postcss'
            // })
            loaders: [
                'style?sourceMap',
                'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]',
                'postcss'
            ]
        }],
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"',
            },
            __DEVELOPMENT__: false,
        }),
        new ExtractTextPlugin('bundle.css', { allChunks: true }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
            },
        })
    ],
}
