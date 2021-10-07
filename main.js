var app = new Vue({
    el: '#app',
    data: {
        product: 'Socks',
        inStock: false,
        ancorProd: false,
        image: './assets/vmSocks-green-onWhite.jpg',
        colorsSocks: 'Green socks',
        onSale: true,
        link: 'https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks',
        details: ["80% cotton", "20% polyester", "Gender-neutral"],

        variants: [
            {
                variantId: 2234,
                variantColor: "green"
            },
            {
                variantId: 2235,
                variantColor: "blue"
            }
        ],

    }
});