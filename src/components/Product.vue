<template>
  <div class="product">
    <div class="product-image">
      <img :src="require(`../assets/img/${img}.png`)" alt=""/>
    </div>
    <div class="product-info">
      <h3><router-link :to="{ name: 'product-detail', params: { product: slashedName } }">{{ name }}</router-link></h3>
      <p>{{ formatPrice }}</p>
      <blockquote v-show="itemCount(itemIndex) > 0">{{ itemCount(itemIndex) + ' in basket' }}</blockquote>
      <button class="btn" @click="addToBasket(name)">Add to Cart</button>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'Product',
  data(){
    return { 

    }
  },
  props: {
    name: String,
    img: String,
    price: Number
  },
  methods: {
    ...mapMutations([
      'ADD_TO_CART',
      'UPDATE_CART'
    ]),
    addToBasket: function(){
      let item = {'name': this.name, 'price': this.price, 'quantity': 1};
      let found = this.cartItems.some((el) => {
        return el.name === this.name
      });
      if(!found){
        this.ADD_TO_CART(item)
      }
      else {
        this.UPDATE_CART(item)
      }
    }
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
    margin-bottom: 10px;
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
