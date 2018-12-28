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
    import { mapState } from 'vuex'

    export default {
        components: {
            Product
        },
        computed: {
            ...mapState([
                'products',
                'loading',
                'errored'
            ]),
            filteredProducts(){
                return this.products.filter(x => x.department.toLowerCase() == this.$route.params.department)
            }
        }
    }

</script>

<style scoped>

p  {
    font-size: 20px;
}  

</style>