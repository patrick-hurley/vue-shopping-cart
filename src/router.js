import Vue from 'vue'
import Router from 'vue-router'
import Homepage from './views/Homepage.vue'
import Department from './views/Department.vue'
import ProductDetail from './views/ProductDetail.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'homepage',
      component: Homepage
    },
    {
      path: '/department/:department',
      name: 'department',
      component: Department,
      props: true
    },
    {
      path: '/product/:product',
      name: 'product-detail',
      component: ProductDetail,
      props: true
    }
  ]
})
