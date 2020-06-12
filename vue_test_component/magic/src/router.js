import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/views/form',
      name: 'views_form',
      component: () => import('@/views/form.vue')
    },
    {
      path: '/views/decorator',
      name: 'views_decorator',
      component: () => import('@/views/decorator.vue')
    },
    {
      path: '/views/table',
      name: 'views_table',
      component: () => import('@/views/table.vue')
    },
    {
      path: '/views/search',
      name: 'views_search',
      component: () => import('@/views/search.vue')
    },
    {
      path: '/views/test',
      name: 'views_test',
      component: () => import('@/views/test.vue')
    }
  ]
})
