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
                    name: "Carrots",
                    img: "carrots",
                    price: 0.10
                },
                {
                    name: "Baked beans",
                    img: "baked-beans",
                    price: 1.35
                },
                {
                    name: "Spaghetti",
                    img: "spaghetti",
                    price: 1.50
                },
                {
                    name: "Eggs",
                    img: "eggs",
                    price: 1.30
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