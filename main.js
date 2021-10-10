var app = new Vue({
    el: '#app',
    data: {
        brand:'Vue Mastery',
        product: 'Socks',
        selectedVariant:0,
        outStockLine:'text-through',
        ancorProd: false,
        colorsSocks: 'Green socks',
        onSale: true,
        link: 'https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks',
        details: ["80% cotton", "20% polyester", "Gender-neutral"],

        variants: [
            {
                variantId: 2234,
                variantColor: "#258651",
                variantImage:'./assets/vmSocks-green-onWhite.jpg',
                variantQuantity:10
            },
            {
                variantId: 2235,
                variantColor: "#2a3c4f",
                variantImage:'./assets/vmSocks-blue-onWhite.jpg',
                variantQuantity:0
            }
        ],

        sizes: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'],

        cart:0
    },
    methods: {
        addToCart() {
            this.cart += 1
        },
        removeToCart() {
            if(this.cart !== 0)
               this.cart -= 1
        },
        updateProduct(index) {
            this.selectedVariant = index
        }
    },
    computed: {
        title() {
           return this.brand + ' ' + this.product 
        },
        image() {
           return this.variants[this.selectedVariant].variantImage
        },
        inStock() {
            return this.variants[this.selectedVariant].variantQuantity
        }
    }
});