const path = require('path')

module.exports = {
  productionSourceMap: process.env.NODE_ENV !== 'production',
  devServer: {
    proxy: {
      '/hasura': {
        target: 'http://192.168.1.31:9999',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/hasura': ''
        }
      },
      '/backend': {
        target: 'http://192.168.1.31:4010',
        pathRewrite: {
          '^/backend': ''
        }
      }
    }
  },
  configureWebpack: {
    externals: process.env.NODE_ENV === 'production'
      ? { 'vue': 'vue', 'element-ui': 'element-ui' }
      : {}
  },
  chainWebpack: (config) => {
    config.resolve
      .alias
      .set('magic', path.join(__dirname, 'package', '/'))
    config.module
      .rule('js')
      .exclude
      .add(path.join(__dirname, 'src', 'assets'))
      .add(path.join(__dirname, 'dist'))
      .end()
    config.module
      .rule('eslint')
      .exclude
      .add(path.join(__dirname, 'src', 'assets'))
      .add(path.join(__dirname, 'dist'))
      .end()
  }
}
