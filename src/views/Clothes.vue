<template>
    <div>
        <section v-if="errored">
            <p>Hmmmm. Something went wrong</p>
        </section>
        <section v-else>
            <p v-show="loading">Loading... <i class="fas fa-spinner fa-spin"></i></p>
            <Product v-for="(product, index) in clothesProducts" :key="index" v-bind="product"/>
        </section>
    </div>
</template>

<script>

    import Product from '../components/Product.vue'

    export default {
        data(){
            return {
                products: [],
                errored: false,
                loading: true
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
            .get('./json/products.json')
            .then(response => (this.products = response.data.products))
            .catch(error => {
                console.log(error)
                this.errored = true
            })
            .finally(() => this.loading = false)
        }
    }

</script>

<style scoped>

p  {
    margin-top: 30px;
    font-size: 20px;
}  

</style>