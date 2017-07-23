var webpackConfig = require('./webpack.config.js');

module.exports = function(config) {
	config.set( {
		browsers: ['Chrome'],
		singleRun : true,
		frameworks: ['mocha'],
		files: [
			'node_modules/jquery/dist/jquery.min.js',
			'node_modules/bootstrap/dist/js/bootstrap.min.js',
			'src/tests/**/*.test.jsx'
		],
		preprocessors: {
			'src/tests/**/*.test.jsx' : ['webpack', 'sourcemap']
		},
		reporters: ['mocha'],
		client  : {
			mocha : {
				timeout: '50000',
			}
		},
		captureTimeout: 60000,
		browserDisconnectTimeout : 10000,
		browserDisconnectTolerance : 1,
		browserNoActivityTimeout : 60000,//by default 10000
		webpack : webpackConfig,
		webpackServer : {
			noInfo : true
		}
	});
}
