const path = require('path');
const merge = require('webpack-merge');
const MiniPlugin = require('mini-program-webpack-loader').plugin;
const CopyWebpackPlugin = require('copy-webpack-plugin');
const baseConfig = require('./webpack.config.base');
// const statistics = require('./release/statistics');
const { setSubPackageCacheGroup } = require('./lib/util');

module.exports = merge(baseConfig, {
    entry: path.resolve(__dirname, './../src/miniprogram/app.json'),
    output: {
        path: path.resolve(__dirname, './../dist')
    },
    plugins: [
        new MiniPlugin({
            analyze: false,
            setSubPackageCacheGroup,
            // compilationFinish: statistics
        }),
        new CopyWebpackPlugin([{
            from: './../src/cloudfunctions/**/*.json',
            to: './../dist/'
        }])
    ]
});