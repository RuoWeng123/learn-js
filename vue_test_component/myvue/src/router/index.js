import Vue from 'vue'
import Router from 'vue-router'

const _import = file => require('@/views/'+ file + '.vue').default

Vue.use(Router)


const routers = [
    {
        path:"/",
        name:"首页",
        redirect:'/welcome',
        children:[
            {
                path:"/welcome",
                name:"welcome",
                component:_import('welcome/index')
            }
        ]
    },
    {
        path:"/communication",
        name:"communication",
        component: _import('communication/index')
    },
    {
        path:"/codemirror",
        name:"codemirror",
        component: _import("codemirror/editor-javascript")
    }
]

const router = new Router({routes: routers})

export default router