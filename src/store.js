import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cartItems: []
  },
  mutations: {
    ADD_TO_CART: (state, item) => {
      item.isDeleting = false;
      state.cartItems.push(item);
    },
    UPDATE_CART: (state, item) => {
      let findIndex = state.cartItems.findIndex(x => x.name == item.name);
      state.cartItems[findIndex].quantity++;
    },
    CHANGE_QUANTITY: (state,{index,increase}) => {
      if(increase){
        state.cartItems[index].quantity++;
      }
      else {
        if(state.cartItems[index].quantity == 1)
        {
          state.cartItems.splice(index,1); 
        }
        else {
          state.cartItems[index].quantity--;
        }
      }
    },
    REMOVE_ALL: (state,index) => {
      state.cartItems[index].isDeleting = false;
      state.cartItems.splice(index,1);
    }
  },
  actions: {
    removeAll: ({commit}, index) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          commit('REMOVE_ALL',index)
          resolve()
        }, 700)
      })
    }

  },
  getters: {
    cartCount: state => {
      if(state.cartItems.length === 0){
        return 'empty'
      }
      else {
        return state.cartItems.reduce((a,b) => a+b.quantity, 0);
      }
    },
    cartTotal: state => {
      return (state.cartItems.reduce((a,b) => a+(b.price * b.quantity), 0)).toFixed(2);
    },
    itemCount: (state) => (index) => {
      if(index >= 0){
        return state.cartItems[index].quantity
      }
    },
    itemTotal: (state) => (index) => {
      if(state.cartItems[index]){
        return (state.cartItems[index].price * state.cartItems[index].quantity);
      }
    }
  }
})