var path = require('path')
var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config/index')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.config')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

module.exports = merge(baseWebpackConfig, {
    module: {
        // styleLoaders
        rules: utils.styleLoaders({sourceMap: config.dev.cssSourceMap})
    },
    // 最新的配置为 cheap-module-eval-source-map，虽然 cheap-module-eval-source-map 更快，但它的定位不准确
    // 所以，换成 eval-source-map
    devtool: '#eval-source-map',
    devServer: {
        // contentBase存在，都会打印日志 Content not from webpack is served from contentBase地址
        contentBase: path.resolve(__dirname, '../src'),
        progress: true,
        stats: {color: true},
        host: '0.0.0.0',
        port: process.env.PORT || '9000',
        historyApiFallback: true,
        proxy: {
            '/interface/*': {
                target: 'http://127.0.0.1:3004',
                changeOrigin: true
            },
            '/media/*': {
                target:'http://119.254.211.60:60134',
                secure: false
            }
        }
    },
    plugins: [
        // definePlugin 接收字符串插入到代码当中, 所以你需要的话可以写上 JS 的字符串
        // 此处，插入适当的环境
        new webpack.DefinePlugin({
            'process.env': config.dev.env
        }),
        // 压缩 js
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        // 注意：如果利用webpack-dev-server cli 并且加了--hot 这个选项，
        // 就不要在这里加入new webpack.HotModuleReplacementPlugin()这个插件了
        // HotModule 插件在页面进行变更的时候只会重绘对应的页面模块，不会重绘整个 html 文件
        // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
        // new webpack.HotModuleReplacementPlugin(),

        // 将 index.html 作为入口，注入 html 代码后生成 index.html 文件
        // https://github.com/ampedandwired/html-webpack-plugin
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.join(__dirname, '../index.html'),
            inject: 'body',
            favicon: './favicon.ico'
        }),
        // webpack 错误信息提示插件
        new FriendlyErrorsPlugin(),
    ]
        
})