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
            <li v-for="(item, index) in cartItems" :key="index">{{ item }}</li>
          </ul>
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
// 2. Group the same products together in the basket
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
    addToCart: function(name){
      this.cartItems.push(name);
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
      
    }
  },
  created: function () {
    console.log('This code runs when view is created')
  	this.$root.$on('addIt', (event) => {
    	this.addToCart(event)
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

ul, li, p, h3 {
  margin: 0;
  padding: 0;
}

.container {
  max-width: 1000px;
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
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

</style>
