import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Component from '@/App.vue'
import VueRouter from 'vue-router'
import store from '@/store'
import router from '@/router'
import { sync } from 'vuex-router-sync'

sync(store,router)

const localVue = createLocalVue()

localVue.use(Vuex, VueRouter)



test('H2 text is correct', () => {
  const wrapper = mount(Component, { localVue, store, router })
  const h2 = wrapper.find('h2');
  expect(h2.text()).toBe('Departments')
})