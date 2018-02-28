const
	HtmlWebpackPlugin = require('html-webpack-plugin'),
	BabelMinifyPlugin = require('babel-minify-webpack-plugin'),
	ExtractTextPlugin = require('extract-text-webpack-plugin'),
	path = require('path'),
	webpack = require('webpack');

module.exports = {
	entry: {
		main: [path.resolve(__dirname, 'src/app.js')]
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				loader: 'babel-loader',
			}, {
				test: /\.vue$/,
				loader: 'vue-loader',
				options: {
					extractCSS: true,
				}
			}, {
				test: /\.s?css$/,
				use: ['style-loader', 'css-loader', 'sass-loader']
			}, {
				test: /\.(gif|png|jpg|woff2?|)$/,
				loader: 'url-loader?limit=8192&name=[name].[ext]'
			}, {
				test: /\.svg$/,
				include: [/styles[\\\/]layouts[\\\/]images/],
				loader: 'file-loader?name=[name].[ext]'
			}, {
				test: /\.svg$/,
				exclude: [/styles[\\\/]layouts[\\\/]images/],
				loader: 'svg-sprite-loader'
			}
		]
	},
	output: {
		path: path.resolve(__dirname,'dist/assets'),
		filename: '[name].js',
		chunkFilename: '[name].js'
	},
	plugins: [
		new webpack.DefinePlugin({
			"process.env": {
				BROWSER: JSON.stringify(true),
				NODE_ENV: JSON.stringify("production")
			}
		}),
		new BabelMinifyPlugin(),
		new ExtractTextPlugin("[name].css"),
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, 'src/index.html')
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendors',
			minChunks: module => { return module.context && module.context.indexOf('node_modules') !== -1; }
		}),
		new webpack.NoEmitOnErrorsPlugin()
	],
	resolve: {
		alias: {
			'wch-flux-sdk': path.resolve(__dirname, './wch-flux-sdk'),
			'styles': path.resolve(__dirname, './styles')
		},
		extensions: [ '.js', '.vue', '.scss' ]
	},
    "devServer": {
        contentBase: path.join(__dirname, 'dist/assets'),
        "historyApiFallback": true,
        "https": false
    }
};