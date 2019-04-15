import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Component from '@/components/Product.vue'
import VueRouter from 'vue-router'
import store from '@/store'
import router from '@/router'
import { sync } from 'vuex-router-sync'

sync(store,router)

const localVue = createLocalVue()

localVue.use(Vuex, VueRouter)


test('Products are added to cart from department list', () => {

  const wrapper = mount(Component, { localVue, store, router, propsData: { 'name': 'Sausages', 'price': 100 } })
  
  wrapper.vm.addToCart(wrapper.vm.product)
  expect(wrapper.vm.cartItems.reduce((a,b) => a+b.quantity, 0)).toBe(1);
  
  wrapper.vm.addToCart(wrapper.vm.product)
  wrapper.vm.addToCart(wrapper.vm.product)
  expect(wrapper.vm.cartItems.reduce((a,b) => a+b.quantity, 0)).toBe(3);

  wrapper.find('button').trigger('click')
  expect(wrapper.vm.cartItems.reduce((a,b) => a+b.quantity, 0)).toBe(4);

})