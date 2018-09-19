var path = require('path')
var webpack = require('webpack')
var config = require('../config')
var vueLoadConfig = require('./vue-loader.config')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// var HtmlWebpackPlugin = require('html-webpack-plugin');
// var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

/**
 * 获得绝对路径
 * @method resolve
 * @param  {String} dir 相对于本文件的路径
 * @return {String}     绝对路径
 */
function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

module.exports = {
    entry: {
        app: ["babel-polyfill", './src/main.js'],
        lib: ['highcharts', 'moment', 'lodash']  //全局daorhighchart moment这些基本插件
    },
    output: {
        path: config.build.assetsRoot,
        publicPath: process.env.NODE_ENV === 'production' ?
            config.build.assetsPublicPath : config.dev.assetsPublicPath,
        filename: '[name].[hash].js'
    },
    resolve: {
        //配置快捷访问文件
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': resolve('src'),
            'assets': path.resolve(__dirname, '../src/assets'),
            'style': path.resolve(__dirname, '../src/style'),
            'components': path.resolve(__dirname, '../src/components'),
            'constants': path.resolve(__dirname, '../src/constants'),
            'views': path.resolve(__dirname, '../src/views'),
            'lib': path.resolve(__dirname, '../src/lib')
        },
        extensions: ['*', '.js', '.vue', '.json', '.scss', 'less']
    },
    //告诉编辑工具，什么样的文件，应该以什么样的工具打包。这种类型的文件需要打包那些文件夹下的文件，而那些文件夹下不需要处理
    module: {
        rules: [{
            test: /\.vue$/,
            loader: 'vue-loader',
            options: vueLoadConfig
        }, {
            test: /\.js$/,
            loader: 'babel-loader',
            include: [resolve('src')],
            exclude: [resolve(__dirname, '../node_modules'), resolve(__dirname, '../server/node_modules')],
            options: {
                plugins: [require('babel-plugin-syntax-dynamic-import')]
            }
        }, {
            test: /\.less$/,
            loader: 'style-loader!css-loader!less-loader'
        }, {
            test: /\.(png|jpe?g|gif|svg|ogg)(\?.*)?$/,
            loader: 'url-loader',
            options: {
                name: 'images/[name].[ext]?[hash]',
                limit: 10000
            }
        }, {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            loader: 'url-loader',

        }]
    },
    plugins: [
        new webpack.ProvidePlugin({
            // Moment
            moment: 'moment',
            Moment: 'moment',
            // lodash
            '_': 'lodash',
            'lodash': 'lodash',
            'Lodash': 'lodash',
            $:'jquery',
            jQuery:'jquery',
            'windows.jQuery':'jquery',
        }),
        // momentjs全量加载问题
        new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn/),
        // new webpack.HotModuleReplacementPlugin(),
        // new HtmlWebpackPlugin({
        //     filename: 'index.html',
        //     template: path.join(__dirname, '../index.html'),
        //     inject: 'body',
        //     minify: {
        //         removeComments: true,
        //         collapseWhitespace: true
        //     }
        // }),
        // new FriendlyErrorsPlugin()

        // new BundleAnalyzerPlugin()
    ]
}
