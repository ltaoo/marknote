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
            'react': path.join(nodeModulesPath, '/react/dist/react.js'),
            'react-dom': path.join(nodeModulesPath, '/react-dom/dist/react-dom.js')
        }
    },
    module: {
        loaders: [
            {
                test: /\.js?$/, 
                loader: 'babel',
                query: {
                    presets: [
                        require.resolve('babel-preset-es2015'),
                        require.resolve('babel-preset-react')
                    ],
                    cacheDirectory: true
                }   
            },
            {
                test: /\.css$/,
                loader: 'style!css'
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