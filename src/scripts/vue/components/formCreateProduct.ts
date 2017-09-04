import { apiPath } from '../../FoodManager'

let template = `
<vCard class="form-create-product">
    <v-text-field 
        id="create-product-name" 
        v-model="createProductName"
        label="Name"
    />
    <v-select
        :items="placeCollection"
        v-model="place"
        label="Add a place"
        autocomplete
    />
    <v-select
        :items="categoryCollection"
        v-model="category"
        label="Add some categories"
        autocomplete
    />
    <div class="create-product-categories-chips">
        <vChip v-for="(c, k) in categories" :key="k">{{ c }}</vChip>
    </div>
    <vBtn @click="addCategoryChip">Add category to product</vBtn>
    <v-btn class="actions-create-product" @click="create">Create</v-btn>
</vCard>
`

export const formCreateProduct = {
    template: template,
    props: ['barCode', 'openDataProductName'],
    data: function() {
        return {
            createProductName: '',
            categoryCollection: [],
            category: '',
            categories: [],
            placeCollection: [],            
            place: ''
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
        }
    },
    computed: {

    },
    methods: {
        create: function(){
            console.log('create', this.barCode);
            let newProduct = {
                barcode : this.barCode, 
                name : this.createProductName, 
                categories: this.categories,
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
            this.categories.push(this.category);
            this.category = ''
        }
    }
}