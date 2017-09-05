import { apiPath, openFoodApiPath } from '../../FoodManager'
import { formCreateProduct } from '../components/formCreateProduct'
import { customInputNumber } from '../components/customInputNumber'
import * as moment from 'moment'

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
                {{ openDataDescription.product.categories }}
                <img :src="openDataDescription.product.selected_images.front.small.fr" />
                <!-- <img :src="openDataDescription.product.selected_images.front.display.fr" /> -->
            </div>
        </div>

        <formCreateProduct v-if="productList.length === 0" 
            @addProduct="addProduct"
            :openDataProductName="productName"
            :openDataCategories="openDataCategories"
            :barCode="barCode" 
        />

        <div class="product-list" v-if="productList.length > 0">
            <div class="product-list-elt" v-for="(product, i) in productList">
                Name : {{ product.name }} ,
                Categories : <span v-for="(c, k) in product.categories">
                    {{ c + (k > 0 ? ', ' : '') }}
                </span> ,
                Place : {{ product.place }}
            </div>
            <div>
                AddLine <br />
                <v-checkbox :label="'With peremption date'" v-model="withPeremptionDate"></v-checkbox>           
                <div class="peremption-selection" v-if="withPeremptionDate">
                    <vDatePicker
                        :first-day-of-week="1"
                        locale="fr"
                        v-model="datepicker"
                    />
                    <vTextField 
                        v-model="daysBeforePerumption"
                        label="daysBeforePerumption"
                        type="number" 
                    />
                </div>
                <div class="line-amount">
                    <customInputNumber 
                        v-model="lineAmount"
                    />
                </div>
            </div>
        </div>

        <div class="actions">
            <div class="action-product-exists" v-if="productList.length > 0">
                <v-btn class="actions-add" @click="addLine">Add</v-btn>
                <v-btn class="actions-remove" @click="removeLine">Remove</v-btn>
                <v-btn class="actions-delete" @click="deleteProduct">Delete</v-btn>
                <!-- <v-btn class="actions-delete" @click="deleteProduct">Delete</v-btn> -->
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
            removable: false,
            productName: null,
            openDataCategories: [],
            datepicker: moment().format('YYYY-MM-DD'),
            lineAmount: 1,
            withPeremptionDate: true
        }
    },
    components: {
        formCreateProduct,
        customInputNumber
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
            console.log('product: get initial data', datas)
            this.productList = datas[0]
            this.lineList = datas[1]
            this.openDataDescription = datas[2] || null
            this.productName = this.openDataDescription && this.openDataDescription.product && this.openDataDescription.product.product_name
            this.openDataCategories = this.openDataDescription && this.openDataDescription.product.categories && this.openDataDescription.product.categories.split(',')
            
            console.log('open read', this.productName, datas[2], datas[2] || null, this.openDataDescription && this.openDataDescription.product && this.openDataDescription.product.product_name)
        })
        .catch( err => {
            console.log('product: get initial data err', err)
        })
    },
    computed : {
        barCode : function(){ return this.$route.params.barCode },
        createFormOk: function(){ return this.createProductName.length > 0 },
        daysBeforePerumption: {
            get : function(){ 
                return moment(this.datepicker).diff(moment().format('YYYY-MM-DD'), 'days') 
            },
            set : function(newVal){ 
                if(!Number.isNaN(newVal) && newVal !== ''){
                    this.datepicker = moment().add(newVal, 'days').format('YYYY-MM-DD')
                }
            }
        }
    },
    methods: {
        addLine: function(){
            console.log('add product')
            let datas = {
                product_id: this.productList[0]._id,
                amount: this.lineAmount,
                peremption_date: this.withPeremptionDate ? this.datepicker : null
            };
            this.$http.post(apiPath + '/lines', datas).then( newLine => {
                console.log('new Line', newLine.body)
            })            
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
        },
        showDate: function(){
            console.log('actual date', this.datepicker)
            console.log('moment now', moment().format('YYYY-MM-DD'))
            console.log('diff date', moment(this.datepicker).diff(moment().format('YYYY-MM-DD'), 'days') )  
        }
    }
}