const webpack = require('webpack')
const path = require('path')
module.exports = {
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...
    } else {
      // 为开发环境修改配置...
    }
  },

  chainWebpack: config => {

    config.module
      .rule('images')
      .test(/\.(png|jpe?g|gif|svg|ogg)(\?.*)?$/)
      .use('url-loader')
      .loader('url-loader')
      .tap(options => {
        options.name = 'img/[name].[ext]?[hash]'
        options.limit = 10000
        return options
      })

    config.plugin('provide').use(webpack.ProvidePlugin, [{ R: 'ramda', 'window.R': 'ramda' }])

    //alias 设置别名。此处的代码用来设置magic别名
    //dirname用来指向当前node当前环境的根目录
    config.resolve
      .alias
      .set('magic', path.join(__dirname, 'magic', 'package', '/'))
      .end()


    //js编译的时候  需要包含 dirname/src/assets 目录下的文件。以及lib下的文件
    // config.module
    //   .rule('js')
    //   .exclude
    //   .add(path.join(__dirname,'src','assets'))
    //   .end()
    //
    // config.module
    //   .rule('eslint')
    //   .exclude
    //   .add(path.join(__dirname, 'src', 'assets'))
    //   .end()
  },
  css: {
    // 是否开启css source map
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    },
    //去掉文件名中的.module
    requireModuleExtension: false
    // 是否启用css modules for all css / pre-processor files
    //modules: false
  },
  devServer: {
    contentBase: path.resolve(__dirname, './src'),
    progress: true,
    host: '0.0.0.0',
    port: '8081',
    https: false,
    hotOnly: false,
    proxy: null,
    before: null
  }
}
