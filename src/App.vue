<template>
  <div id="app" class="container">
    
    <nav class="inner">
      <div class="logo">
        <h1>Hunky Dory</h1>
      </div>
      <div class="shopping-status">
        <a @click="showBasket">Basket: ({{ cartItemCount }})</a>
      </div>
    </nav>

    <transition name="fade">
      <div class="shopping-cart" v-show="basketIsShown">
        <div v-if="cartItems.length != 0">
          <div class="table">
            <div class="cart-product" v-for="(item, index) in cartItems" :key="index">
                <div>{{ item.name | capitalise }}</div>
                <div>{{ itemTotal(index) | currency }}</div> 
                <div>
                  <button @click="changeQuantity(index,false)">-</button>
                  <input type="text" :value="item.quantity" disabled>
                  <button @click="changeQuantity(index,true)">+</button>   
                </div>
                <div><i @click="removeAll(index)" class="fas fa-trash-alt"/></div>
            </div>
          </div>
          <p class="shopping-cart_total">Total: {{ cartTotal | currency }}</p>
        </div>
        <div v-else>
          <p>Your basket is empty</p>
        </div>
      </div>
    </transition>
    
    <aside>
      <h2>Department</h2>
      <ul>
        <li><router-link to="/clothes">Clothes</router-link></li>
        <li><router-link to="/food">Food</router-link></li>
      </ul>
    </aside>

    <main>
      <transition name="fade">
        <router-view :cartItems="cartItems"></router-view>
      </transition>
    </main>

  </div>
</template>

<script>

/* TO DO
// ==============================================
//
// 1. Use Vuex to pass the product quantity to Product.vue
// 2. Add Axios to call the cart items from JSON
*/



export default {
  name: 'app',
  data(){
    return {
      cartItems: [],
      basketIsShown: false
    }
  },
  filters: {
    currency: (price) => {
      return '£' + parseFloat(price).toFixed(2);
    },
    capitalise: (val) => {
      return val.toUpperCase();
    }
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
    },
    changeQuantity: function(index,increase){
      if(increase){
        this.cartItems[index].quantity++;
      }
      else {
        if(this.cartItems[index].quantity == 1)
        {
          this.cartItems.splice(index,1); 
        }
        else {
          this.cartItems[index].quantity--;
        }
      }
    },
    itemTotal: function(index){
      return (this.cartItems[index].price * this.cartItems[index].quantity);
    },
    removeAll: function(index){
      this.cartItems.splice(index,1);
    }
  },
  computed: {
    cartItemCount: function(){
      if(this.cartItems.length === 0){
        return 'empty'
      }
      else {
        return this.cartItems.reduce((a,b) => a+b.quantity, 0);
      }
    },
    cartTotal: function(){
      return (this.cartItems.reduce((a,b) => a+(b.price * b.quantity), 0)).toFixed(2);
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

@import 'assets/scss/materialize/materialize';
@import url('https://use.fontawesome.com/releases/v5.6.3/css/all.css');
@import url('https://fonts.googleapis.com/css?family=Bungee|Open+Sans');

$bg-color: #f3f3f3;

html {
  font-family: 'Open Sans', sans-serif;
}

ul, li, p, h1, h2, h3 {
  margin: 0;
  padding: 0;
}

ul {
  list-style: none;
}

.table {
  display: table;
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
  font-size: 30px;
  float: left;
}

.shopping-status {
  float: right;
  margin-top: 25px;
  a {
    cursor: pointer;
    color: black;
  }
  a:before{
    font-family: 'Font Awesome 5 Free';
    content: '\f07a';
    padding-right: 10px;
    font-weight: 700;
  }
}

.shopping-cart {
  background: #bebebe;
  border-radius: 10px;
  margin-top: 20px;
  color: white;
  padding: 20px 30px;
  font-weight: 900;
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

.cart-product {
  display: table-row;
  div {
    display: table-cell;
    padding-right: 20px;
    vertical-align: middle;
  }
  div:first-of-type {
    min-width: 150px;
  }
  button {
    background: transparent;
    border: none;
    font-size: 17px;
    color: white;
    padding: 5px;
    width: 30px;
    cursor: pointer;
    &:focus {
      outline: none;
    }
  }
  input {
    width: 40px;
    text-align: center;
    padding: 5px;
  }
  i {
    cursor: pointer;
  }
}

aside {
  width: 27%;
  float: left;
  margin-top: 20px;
  padding: 20px 30px 30px;
  border: 3px solid #eeeeee;
  border-radius: 10px;
  h2 {
    text-transform: uppercase;
    font-size: 20px;
    letter-spacing: 2px;
  }
  ul  {
    margin-top: 15px;
  }
  li {
    margin-top: 10px;
  }
  a {
    color: #45dd9e;
    text-decoration: none;
    letter-spacing: 3px;
    font-size: 16px;
    text-transform: uppercase;
    &:hover {
      text-decoration: underline;
    }
  }
}

main {
  width: 65%;
  float: right;
}

.fade-enter-active, .v-leave-active {
  transition: opacity 2s
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

.fade-leave, .fade-enter-to {
  opacity: 1;
}

.router-link-active {
  position: relative;
  &:before {
    position: absolute;
    font-family: 'Font Awesome 5 Free';
    content: '\f054';
    font-weight: 900;
    font-size: 12px;
    left: -15px;
    top: 4px;
  }
}

</style>
