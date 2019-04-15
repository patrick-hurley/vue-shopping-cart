import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Component from '@/views/ProductDetail.vue'
import VueRouter from 'vue-router'
import store from '@/store'
import router from '@/router'
import { sync } from 'vuex-router-sync'

sync(store,router)

const localVue = createLocalVue()

localVue.use(Vuex, VueRouter)

router.push({name: 'product-detail', params: {product: 'jeans'}})


test('Products are added to cart from main product page', () => {


        const product = { 'name': 'jeans', 'price': 100 };

        const wrapper = shallowMount(Component, { localVue, store, router, propsData: { product } })

        store.state.products.push(product);

        wrapper.vm.addToCart(product)
        expect(wrapper.vm.cartItems.reduce((a,b) => a+b.quantity, 0)).toBe(1);
        
        wrapper.vm.addToCart(product)
        wrapper.vm.addToCart(product)
        expect(wrapper.vm.cartItems.reduce((a,b) => a+b.quantity, 0)).toBe(3);

        expect(wrapper.find('p').text()).toBe('hello');
})