<template>
    <div class="content">
        <section v-if="errored">
            <p>Hmmm. Something has gone wrong.</p>
        </section>
        <section v-else>
             <p v-show="loading">Loading... <i class="fas fa-spinner fa-spin"/></p>
             <Product v-for="(product, index) in filteredProducts" :key="index" v-bind="product"/>
        </section>
    </div>
</template>

<script>

    import Product from '../components/Product.vue'

    export default {
        data(){
            return {
                products: [],
                loading: true,
                errored: false
            }
        },
        components: {
            Product
        },
        computed: {
            filteredProducts(){
                return this.products.filter(x => x.department.toLowerCase() == this.$route.params.department)
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
    font-size: 20px;
}  

</style>