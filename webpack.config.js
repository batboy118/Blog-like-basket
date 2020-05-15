const path = require('path');
const webpack = require('webpack');

module.exports = {
	entry: './src/index.js',
	output : {
		filename:'bundle.js',
		path:path.resolve(__dirname, 'dist'),
		publicPath: '/dist'
	},
	module:{
		rules:[{
			test:/\.js$/,
			include: path.resolve(__dirname, 'src'),
			use:{
				loader : 'babel-loader',
				options : {
					presets : [
						['env',{
						'targets' : {
							'browsers':  ["last 2 versions"]
						},
						"debug" : true
					}]
				]
				}
			}
		}]
	}
}
