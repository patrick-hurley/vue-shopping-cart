<template>
    <div v-if="product" class="product-detail">
        <h2>{{ product.name }}</h2>
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
                'cartItems'
            ]),
            ...mapGetters([
                'itemCount'
            ]),
            products(){
                return this.$store.state.products
            },
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

@import '../assets/scss/grid';

.product-detail {
    width: 80%;
    @media only screen and (max-width: $screen-sm-max){
        width: 100%;
        margin: 0 auto;
        padding-left: 25px;
        padding-right: 25px;
    }
    margin-bottom: 50px;
    h2 {
        @media only screen and (max-width: $screen-sm-max){
            font-size: 35px;
        }
    }
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
    .btn {
        @media only screen and (max-width: $screen-sm-max){
            display: block;
            width: 100%;
        }
    }
    button {
        @media only screen and (max-width: $screen-sm-max){
            margin-top: 20px;
        }
        @media only screen and (min-width: $screen-md-min){
            margin-left: 30px;
        }
    }
    blockquote {
        display: inline-block;
        margin-left: 30px;
        @media only screen and (max-width: $screen-md-max){
            display: block;
            margin: 20px 0
        }
    }
      
}

</style>