'use strict';
const path = require('path')
const {merge} = require('webpack-merge')
const common = require('./webpack.config')

module.exports = merge(common, {
	devServer:{
		contentBase:path.join(__dirname,'dist'),
		compress:true,
		hot: true,
	},
	mode: '"development"'
})