<template>
    <div>
        <Product v-for="(product, index) in foodProducts" :key="index" v-bind="product"/>
    </div>
</template>

<script>

    import Product from '../components/Product.vue'

    export default {
        data(){
            return {
                foodProducts: []
            }
        },
        components: {
            Product
        },
        mounted() {
            axios
            .get('./json/products.json')
            .then(response => {
                this.foodProducts = response.data.products.filter(x => x.department == 'Food')
            })
        }
    }

</script>

<style scoped>

</style>