var express = require('express');
var webpack = require('webpack');
var WebpackDevMiddleware = require('webpack-dev-middleware');

// 根据环境变量判断是否开发环境或者正式环境
// var config = process.env.NODE_ENV === 'development' 
//     ? require('./webpack.dev.conf')
//     : require('./webpack.prod.conf');

var config = require('./webpack.dev.conf');

var compiler = webpack(config);

var app = express();

app.use(WebpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
    stats: {
        colors: true
    }
}));

var server = app.listen(8080, () => {
    const {port} = server.address();

    console.log('Dev Server is listening at port: %s', port);
});
