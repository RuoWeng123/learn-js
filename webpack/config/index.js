var path = require('path')

module.exports = {
    // production 生产环境
    build: {
        // 构建环境
        env: require('./prod.env'),
        // 构建输出的 index.html 文件
        index: path.resolve(__dirname, '../dist/index.html'),
        // 构建输出的静态资源路径
        assetsRoot: path.resolve(__dirname, '../dist'),
        // 构建输出的二级目录
        assetsSubDirectory: 'static',
        // 构建发布的根目录，可配置为资源服务器域名或cdn域名
        assetsPublicPath: '/',
        // 是否开启csssourcemap
        productionSourceMap: true,  //打包后不生成map文件
        productionGzip: false,
        productionGzipExtensions: ['js', 'css'],
        bundleAnalyzerReport: process.env.npm_config_report
    },
    // development 开发环境
    dev: {
        // 构建环境
        env: require('./dev.env'),
        port: 9000,
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        autoOpenBrowser: true,
        proxyTable: {  //配置开发环境下的调试端口。实际使用时使用模糊匹配代理
             /* 张三 */
            // '/jiKonCloud_1': {
            //   target: 'http://192.168.1.60:8080',
            //   changeOrigin: true
            // },

            /* 李四 */
            // '/api': {
            //   target: 'http://192.168.1.9:8080',
            //   changeOrigin: true
            // }
            // '/api': {
            //   target: 'http://192.168.1.130:8080',
            //   changeOrigin: true
            // }
        },
        cssSourceMap: false
    }
}