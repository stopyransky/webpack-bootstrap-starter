const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require('webpack');
const path = require("path");
const bootstrapEntryPoints = require('./webpack.bootstrap.config');
const glob = require('glob');
const PurifyCSSPlugin = require('purifycss-webpack');

const isProd = process.env.NODE_ENV === 'production'; //true or false

const cssDev = [
	'style-loader',
	'css-loader?sourceMap',
	'sass-loader',
	{
		loader: 'sass-resources-loader',
		options: {

			resources: [
                './src/styles/base/resources.scss'
            ],
		},
	}];
const cssProd = ExtractTextPlugin.extract({
    fallback: 'style-loader',
    use: ['css-loader','sass-loader', {
		loader: 'sass-resources-loader',
		options: {

			resources: [
				'./src/styles/base/resources.scss'
			],
		},
	}],
    publicPath: '/public'
})
const cssConfig = isProd ? cssProd : cssDev;

const bootstrapConfig = isProd ? bootstrapEntryPoints.prod : bootstrapEntryPoints.dev;

module.exports = {
    entry: {
        app: './src/app.js',
        bootstrap: bootstrapConfig
    },
    output: {
        path: path.resolve(__dirname, "public"),
        filename: '[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(css|scss)$/,
                use: cssConfig
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [
                  'file-loader?name=images/[name].[ext]',
                  'image-webpack-loader?bypassOnDebug'
                ]
            },
            { test: /\.(woff2?)$/, use: 'url-loader?limit=10000&name=fonts/[name].[ext]' },
            { test: /\.(ttf|eot)$/, use: 'file-loader?name=fonts/[name].[ext]' },

            { test:/bootstrap-sass[\/\\]assets[\/\\]javascripts[\/\\]/, use: 'imports-loader?jQuery=jquery' }
        ]
    },
	resolve: {
		modules : [
			// shortcuts for imports
		  'node_modules',
		  'src/api',
		  'src/components',
		  'src/redux'

		],
		extensions: [ '.js', '.jsx' ]
	},
	devServer: {

	    contentBase: path.join(__dirname, "public"),
        compress: true,
        hot: true,
        open: true,
        stats: 'errors-only',
		openPage: '' // <-- this avoids webpack-dev-server bug
		// https://github.com/webpack/webpack-dev-server/issues/960


	},

	plugins: [

		new HtmlWebpackPlugin({
            title: 'Project Demo',
            hash: true,
            template: './src/index.html'
        }),

		new ExtractTextPlugin({
            filename: '/css/[name].css',
            disable: !isProd,
            allChunks: true
        }),

		new webpack.HotModuleReplacementPlugin(),

		new webpack.NamedModulesPlugin(),

        new PurifyCSSPlugin({
            paths: glob.sync(path.join(__dirname, 'src/*.html'))
        })
    ]
}
