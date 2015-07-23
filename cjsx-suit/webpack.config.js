var webpack             = require('webpack'),
    ExtractTextPlugin   = require('extract-text-webpack-plugin');

var app_path    = __dirname + '/app',
    build_path  = 'public/';

module.exports = {
    context: app_path,
    entry: {
//        outcomes: './js/outcomes.cjsx'
        slider: './js/slider/slider-init.cjsx'
    },
    output: {
        path: build_path,
        filename: '[name].min.js'
    },
    module: {
        loaders: [
            {
                test: /\.cjsx$/,
                exclude: /node_modules/,
                loader: 'coffee!cjsx'
            },
            {
                test: /^((?!(\.extract)).)+\.less$/,
                loader: 'style!css!less'
            },
            {
                test: /\.extract\.less$/,
                loader: ExtractTextPlugin.extract('style', 'css?minimize!less')
            },
            {
                test: /\.json$/,
                loader: 'json'
            }
        ]
    },
    resolve: {
        root: app_path,
        extensions: [ '', '.js', '.coffee', '.cjsx' ]
    },
    plugins: [
        new ExtractTextPlugin('css/[name].min.css')
    ],
    stats: {
        chunks: false,
        chunkModules: false
    }
};