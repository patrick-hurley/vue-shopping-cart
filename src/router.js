import Vue from 'vue'
import Router from 'vue-router'
import Clothes from './views/Clothes.vue'
import Food from './views/Food.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/clothes',
      name: 'clothes',
      component: Clothes,
      props: true
    },
    {
      path: '/food',
      name: 'food',
      component: Food,
      props: true
    }
  ]
})
