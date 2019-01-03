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
  }
}
</script>

<style scoped lang="scss">

$color-button: #d4d4d4;

.product {
  display: table;
  width: 100%;
  height: 250px;
  margin-bottom: 30px;
  background: #f5f5f5;
  border-radius: 10px;
  padding: 10px;
  .product-image {
    display: table-cell;
    padding: 20px;
    width: 350px;
    img {
      width: 100%;
      height: 220px;
    }
  }
  .product-info {
    display: table-cell;
    vertical-align: top;
    padding: 20px 10px;
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
