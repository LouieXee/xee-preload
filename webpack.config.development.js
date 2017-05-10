'use strict';

const webpack = require('webpack');
const baseConfig = require('./webpack.config.base.js');

baseConfig.devtool = 'cheap-source-map';

(baseConfig.plugins || (baseConfig.plugins = [])).push(
    new webpack.DefinePlugin({
        DEVELOPMENT: true
    })
);

module.exports = baseConfig;
