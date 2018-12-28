<template>
  <div id="app" class="container">
    
    <nav class="inner">
      <div class="logo">
        <h1><router-link class="no-active" to="/">Hunky Dory</router-link></h1>
      </div>
      <div class="shopping-status">
        <a @click="showBasket">Basket: ({{ cartCount }})</a>
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
                <div><i @click="removeAllItems(item, index)" :class="item.isDeleting ? 'fas fa-spinner fa-spin' : 'fas fa-trash-alt'"/></div>
            </div>
          </div>
          <p class="shopping-cart_total">Total: {{ cartTotal | currency }}</p>
        </div>
        <div v-else>
          <p>Your basket is empty</p>
        </div>
      </div>
    </transition>
    
    <section class="table full">
      <aside>
        <div class="menu">
          <h2>Department</h2>
          <div v-if="errored">
            <p>Something went wrong</p>
          </div>
          <div v-else>
            <p v-show="loading">Loading... <i class="fas fa-spinner fa-spin"/></p>
            <ul>
              <li v-for="(department, index) in departments" :key="index">
                <router-link :to="{ name: 'department', params: { department: department }}">{{ department }}</router-link>
              </li>
            </ul>
          </div>
        </div>
      </aside>

      <main>
        <transition name="fade" @after-leave="afterLeave">
          <router-view :key="$route.path"></router-view>
        </transition>
      </main>

    </section> 

  </div>
</template>

<script>

import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  name: 'app',
  data(){
    return {
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
    ...mapMutations([
      'CHANGE_QUANTITY'
    ]),
    ...mapActions([
      'removeAll',
      'retrieveProducts'
    ]),
    showBasket: function(){
      this.basketIsShown = !this.basketIsShown;
    },
    changeQuantity: function(index,increase){
      this.CHANGE_QUANTITY({index,increase})
    },
    removeAllItems: function(item, index){
      this.$store.state.cartItems[index].isDeleting = true;
      this.removeAll(index);
    },
    afterLeave (el) {
      window.scroll(0,0)
    }
  },
  computed: {
    ...mapState([
      'cartItems',
      'products',
      'loading',
      'errored'
    ]),
    ...mapGetters([
      'cartCount',
      'cartTotal',
      'itemTotal'
    ]),
    departments(){
      let allDepartments = this.products.map(x => x.department.toLowerCase())
      return [...new Set(allDepartments)]
    }
  },
  mounted() {
    this.retrieveProducts()
  }
}
</script>

<style lang="scss">

@import 'assets/scss/materialize/materialize';
@import url('https://use.fontawesome.com/releases/v5.6.3/css/all.css');
@import url('https://fonts.googleapis.com/css?family=Bungee|Open+Sans');

$bg-color: #f3f3f3;
$accent-color: #dbfff3;

[v-cloak] {
  display: none;
}

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

p {
  font-size: 18px;
}

a {
  color: black;
}

.table {
  display: table;
}

.full {
  width: 100%;
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
  background: $accent-color;
  border-radius: 10px;
  margin-top: 30px;
}

.logo {
  font-family: 'Bungee';
  font-size: 30px;
  float: left;
  a {
    color: black;
  }
}

.shopping-status {
  float: right;
  margin-top: 20px;
  a {
    cursor: pointer;
    color: black;
    font-size: 18px;
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

section.table {
  margin-top: 20px;
}

aside {
  display: table-cell;
  width: 300px;
  vertical-align: top;
  .menu {
      border: 3px solid #eeeeee;
      border-radius: 10px;
      padding: 20px 30px 30px;
  }
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
  display: table-cell;
  padding-left: 30px;
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

.router-link-active:not(.no-active) {
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
