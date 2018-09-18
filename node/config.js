const host = '192.168.1.52'
const config = {
    server: {
        port: 3004,
        host: '127.0.0.1'
    },
    //auth
    RESETful: {
        host: `http://${host}:9001`,
        // host: 'http://192.168.1.52:9001',
        port: 8001,
        timeout: 3000
    },
    //通用接口
    RESETfulCommon: {
        host: `http://${host}:9000`,
        // host: `http://192.168.1.52:9000`,
        port: 5000,
        timeout: 3000
    },
    // 视频监控
    RESETfulVideo: {
        host: `http://${host}:9004`,
        port: 8088,
        timeout: 3000
    },
    // 视频监控
    RESETfulTranscode: {
        host: `http://${host}:9005`,
        port: 5555,
        timeout: 3000
    },
    // 配置中心
    RESETfulConfig: {
        host: `http://${host}:9008`,
        port: 9008,
        timeout: 3000
    },
    render: {
        // html jade
        engine: 'html',
        index: 'index.html'
    },
    adminToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Inl6Zzk2M0BnbWFpbC5jb20iLCJlbWFpbCI6Inl6Zzk2M0BnbWFpbC5jb20iLCJ1c2VyX2lkIjoicDNOYXFxNHJtaEtuWHlaZXdWVkV2VSIsImV4cCI6MTUwNjU4NTcxMSwib3JpZ19pYXQiOjE1MDM5OTM3MTF9.a5shIjtjM-fmLVqH_FiMl_w8Vaf-t5WV5L86sK1Df3g',
    debug: true
}

// Using env to override configuration:

overrideRESETfulByEnv(config.RESETful,        'Backend-Auth', process.env.BACKEND_AUTH)
overrideRESETfulByEnv(config.RESETfulConfig,  'Backend-Config', process.env.BACKEND_CONFIG)
overrideRESETfulByEnv(config.RESETfulCommon, 'Backend-Common', process.env.BACKEND_COMMON)

overrideRESETfulByEnv(config.RESETfulVideo,    'Backend-Video', process.env.BACKEND_VIDEO)
overrideRESETfulByEnv(config.RESETfulTranscode, 'Backend-TransCode', process.env.BACKEND_TRANSCODE)
overrideRESETfulByEnv(config.RESETfulPower,    'Backend-Power', process.env.BACKEND_POWER)
overrideRESETfulByEnv(config.RESETfulBelt, 'Backend-Belt', process.env.BACKEND_BELT)
overrideRESETfulByEnv(config.RESETfulFlow, 'Backend-FlowVision', process.env.BACKEND_FLOW)
overrideRESETfulByEnv(config.RESETfulBigData , 'Backend-BigData', process.env.BACKEND_BIGDATA)

overrideRESETfulByEnv(config.RESETfulKJ66, 'Backend-KJ66', process.env.BACKEND_KJ66)
overrideRESETfulByEnv(config.RESETfulGis, 'Backend-GIS', process.env.BACKEND_GIS)
overrideRESETfulByEnv(config.RESETfulGisRedirect, 'GIS-Server', process.env.GIS_SERVER)

export default config


// ---- Helpers ----

/**
 * @param {{host: string, port: number}} restful
 * @param {string} displayName
 * @param {string | null} env
 */
function overrideRESETfulByEnv(restful, displayName, env) {
  if (env) {
    const addr = env.toString()
    restful.host = addr
    console.log(`${displayName} --> ${addr}`)

    const portOffset = addr.lastIndexOf(':') + 1
    if (portOffset) {
      const port = +addr.substring(portOffset)
      if (!isNaN(port)) {
        restful.port = port
      }
    }
  }
}
