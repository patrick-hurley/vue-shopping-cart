<template>
  <div id="app" class="container">
    
    <nav class="inner">
      <div class="logo">
        <span>Hunky Dory</span>
      </div>
      <div class="shopping-cart">
        <p>Basket: ({{ cartItemCount }})</p>
      </div>
    </nav>

    <div>
      <Clothes/>
    </div>

  </div>
</template>

<script>

// Shopping cart array needs to be added in App.vue as the data is used across the app. 
// The 'add to cart' button will be on the Product.vue component, and will need to emit up to App.vue
// vm.$root.$emit will send the emit to the root component

import Clothes from './views/Clothes.vue'

export default {
  name: 'app',
  data(){
    return {
      cartItems: []
    }
  },
  components: {
    Clothes
  },
  methods: {
    addToCart: function(name){
      this.cartItems.push(name)
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

.container {
  max-width: 1000px;
  margin: 0 auto;
}

.inner {
  padding: 20px 40px;
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

.shopping-cart {
  float: right;
  margin-top: 17px;
  p {
    margin: 0;
  }
  p:before{
    font-family: 'Font Awesome 5 Free';
    content: '\f07a';
    padding-right: 10px;
    font-weight: 700;
  }
}

</style>
