var merge = require('webpack-merge');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var base = require('./webpack.base.conf');

module.exports = merge(base, {
    output: {
        // 这个表示输出目录
        path: path.join(__dirname, '../dist'),
        publicPath: '/',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style-loader","css-loader")
            }
        ]
    },
    plugins: [
        // 返回的是一个路径
        new ExtractTextPlugin('/css/[name].[contenthash].css'),
        // https://github.com/ampedandwired/html-webpack-plugin
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true
        })
    ]
});
