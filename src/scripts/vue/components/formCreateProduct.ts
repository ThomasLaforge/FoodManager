import { apiPath } from '../../FoodManager'
import * as _ from 'lodash'

let template = `
<vCard class="form-create-product">
    <v-text-field 
        id="create-product-name" 
        v-model="createProductName"
        label="Name"
    />
    <v-select
        :items="categoryCollection"
        v-model="category"
        label="Add some categories"
        autocomplete
    />
    <vBtn @click="addCategoryChip">Add category to product</vBtn>
    <div class="create-product-categories-chips">
        <vChip v-for="(c, k) in categories" 
            :key="k"
            class="blue white--text"
            close 
            v-model="categories[k]"
        >{{ k }}</vChip>
    </div>
    <v-select
        :items="placeCollection"
        v-model="place"
        label="Add a place"
        autocomplete
    />
    <v-btn class="actions-create-product" @click="create">Create</v-btn>
</vCard>
`

export const formCreateProduct = {
    template: template,
    props: ['barCode', 'openDataProductName', 'openDataCategories'],
    data: function() {
        return {
            createProductName: '',
            category: '',
            place: '',
            categoryCollection: [],
            placeCollection: [],            
            categories: {}
        }
    },
    mounted: function(){
        Promise.all([
            this.$http.get(apiPath + '/categories'),                
            this.$http.get(apiPath + '/places'),                
        ])
        .then(res => {
            let datas = res.map(r => { return r.body || r })
            this.categoryCollection = datas[0].map(c => c.name)
            this.placeCollection = datas[1].map(c => c.name)
        })
        .catch( err => {
            console.log('product form: get initial data err', err)
        })
    },
    watch: {
        openDataProductName: function(val, oldVal){
            this.createProductName = val
        },
        openDataCategories: function(val){
            console.log('update categories with open data', val)
            let copy = _.cloneDeep(this.categories)
            val.forEach( c => {
               copy[c] = true 
            });
            this.categories = copy
        }
    },
    computed: {
        openedCategories: function(){
            return Object.keys(this.categories).filter( key => this.categories[key] );
        }
    },
    methods: {
        create: function(){
            console.log('create', this.barCode);
            let newProduct = {
                barcode : this.barCode, 
                name : this.createProductName, 
                categories: this.openedCategories,
                place: this.place
            }
            this.$http.post(apiPath + '/products', newProduct)
            .then( (data) => {
                let newProduct = data.body
                console.log('product added', newProduct)
                this.$emit('addProduct', newProduct)
                // this.category = ''
                // this.place = ''
                // this.createProductName = ''
            })
            .catch( err => {
                console.log('error on adding product', err)
            })
        },
        addCategoryChip: function(){
            let copy = _.cloneDeep(this.categories)
            copy[this.category] = true;
            this.categories = copy
            this.category = ''
        }
    }
}