import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

Vue.filter('capitalise', function (val) {
  return val.toUpperCase();
});

Vue.component('anchored-heading', {
  render: function (doThis) {
    return doThis(
      'h' + this.level,   // tag name
      this.$slots.default // array of children
    )
  },
  props: {
    level: {
      type: Number,
      required: true
    }
  }
})
  
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
