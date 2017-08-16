import { apiPath } from '../../FoodManager'

let template = `
    <div class="product">
        <div class="bar-code">
            <div class="bar-code-title">Bar Code</div>
            <div class="bar-code-value">{{ barCode }}</div>
        </div>

        <div class="product-list" v-if="productList.length > 0">
            <div class="product-list-elt" v-for="(product, i) in productList">
                {{ product }}
            </div>
        </div>

        <div class="actions">
            <div class="action-product-exists" v-if="productList.length > 0">
                <v-btn class="actions-add" @click="add">Add</v-btn>
                <v-btn class="actions-remove" @click="remove">Remove</v-btn>
                <v-btn class="actions-delete" @click="deleteProduct">Delete</v-btn>
            </div>
            <div class="actions-product-not-exists" v-if="productList.length === 0">
                <v-btn class="actions-create" @click="create">Create</v-btn>
            </div>
        </div>
    </div>
`

export const product = {
    template: template,
    data: function() {
        return {
            productList : [],
            lineList: [],
            addable: false,
            removable: false
        }
    },
    mounted: function(){
        // console.log('routing:product', this.$route.params, this.$route.params.barCode)
        console.log('product:barCode', this.barCode)
        this.refresh()
    },
    computed : {
        barCode : function(){ return this.$route.params.barCode },
    },
    methods: {
        refresh: function(){
            Promise.all([
                this.$http.get(apiPath + '/products?$filter=barcode $eq ' + this.barCode ),
                this.$http.get(apiPath + '/lines?$filter=barcode $eq ' + this.barCode ),
            ])
            .then(res => {
                let datas = res.map(r => r.body)
                console.log('product: get initial data', res.map(r => r.body), res)
                this.productList = datas[0]
                this.lineList = datas[1]
            })
            .catch( err => {
                console.log('product: get initial data err', err)
            })
        },
        add: function(){
            console.log('add product')
        },
        remove: function(){
            console.log('remove product')
        },
        create: function(){
            console.log('create');
            this.$http.post(apiPath + '/products', { barcode : this.barCode, name : 'newProduct'})
            .then( (data) => {
                console.log('product added', data)
                this.refresh()
            })
        },
        deleteProduct: function(){
            this.$http.delete(apiPath + '/products?$filter=barcode $eq ' + this.barCode)
            .then( res => {
                if(res.ok){
                    console.log('product deleted', res)
                    this.refresh()
                }
            })
        }
    }
}