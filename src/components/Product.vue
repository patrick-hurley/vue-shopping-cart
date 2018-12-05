<template>
  <div class="product">
    <h3>Product: {{ name }}</h3>
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
    name: String
  },
  methods: {
    addToBasket: function(name){
      this.$root.$emit('addIt',name);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.product {
  padding: 40px;
  background: #f5f5f5;
  border-radius: 10px;
  margin: 20px 0;
  h3 {
    display: inline-block;
    width: 200px;
  }
  button {
    background-color: rgb(212, 212, 212);
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
  }

}


</style>
