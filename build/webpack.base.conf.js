var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var nodeModulesPath = path.join(__dirname, '../node_modules');

module.exports = {
    entry: './src/index.js',
    output: {
        // 这个表示输出目录
        path: '/',
        publicPath: '/',
        filename: 'bundle.js'
    },
    resolve: {
        alias: {
            // 'markdown-it': path.join(__dirname, '../node_modules/markdown-it/dist/markdown-it.min.js')
        }
    },
    module: {
        loaders: [
            {
                test: /\.js?$/, 
                exclude: /(node_modules|bower_components)/,
                loader: 'babel',
                query: {
                    presets: ['es2015', 'react'],
                    cacheDirectory: true
                }   
            },
            {
                test: /\.css$/,
                loader: 'style!css'
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'url-loader?limit=10000&mimetype=application/font-woff'
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader'
            }
        ]
    },
    plugins: [
        // https://github.com/ampedandwired/html-webpack-plugin
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true
        })
    ]
};