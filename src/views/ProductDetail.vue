<template>
    <div v-if="product" class="product-detail">
        <h1>{{ product.name }}</h1>
        <img :src="require(`../assets/img/${product.img}.png`)" alt=""/>
        <p>{{ lorem }}</p>
        <router-link class="btn red lighten-1" :to="{ name: 'department', params: { department: product.department.toLowerCase() }}"><i class="fas fa-arrow-left"/> Back to {{ product.department }}</router-link>       
        <button class="btn" @click="addToCart(productPayload)">Add to cart</button>
        <blockquote v-show="itemCount(itemIndex) > 0">{{ itemCount(itemIndex) + ' in cart' }}</blockquote>
    </div>
</template>

<script>

    import { mapState, mapActions, mapGetters } from 'vuex'

    export default {
        data(){
            return {
                lorem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec posuere tortor ac sapien iaculis, vitae iaculis nunc iaculis. Mauris justo nisi, tempor venenatis felis vel, elementum venenatis mi. Morbi in dolor vehicula, sollicitudin ante non, eleifend tellus. Nunc mollis tortor quis sapien aliquet porttitor. Duis eu turpis vel sapien tristique sodales. Ut quis risus sed dui sagittis ultricies vel eu felis. Donec in cursus tortor, vitae vehicula nisl.'
            }
        },
        methods: {
            ...mapActions([
                'addToCart'
            ])
        },
        computed: {
            ...mapState([
                'products',
                'cartItems'
            ]),
            ...mapGetters([
                'itemCount'
            ]),
            product(){
                let findProduct = this.products.filter(x => x.name == this.formattedProduct)
                return findProduct[0];
            },
            formattedProduct(){
                let removeSlash = this.$route.params.product.replace(/-/g, ' ')
                return removeSlash.replace(/\w\S*/g, function(txt){
                    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
                });
            },
            productPayload(){
                return { 'name': this.product.name, 'price': this.product.price }
            },
            itemIndex(){
                return this.cartItems.findIndex(x => x.name == this.product.name)
            },
        }
    }
</script>

<style lang="scss" scoped>

.product-detail {
    width: 80%;
    margin-bottom: 50px;
    img {
        width: 100%;
        margin: 20px 0;
    }
    i {
        font-size: 14px;
    }
    p {
        margin-bottom: 20px;
    }
    button {
        margin-left: 30px;
    }
    blockquote {
        display: inline-block;
        margin-left: 30px;
    }
      
}

</style>