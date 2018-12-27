<template>
    <div>
        <section v-if="errored">
            <p>Hmmm. Something has gone wrong.</p>
        </section>
        <section v-else>
             <p v-show="loading">Loading... <i class="fas fa-spinner fa-spin"/></p>
             <Product v-for="(product, index) in foodProducts" :key="index" v-bind="product"/>
        </section>
    </div>
</template>

<script>

    import Product from '../components/Product.vue'

    export default {
        data(){
            return {
                foodProducts: [],
                loading: true,
                errored: false
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
            .catch(error => {
                console.log(error);
                this.errored = true;
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