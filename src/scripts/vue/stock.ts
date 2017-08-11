let apiPath = 'http://localhost:8080/api'

let template = `
    <div class="stock">
        stock:
        {{ categories }}
        <button @click="getCategories">Get categories</button>
    </div>
`

export const stock = {
    template: template,
    data: function() {
        return {
            categories: []
        }
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
        }
    }
}