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

    chainWebpack: config =>{

        config.plugin('provide').use(webpack.ProvidePlugin, [{ R: 'ramda', 'window.R':'ramda'}])
    },

    devServer: {
        contentBase: path.resolve(__dirname, './src'),
        progress: true,
        stats:{
            color: true,
        },
        host:"0.0.0.0",
        port:'8081',
        https:false,
        hotOnly:false,
        proxy:null,
        before: null
    }
  }