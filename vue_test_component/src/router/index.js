import Vue from 'vue'
import Router from 'vue-router'

const _import = file => require('@/views/'+ file + '.vue').default

import Layout from "@/views/layout/index"

Vue.use(Router)


const routers = [
    {
        path:"/",
        redirect:"/welcome",
        component:Layout,
        children:[
            {
                path:"/welcome",
                name:"welcome",
                component:_import('welcome/index')
            },
            {
                path:"/communication",
                name:"通信机制",
                component: _import('communication/index')
            },
            {
                path:"/codemirror",
                name:"web编辑器",
                component: _import("codemirror/editor-javascript")
            },
            {
                path:"/echarts",
                name:"图表",
                component: _import("echart/index")
            },
            {
                path:"/tree",
                name:"tree",
                component: _import("tree/index")
            },
            {
                path:"/authorityTree",
                name:"权限树",
                component: _import("tree/authorityTree")
            },
            {
                path:"/magic",
                name:"magic",
                component: _import("magicTest/index")
            },
            {
                path:"/color",
                name:"取色器",
                component: _import("color/index")
            }
        ]
    }

]

const router = new Router({routes: routers})

export default router
