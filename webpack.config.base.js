'use strict';

const webpack = require('webpack');
const path = require('path');

module.exports = {

    entry: path.resolve(__dirname, './src/index.js'),

    output: {
        path: path.resolve(__dirname, './build'),
        filename: 'bundle.js',
        library: 'xee-preload',
        libraryTarget: 'umd'
    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'es3ify-loader!babel-loader!eslint-loader'
            },
            {
                test: /\.styl$/,
                exclude: /node_modules/,
                loader: 'style-loader!css-loader!autoprefixer-loader?browsers=last 2 version!stylus-loader'
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                exclude: /node_modules/,
                loader: 'url-loader?limit=1024&name=[name].[ext]',
            }
        ]
    },

    plugins: []
};
