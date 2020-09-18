'use strict';
const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const sets = require('./src/config/sets.js')

const config = process.env.mode === 'production' ? sets.pro : sets.dev

module.exports = {
	entry: {
		common:['vue'],
		index:'./src/index.js'
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		publicPath:config.PubDir,
		filename: config.AssetsDir+'/js/[name].js',
	},
	resolve:{
		alias:{
			'vue$': 'vue/dist/vue.esm.js',
			'~': path.resolve('src'),
		}
	},
	plugins:[
		new CleanWebpackPlugin(),
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new VueLoaderPlugin(),
		new HtmlWebpackPlugin({
			filename:"index.html",
			template:"./src/index.html",
			chunks:['index','common'],
			inject: true,
			minify: {
				html5: true,
				collapseWhitespace: true,
				preserveLineBreaks: false,
				minifyCSS: true,
				minifyJS: true,
				removeComments: true
			}
		}),
		new MiniCssExtractPlugin({
			filename:"css/[name].css",
			chunkFilename:"css/[name].css",
			ignoreOrder: false
		}),
		new webpack.DefinePlugin({
			'process.env':{
				BaseConfig:JSON.stringify(config)
			}
		})
	],
	devtool:config.devtool,
	module:{
		rules:[
			{
				test:/\.vue$/,
				loader:'vue-loader'
			},
			{
				test: /\.(png|jpeg|jpg|gif|ico|woff|woff2|eot|ttf|otf)$/,
				use:[{
					loader:'url-loader',
					options:{
						name:'[name].[ext]',
						outputPath:config.AssetsDir+'/img/'
					}
				}]
			},
			{
				test:/\.(sa|sc|c)ss$/i,
				use:[
					MiniCssExtractPlugin.loader,
					'css-loader',
					'sass-loader'
				]
			},
			{
				test: /\.html$/,
				use:[{
					loader: 'html-loader',
					options:{
						minimize: true
					}
				}]
			},
			{
				test: /\.js$/,
				loader: 'babel-loader',
				// exclude:/node_modules/
			}
		]
	}
};