<template>
  <div id="app" class="container">
    
    <nav class="inner">
      <div class="logo">
        <h1><router-link class="no-active" to="/">Hunky Dory</router-link></h1>
      </div>
      <div class="shopping-status">
        <a @click="showModal = true">Cart: ({{ cartCount }})</a>
      </div>
    </nav>
    
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
        <transition name="medium-fade" @after-leave="afterLeave">
          <router-view :key="$route.path"></router-view>
        </transition>
      </main>

    </section> 

    <!-- modal -->
    <transition name="fast-fade">
      <div v-show="showModal" class="modal-backdrop">
        <div class="modal">
          <div class="modal-cell">
            <div class="modal-content">
              <h2>Shopping Cart</h2>
              <hr>
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
                <p>Your shopping cart is empty</p>
              </div>
              <button class="btn close-modal" @click="showModal = false">Close cart</button>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <!--modal-->


  </div>
</template>

<script>

import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  name: 'app',
  data(){
    return {
      basketIsShown: false,
      showModal: false
    }
  },
  filters: {
    currency: (price) => {
      return '£' + parseFloat(price).toFixed(2);
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
    afterLeave () {
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

@import 'assets/scss/grid';
@import 'assets/scss/materialize/materialize';
@import url('https://use.fontawesome.com/releases/v5.6.3/css/all.css');
@import url('https://fonts.googleapis.com/css?family=Bungee|Open+Sans');

$bg-color: #f3f3f3;
$accent-color: #dbfff3;

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

blockquote {
  margin: 0;
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
    @media only screen and (max-width: $screen-sm-max){
      padding: 20px;
  }
}

nav {
  overflow: auto;
  background: $accent-color;
  border-radius: 10px;
  margin-top: 30px;
  @media only screen and (max-width: $screen-sm-max){
    margin-top: 0px;
  }
}

.logo {
  font-family: 'Bungee';
  @media only screen and (min-width: $screen-md-min){
    float: left;
  }
  h1 {
    color: black;
    font-size: 50px;
    @media only screen and (max-width: $screen-sm-max){
      font-size: 35px;
    }
  }
}

.shopping-status {
  @media only screen and (min-width: $screen-md-min){
    float: right;
  }
  margin-top: 14px;
  @media only screen and (max-width: $screen-sm-max){
    margin-top: 5px;
  }
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
  div:nth-of-type(1) {
    min-width: 220px;
  }
  div:nth-of-type(2) {
    width: 100px;
  }
  div:nth-of-type(3) {
    width: 150px;
  }
  button {
    background: transparent;
    border: none;
    font-size: 17px;
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
  @media only screen and (max-width: $screen-sm-max){
    display: block;
    width: 100%;
  }
  @media only screen and (max-width: $screen-md-max){
    width: 30%;
  }
  vertical-align: top;
  .menu {
      border: 3px solid #eeeeee;
      @media only screen and (max-width: $screen-sm-max){
        border: none;
      }
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
  height: 1em;
  @media only screen and (max-width: $screen-sm-max){
    display: block;
    width: 100%;
    padding-left: 0px;
  }
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

// Modal

.modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal {
    display: table;
    background: #FFFFFF;
    border-radius: 10px;
    border: 1px solid rgb(201, 201, 201);
    height: 80vh;
    width: 60vw;
    @media only screen and (max-width: $screen-sm-max){
      width: 95vw;
    }
    @media only screen and (min-width: $screen-md-min) and (max-width: $screen-md-max){
      width: 80vw;
    }
  }
  .modal-cell {
    display: table-cell;
    vertical-align: middle;
    @media only screen and (max-width: $screen-sm-max){
      padding-left: 20px;
      padding-right: 20px;
    }
  }
  .modal-content {
    margin: 0 auto;
    @media only screen and (min-width: $screen-md-min){
      width: 500px;
    }
    h2 {
      margin-bottom: 30px;
      @media only screen and (max-width: $screen-sm-max){
        font-size: 30px;
      }
    }
    hr {
      margin-bottom: 20px;
    }
    .close-modal {
      margin-top: 30px;
    }
  }


  // Transition

.medium-fade-enter-active, .v-leave-active {
  transition: opacity 2s
}

.medium-fade-enter, .medium-fade-leave-to {
  opacity: 0;
}

.medium-fade-leave, .medium-fade-enter-to {
  opacity: 1;
}

.fast-fade-enter-active, .fast-fade-leave-active {
  transition: opacity 0.5s
}

.fast-fade-enter, .fast-fade-leave-to {
  opacity: 0;
}

.fast-fade-leave, .fast-fade-enter-to {
  opacity: 1;
}

</style>
