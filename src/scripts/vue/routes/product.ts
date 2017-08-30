import { apiPath, openFoodApiPath } from '../../FoodManager'
import { formCreateProduct } from '../components/formCreateProduct'

let template = `
    <div class="product">
        <div class="bar-code">
            <div class="bar-code-title">Bar Code</div>
            <div class="bar-code-value">{{ barCode }}</div>
        </div>

        <div class="product-description" v-if="openDataDescription && openDataDescription.status === 1">
            <div class="product-description-name">Name: {{ openDataDescription.product.product_name }}</div>
            <div class="product-description-brands">Brands: {{ openDataDescription.product.brands }}</div>
            <div class="product-description-image">
                <img :src="openDataDescription.product.selected_images.front.small.fr" />
                <img :src="openDataDescription.product.selected_images.front.display.fr" />
            </div>
        </div>


        <div v-if="productList.length === 0">
            <formCreateProduct @addProduct="addProduct" :barCode="barCode" />
        </div>
        <div class="product-list" v-if="productList.length > 0">
            <div class="product-list-elt" v-for="(product, i) in productList">
                {{ product }}
            </div>
        </div>

        <div class="actions">
            <div class="action-product-exists" v-if="productList.length > 0">
                <v-btn class="actions-add" @click="addLine">Add</v-btn>
                <v-btn class="actions-remove" @click="removeLine">Remove</v-btn>
                <v-btn class="actions-delete" @click="deleteProduct">Delete</v-btn>
            </div>
            <div class="actions-product-not-exists" v-if="productList.length === 0">
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
            openDataDescription: null,
            addable: false,
            removable: false
        }
    },
    components: {
        formCreateProduct
    },
    mounted: function(){
        // console.log('routing:product', this.$route.params, this.$route.params.barCode)
        console.log('product:barCode', this.barCode)
        Promise.all([
            this.$http.get(apiPath + '/products?$filter=barcode $eq "' + this.barCode + '"'),
            this.$http.get(apiPath + '/lines?$filter=barcode $eq "' + this.barCode + '"'),
            navigator.onLine && this.$http.get(openFoodApiPath + '/produit/' + this.barCode + '.json'),
        ])
        .then(res => {
            let datas = res.map(r => { return r.body || r })
            // console.log('product: get initial data', datas)
            this.productList = datas[0]
            this.lineList = datas[1]
            this.openDataDescription = datas[2] || null
        })
        .catch( err => {
            console.log('product: get initial data err', err)
        })
    },
    computed : {
        barCode : function(){ return this.$route.params.barCode },
        createFormOk: function(){ return this.createProductName.length > 0 },
    },
    methods: {
        addLine: function(){
            console.log('add product')
        },
        removeLine: function(){
            console.log('remove product')
        },
        deleteProduct: function(){
            this.$http.delete(apiPath + '/products?$filter=barcode $eq "' + this.barCode + '"')
            .then( res => {
                if(res.ok){
                    console.log('product deleted', res)
                    this.productList = []
                }
            })
        },
        addProduct: function(product){
            this.productList.push(product)            
        }
    }
}