<template>
  <div class="product">
    <img :src="require(`../assets/img/${img}.png`)" alt=""/>
    <h3>{{ name }}</h3>
    <p>{{ formatPrice }}</p>
    <button @click="addToBasket(name)">Add to Cart</button>
  </div>
</template>

<script>
export default {
  name: 'Product',
  data(){
    return { }
  },
  props: {
    name: String,
    img: String,
    price: Number
  },
  methods: {
    addToBasket: function(){
      this.$root.$emit('addIt',{'name': this.name, 'price': this.price, 'quantity':1});
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
  button {
    margin-top: 20px;
    background-color: $color-button;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
    font-weight: 900;
    &:hover {
      background-color: darken($color-button, 10%);
    }
    &:focus {
      outline: none;
    }
  }

}

</style>
