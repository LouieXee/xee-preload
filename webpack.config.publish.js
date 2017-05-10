'use strict';

const webpack = require('webpack');
const baseConfig = require('./webpack.config.base.js');

(baseConfig.plugins || (baseConfig.plugins = [])).push(
    new webpack.DefinePlugin({
        DEVELOPMENT: false
    }),
    new webpack.optimize.UglifyJsPlugin()
)

module.exports = baseConfig;