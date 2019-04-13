<template>
  <div class="product">
    <div class="product-image">
      <img :src="require(`../assets/img/${img}.png`)" alt=""/>
    </div>
    <div class="product-info">
      <h3><router-link :to="{ name: 'product-detail', params: { product: slashedName } }">{{ name }}</router-link></h3>
      <p>{{ formatPrice }}</p>
      <blockquote v-show="itemCount(itemIndex) > 0">{{ itemCount(itemIndex) + ' in cart' }}</blockquote>
      <button class="btn" @click="addToCart(product)">Add to Cart</button>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  name: 'Product',
  data(){
    return { 
      product: {'name': this.name, 'price': this.price}
    }
  },
  props: {
    name: String,
    img: String,
    price: Number
  },
  methods: {
    ...mapMutations([
      'ADD_NEW_ITEM',
      'UPDATE_CART'
    ]),
    ...mapActions([
      'addToCart'
    ])
  },
  computed: {
    ...mapState([
      'cartItems'
    ]),
    ...mapGetters([
      'itemCount'
    ]),
    formatPrice(){
      return '£' + (this.price).toFixed(2);
    },
    itemIndex(){
      return this.cartItems.findIndex(x => x.name == this.name)
    },
    slashedName(){
      return this.name.replace(/\s+/g, '-').toLowerCase();
    }
  },
  created(){
    console.log('hello from the component')
  }
}
</script>

<style scoped lang="scss">

@import '../assets/scss/grid';

$color-button: #d4d4d4;

.product {
  display: table;
  width: 100%;
  height: 250px;
  @media only screen and (max-width: $screen-md-max){
    height: 180px;
  }
  margin-bottom: 30px;
  background: #f5f5f5;
  border-radius: 10px;
  padding: 10px;
  .product-image {
    @media only screen and (min-width: $screen-md-min){
      display: table-cell;
      width: 200px;
      padding: 20px;
    }
    @media only screen and (min-width: $screen-lg-min) {
      width: 350px;
    }
    padding: 10px;
    img {
      width: 100%;
    }
  }
  .product-info {
    @media only screen and (min-width: $screen-md-min){
      display: table-cell;
    }
    vertical-align: top;
    padding: 20px 10px;
    @media only screen and (max-width: $screen-md-max){
      h3 {
        font-size: 30px;
      }
    }
    a:hover {
      text-decoration: underline;
      text-decoration-color: #b7ebd9;
    }
  }
  blockquote {
    margin: 20px 0 10px;
  }
  .btn {
    margin-top: 15px;
    user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    -webkit-touch-callout: none;
    -o-user-select: none;
    -moz-user-select: none;
  }

}

</style>
