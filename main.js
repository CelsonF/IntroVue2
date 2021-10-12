Vue.component('product-detail', {
    props: {
        details: {
            type:Array,
            required:true
        }
    },
    template: 
    `
    <ul>
      <li v-for="detail in details"> {{detail}} </li>
    </ul>
    `
})

Vue.component('product', {
    props: { 
        premium:{
            type:Boolean,
            required:true
        },
    },
    template: ` 
    <div class="product">
        <div class="product-image">
            <img :src="image" :alt="colorsSocks">
        </div>
    
        <div class="product-info">
            <h1>{{title}}</h1>
            <a v-show="ancorProd" :href="link" target="_blank">More products like this</a>
            <p v-if="inStock">In Stock</p>
            <p v-else="inStock" :class="[inStock ? '' : outStockLine ]">Out of Stock</p>
            <p> {{ sale }} </p>

            <p> Shipping: {{ shipping }} </p>
    
            <ul v-for="size in sizes">
                <li> {{size}} </li>
            </ul>
    
            <product-detail :details="details"></product-detail>

            <div class="d-flex">
                <div v-for="(variant, index) in variants" :key="variant.variantId" class="color-box variant-color"
                    :style="{backgroundColor: variant.variantColor}" @mouseover="updateProduct(index)">
                </div>
            </div>
    
    
            <div class="d-flex product-footer">
                <div class="cart">
                    <p>Cart({{cart}})</p>
                </div>
                <div class="d-flex">
                     <button @click="addToCart" class="mr-2" :disabled="!inStock" :class="{disabledButton: !inStock }">
                    Add to cart</button>
                <button @click="removeToCart" :disabled="!inStock" :class="{disabledButton: !inStock}">Remove of
                    cart</button>
                </div>
               
            </div>
        </div>
    </div> 
    `,
    data() {
        return {
            brand: 'Vue Mastery',
            product: 'Socks',
            selectedVariant: 0,
            outStockLine: 'text-through',
            ancorProd: false,
            colorsSocks: 'Green socks',
            onSale: true,
            link: 'https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks',
            details: ["80% cotton", "20% polyester", "Gender-neutral"],
    
            variants: [
                {
                    variantId: 2234,
                    variantColor: "#258651",
                    variantImage: './assets/vmSocks-green-onWhite.jpg',
                    variantQuantity: 10
                },
                {
                    variantId: 2235,
                    variantColor: "#2a3c4f",
                    variantImage: './assets/vmSocks-blue-onWhite.jpg',
                    variantQuantity: 0
                }
            ],
    
            sizes: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
    
            cart: 0
        }
    },
    methods: {
        addToCart() {
            this.cart += 1
        },
        removeToCart() {
            if (this.cart !== 0)
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
        },
        sale() {
            if (this.onSale && this.inStock) {
                return `${this.brand} ${this.product} are on sale!`
            }
            return `${this.brand} ${this.product} are not on sale!`
        },
        shipping() {
            if(this.premium) {
              return "Free"
            }
              return "2,99"
        }
    }
})

var app = new Vue({
    el: '#app',
    data: {
        premium:true
    }
});