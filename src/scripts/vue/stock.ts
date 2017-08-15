import { scanner } from './scanner'
import { apiPath } from '../FoodManager'

let template = `
    <div class="stock">
        <scanner />
        stock:
        {{ categories }}
        <button @click="getCategories">Get categories</button>
        <button @click="removeAllCategories">Remove all categories</button>
        <button @click="addCategory">Add category "conserve"</button>        
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
                console.log('res api call', data.body.categories)
                this.categories = data.body.categories
            }).catch(function (data, status, request) {
                console.log('error', data, status, request)
            })
        },  
        addCategory: function(){
            console.log('start api call')
            this.$http.post(apiPath + '/categories', { name: 'conserves'}).then( (data, status, request) => {
                console.log('res api call', data)
                this.getCategories()
            }).catch(function (data, status, request) {
                console.log('error', data, status, request)
            })
        },
        removeAllCategories(){
            Promise.all(this.categories.map( category => 
                this.$http.delete(apiPath + '/categories/' + category._id)
            )).then( () => {
                this.getCategories()
            })
        }
    }
}