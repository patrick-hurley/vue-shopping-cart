<template>
    <div>
        <Product v-for="(product, index) in products" :key="index" v-bind="product"/>
    </div>
</template>

<script>

    import Product from '../components/Product.vue'

    export default {
        data(){
            return {
                products: []
            }
        },
        components: {
            Product
        },
        computed: {
            clothesProducts(){
                return this.products.filter(x => x.department == 'Clothes')
            }
        },
        mounted () {
            axios
            .get('./json/clothes.json')
            .then(response => (this.products = response.data.products))
        }
    }

</script>

<style scoped>

</style>