<template>
    <div>
        <Product name="T shirt" img="tshirt"/>
        <Product name="Jeans" img="jeans"/>
        <Product name="Shoes" img="shoes"/>
    </div>
</template>

<script>

    import Product from '../components/Product.vue'

    export default {
        components: {
            Product
        }
    }

</script>

<style scoped>

</style>