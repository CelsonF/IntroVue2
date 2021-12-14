var eventBus = new Vue();


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
                <div class="d-flex">
                     <button @click="addToCart" class="mr-2" :disabled="!inStock" :class="{disabledButton: !inStock }">
                    Add to cart</button>
                <button @click="removeToCart" :disabled="!inStock" :class="{disabledButton: !inStock}">Remove of
                    cart</button>
                </div>
               
            </div>
        </div>

        <product-tabs :reviews="reviews">  </product-tabs>

        

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

            reviews:[]
        }
    },
    methods: {
        addToCart() {
            this.$emit('add-to-cart',this.variants[this.selectedVariant].variantId);
        },
        removeToCart() {
          this.$emit('remove-of-cart');
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
    },
    mounted() {
      eventBus.$on('review-submitted',productReview => {
        this.reviews.push(productReview);
      })
    }
})


Vue.component('product-tabs', {
    props:{
      reviews: {
          type:Array,
          required:true
      }
    },
    template: `
    <div>
       
            <span class="tab" 
                  :class="{activeTab: selectedTab === tab}"
                  v-for="(tab , index) in tabs"
                  @click="selectedTab = tab"
                  :key="index">{{ tab }}</span>
      

                <div v-show="selectedTab === 'Reviews'">
                  <p v-if="!reviews.length"> There are no reviews yet.</p>
                  <ul>
                   <li v-for="review in reviews">
                    <p>{{ review.name }}</p>
                    <p>Rating: {{ review.rating }}</p>
                    <p>{{ review.review }}</p>
                    <p>{{ review.recommend }}</p>
                   </li>
                  </ul>
                </div>
        
                <product-review  v-show="selectedTab === 'Make a Review'"></product-review>
    </div>
    `,
    data() {
        return {
            tabs:['Reviews','Make a Review'],
            selectedTab:'Reviews'
        }
    }
})


Vue.component('product-review', {
    template: 
    `<form class="review-form" @submit.prevent="onSubmit">

     <p v-if="erros.length">
      <b> Please correct the following error(s): </b>
      <ul>
       <li v-for="erro in erros">
         {{erro}}
       </li>
      </ul>
     </p>

      <p>
        <label for="name">Name:</label>
        <input id="name" v-model="name" placeholder="Name">
      </p>

      <p>
        <label for="review">Review:</label>
        <textarea id="review" v-model="review"></textarea>
      </p>

      <p>
        <label for="rating">Rating:</label>
        <select id="rating" v-model.number="rating">
          <option>5</option>
          <option>4</option>
          <option>3</option>
          <option>2</option>
          <option>1</option>
        </select>
      </p>

      <p>
       <label>Would you recommend this product ?</label>
       <div class="d-flex radios">
         <div>
          <label> Yes </label>
          <input name="recommendation" v-model="recommend" type="radio" value="Yes"> 
         </div>    
         <div>
          <label> No </label>
          <input name="recommendation" v-model="recommend" type="radio"  value="No">
         </div> 
        
       </div>
      </p>

      <p>
        <input type="submit" value="Submit">  
      </p>  

    </form>`,
    data() {
        return {
            name:null,
            review:null,
            rating:null,
            recommend:null,
            erros:[]
        }
    },
    methods: {
        onSubmit() {
            this.erros = [];
            if(this.name && this.review && this.rating && this.recommend)
            {
                let productReview = {
                name: this.name,
                review:this.review,
                rating:this.rating,
                recommend:this.recommend,
               }
            eventBus.$emit('review-submitted',productReview)
            this.name = null
            this.review = null
            this.rating = null
            this.recommend = null
            }
            else {
                if (!this.name) this.erros.push("Name is required.")
                if (!this.review) this.erros.push("Review is required.")
                if (!this.recommend) this.erros.push("Recommend is required.")   
                if (!this.rating) this.erros.push("Rating is required.")   
            }

            
        }
    }
})

var app = new Vue({
    el: '#app',
    data: {
        premium:true,         
        cart: []
    },
    methods: {
        updateCart(id) {
            this.cart.push(id);
        },
        removeProductCart(id) {
            if (this.cart.length !== 0)
            this.cart.shift(id);
        }
    }
});