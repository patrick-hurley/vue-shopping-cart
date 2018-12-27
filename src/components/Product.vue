<template>
  <div class="product">
    <img :src="require(`../assets/img/${img}.png`)" alt=""/>
    <div class="product-info">
      <h3>{{ name }}</h3>
      <p>{{ formatPrice }}</p>
      <blockquote v-show="itemCount(itemIndex) > 0">{{ itemCount(itemIndex) + ' in basket' }}</blockquote>
      <a class="btn" @click="addToBasket(name)">Add to Cart</a>
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
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

$color-button: #d4d4d4;

.product {
  overflow: auto;
  padding: 40px;
  background: #f5f5f5;
  border-radius: 10px;
  margin: 20px 0;
  img {
    width: 250px;
    float: left;
    margin-right: 40px;
  }
  .product-info {
    float: left;
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
