import Vue from 'vue'
import Router from 'vue-router'

const _import = file => require('@/views/'+ file + '.vue').default


Vue.use(Router)


const routers = [
    {
        path:"/",
        name:"首页",
        redirect:'/welcome'
    },
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
    }
]

const router = new Router({routes: routers})

export default router