<template>
    <div>
        <Product v-for="(product, index) in products" :key="index" v-bind="product" :cartItems="cartItems"/>
    </div>
</template>

<script>

    import Product from '../components/Product.vue'

    export default {
        data(){
            return {
                products: [{
                    name: "T shirt",
                    img: "tshirt",
                    price: 22.00
                },
                {
                    name: "Jeans",
                    img: "jeans",
                    price: 40
                },
                {
                    name: "Shoes",
                    img: "shoes",
                    price: 75
                },
                {
                    name: "Jacket",
                    img: "jacket",
                    price: 60
                }]
            }
        },
        props: {
            cartItems: Array
        },
        components: {
            Product
        }
    }

</script>

<style scoped>

</style>