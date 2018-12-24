<template>
  <div class="product">
    <img :src="require(`../assets/img/${img}.png`)" alt=""/>
    <h3>{{ name }}</h3>
    <p>{{ formatPrice }}</p>
    <p v-show="itemTotal() > 0">{{ itemTotal() + ' in basket' }}</p>
    <a class="btn" @click="addToBasket(name)">Add to Cart</a>
  </div>
</template>

<script>
export default {
  name: 'Product',
  data(){
    return { 
      itemIndex: ''
    }
  },
  props: {
    name: String,
    img: String,
    price: Number,
    cartItems: Array
  },
  methods: {
    addToBasket: function(){
      this.$root.$emit('addIt',{'name': this.name, 'price': this.price, 'quantity':1});
    },
    itemTotal: function(){
      this.itemIndex = this.cartItems.findIndex(x => x.name == this.name)
      if(this.itemIndex >= 0){
        return this.cartItems[this.itemIndex].quantity
      }
    }
  },
  computed: {
    formatPrice(){
      return '£' + (this.price).toFixed(2);
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
  .btn {
    margin-top: 15px;
  }

}

</style>
