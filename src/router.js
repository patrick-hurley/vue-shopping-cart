import Vue from 'vue'
import Router from 'vue-router'
import Department from './views/Department.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/department/:department',
      name: 'department',
      component: Department,
      props: true
    }
  ]
})
