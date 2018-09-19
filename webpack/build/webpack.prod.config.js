// node自带的文件路径工具
var path = require('path')
// 工具函数集合
var utils = require('./utils')
var webpack = require('webpack')
// 配置文件
var config = require('../config')
// webpack 配置合并插件
var merge = require('webpack-merge')
// webpack 基本配置
var baseWebpackConfig = require('./webpack.base.config')
// webpack 复制文件和文件夹的插件
// https://github.com/kevlened/copy-webpack-plugin
// var CopyWebpackPlugin = require('copy-webpack-plugin')
// 自动生成 html 并且注入到 .html 文件中的插件
// https://github.com/ampedandwired/html-webpack-plugin
var HtmlWebpackPlugin = require('html-webpack-plugin')
// 提取css的插件
// https://github.com/webpack-contrib/extract-text-webpack-plugin
var ExtractTextPlugin = require('extract-text-webpack-plugin')
// webpack 优化压缩和优化 css 的插件
// https://github.com/NMFR/optimize-css-assets-webpack-plugin
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
// webpack中拷贝文件和文件夹
const CopyWebpackPlugin = require('copy-webpack-plugin')

var webpackConfig = merge(baseWebpackConfig, {
    module: {
        rules: utils.styleLoaders({
            sourceMap: config.build.productionSourceMap,
            extract: true
        })
    },
    devtool: config.build.productionSourceMap ? '#source-map' : false,
    output: {
        path: config.build.assetsRoot,
        filename: utils.assetsPath('js/[name].[chunkhash].js'),
        chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': config.build.env
        }),
        // 压缩 js
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                sequences: true,
                dead_code: true,
                conditionals: true,
                booleans: true,
                unused: true,
                if_return: true,
                join_vars: true,
                drop_console: true
            },
            output: {
                comments: false,
                beautify: false
            },
            sourceMap: false
        }),
        // 提取 css
        new ExtractTextPlugin({
            filename: utils.assetsPath('css/[name].[contenthash].css')
        }),
        // 压缩提取出来的 css
        // 可以删除来自不同组件的冗余代码
        // Compress extracted CSS. We are using this plugin so that possible
        // duplicated CSS from different components can be deduped.
        new OptimizeCSSPlugin(),
        new HtmlWebpackPlugin({
            filename: process.env.NODE_ENV === 'testing'
                ? 'index.html'
                : config.build.index,
            template: 'index.html',
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
                // 更多选项 https://github.com/kangax/html-minifier#options-quick-reference
            },
            // 必须通过 CommonsChunkPlugin一致地处理多个 chunks
            chunksSortMode: 'dependency',
            favicon: './favicon.ico'
        }),
        // 分割公共 js 到独立的文件
        // https://webpack.js.org/guides/code-splitting-libraries/#commonschunkplugin
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function (module, count) {
            // node_modules中的任何所需模块都提取到 vendor
                return (
                    module.resource &&
                    /\.js$/.test(module.resource) &&
                    module.resource.indexOf(
                        path.join(__dirname, '../node_modules')
                    ) === 0
                )
            }
        }),
        // 将 webpack runtime 和模块清单 提取到独立的文件，以防止当 app 包更新时导致公共 jsd hash 也更新
        // extract webpack runtime and module manifest to its own file in order to
        // prevent vendor hash from being updated whenever app bundle is updated
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',
            chunks: ['vendor']
        }),
        // 复制主题样式到dist文件夹
        new CopyWebpackPlugin([
            {
                from: path.join(__dirname, '../src/styles/themes'),
                to: 'themes'
            }
        ])
    ]
})

module.exports = webpackConfig