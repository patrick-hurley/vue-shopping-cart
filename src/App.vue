<template>
  <div id="app" class="container">
    
    <nav class="inner">
      <div class="logo">
        <span>Hunky Dory</span>
      </div>
      <div class="shopping-status">
        <a @click="showBasket">Basket: ({{ cartItemCount }})</a>
      </div>
    </nav>

    <transition name="fade">
      <div class="shopping-cart" v-show="basketIsShown">
        <div v-if="cartItems.length != 0">
          <ul>
            <li v-for="(item, index) in cartItems" :key="index">
              {{ item.name }} - £{{ (item.price).toFixed(2) }} - {{ item.quantity }}
              </li>
          </ul>
          <p class="shopping-cart_total">Total: £{{ cartTotal }}</p>
        </div>
        <div v-else>
          <p>Your basket is empty</p>
        </div>
      </div>
    </transition>
    
    <main>
      <Clothes/>
    </main>
  

  </div>
</template>

<script>

/* TO DO
// ==============================================
// 1. Add images to products
// 2. Show total basket amount (pass the price)
// 3. Group the same products together in the basket
// 
//
//
//
*/

import Clothes from './views/Clothes.vue'

export default {
  name: 'app',
  data(){
    return {
      cartItems: [],
      basketIsShown: false
    }
  },
  components: {
    Clothes
  },
  methods: {
    addToCart: function(item){
      this.cartItems.push(item);
    },
    updateCart: function(item){
      let findIndex = this.cartItems.findIndex(x => x.name == item.name);
      this.cartItems[findIndex].quantity++;
    },
    showBasket: function(){
      this.basketIsShown = !this.basketIsShown;
    }
  },
  computed: {
    cartItemCount: function(){
      if(this.cartItems.length === 0){
        return 'empty'
      }
      else {
        return this.cartItems.length
      }
    },
    cartTotal: function(){
      return (this.cartItems.reduce((a,b) => a+b.price, 0)).toFixed(2);
    }
  },
  created: function () {
  	this.$root.$on('addIt', (event) => {
      let found = this.cartItems.some((el) => {
        return el.name === event.name
      });
      if(!found){
        this.addToCart(event)
      }
      else {
        this.updateCart(event)
      }
    });
  }
}
</script>

<style lang="scss">

@import url('https://use.fontawesome.com/releases/v5.5.0/css/all.css');
@import url('https://fonts.googleapis.com/css?family=Bungee|Open+Sans');


html {
  font-family: 'Open Sans', sans-serif;
}

ul, li, p, h1, h2, h3 {
  margin: 0;
  padding: 0;
}

.container {
  max-width: 1100px;
  margin: 0 auto;
}

.inner {
  padding: 20px 30px;
}

nav {
  overflow: auto;
  background: #dbfff3;
  border-radius: 10px;
  margin-top: 30px;
}

.logo {
  font-family: 'Bungee';
  font-size: 50px;
  float: left;
}

.shopping-status {
  float: right;
  margin-top: 17px;
  a {
    margin: 0;
    cursor: pointer;
  }
  a:before{
    font-family: 'Font Awesome 5 Free';
    content: '\f07a';
    padding-right: 10px;
    font-weight: 700;
  }
}

.shopping-cart {
  background: #c0bfbf;
  border-radius: 10px;
  margin-top: 20px;
  color: white;
  padding: 20px 30px;
  font-weight: 900;
  ul {
    list-style: none;
  }
  li {
    font-size: 20px;
  }
  &_total {
    border-top: 2px solid #eeeeee;
    margin-top: 20px;
    padding-top: 10px;
    font-size: 25px;
  }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

</style>
