import { scanner } from '../components/scanner'
import { apiPath } from '../../FoodManager'

let template = `
    <div class="stock">
        <scanner />
        stock:
        {{ categories }}
        <v-btn @click="getCategories">Get categories</v-btn>
        <v-btn @click="removeAllCategories">Remove all categories</v-btn>
        <v-btn @click="addCategory">Add category "conserve"</v-btn>        
    </div>
`

export const stock = {
    template: template,
    data: function() {
        return {
            categories: []
        }
    },
    components: {
        scanner
    },
    methods: {
        getCategories: function(){
            console.log('start api call')
            this.$http.get(apiPath + '/categories').then( (data, status, request) => {
                console.log('res api call', data.body)
                this.categories = data.body
            }).catch(function (data, status, request) {
                console.log('error', data, status, request)
            })
        },  
        addCategory: function(){
            console.log('start api call')
            this.$http.get(apiPath + '/categories', { name: 'conserves'}).then(res => {
                if(res.body.length === 0){
                    this.$http.post(apiPath + '/categories', { name: 'conserves'}).then( (data, status, request) => {
                        console.log('res api call', data)
                        this.getCategories()
                    }).catch(function (data, status, request) {
                        console.log('error', data, status, request)
                    })
                }
            })
        },
        removeAllCategories(){
            Promise.all(this.categories.map( category => 
                this.$http.delete(apiPath + '/categories/' + category._id)
            )).then( () => {
                this.getCategories()
            })
        }
    },
    mounted: function(){
        this.getCategories()
    }
}