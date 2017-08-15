import { apiPath } from '../FoodManager'

let template = `
    <div class="product">
        <div class="bar-code">
            <div class="bar-code-title">Bar Code</div>
            <div class="bar-code-value">{{ barCode }}</div>
        </div>

        <div class="product-list">
            <div class="product-list-elt" v-for="(product, i) in productList">
                {{ product }}
            </div>
        </div>

        <div class="actions">
            <button class="actions-add" @click="add">Add</button>
            <button class="actions-add" @click="remove">Remove</button>
        </div>
    </div>
`

export const product = {
    template: template,
    data: function() {
        return {
            productList : []
        }
    },
    mounted: function(){
        // console.log('routing:product', this.$route.params, this.$route.params.barCode)
        console.log('product:barCode', this.barCode)
        Promise.all([
            this.$http.get(apiPath + '/products', { barcode: this.barCode }),
            this.$http.get(apiPath + '/line', { barcode: this.barCode }),
        ])
        .then(res => {
            console.log('product: get initial data', res)            
        })
        .catch( err => {
            console.log('product: get initial data err', err)
        })
    },
    computed : {
        barCode : function(){ return this.$route.params.barCode },
    },
    methods: {
        add: function(){
            console.log('add product')
        },
        remove: function(){
            console.log('remove product')
        }
    }
}