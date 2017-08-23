import { apiPath } from '../../FoodManager'

let template = `
    <div class="collection" :class=" 'collection-' + singularCollection">
        <div :class="singularCollection + '-manager'">
            <h2>{{ collectionTitle }}</h2>

            <v-data-table
                v-model="selected"
                :headers="headers"
                :items="collectionData"
                :selected-key="'name'"
                select-all
            >          
                <template slot="items" scope="props">
                    <tr @click="props.selected = !props.selected">
                        <td><v-checkbox primary :input-value="props.selected"></v-checkbox></td>
                        <td class="text-xs-right">{{ props.item.name }}</td>
                    </tr>
                </template>
            </v-data-table>

            <v-text-field :id=" 'input-' + singularCollection + '-name' " v-model="newEltName" />
            <v-btn @click="addCollectionData">Add new {{ collection }}</v-btn>
            <v-btn @click="logSelected">Log selected</v-btn>
        </div>
    </div>
`

export const dbCollection = {
    template: template,
    props: ['collection'],
    data: function() {
        return {
            newEltName: '',
            collectionData: [],
            selected: [],
            headers: [
                { text: 'name', value: 'name' }, 
            ],
            loadingData: true,
            pagination: {
                sortBy: 'name'
            },
        }
    },
    computed: {
        collectionTitle: function(){
            return this.collection[0].toUpperCase() + this.collection.slice(1);
        },
        singularCollection: function(){
            let col: string = this.collection
            return col.substring(col.length - 3) === 'ies' ? col.substring(0, col.length - 3) + 'y' : col.substring(0, col.length - 1)
        }
    },
    methods: {
        logSelected(){
            console.log('selected list', this.selected)
        },
        getCollectionData: function(){
            return this.$http.get(apiPath + '/' + this.collection)
            .then( (data, status, request) => {
                // console.log('res api call', data.body)
                data.body.forEach(d => {
                    d.id = d._id
                });
                this.collectionData = data.body
            }).catch(function (data, status, request) {
                console.log('error', data, status, request)
            })
        },
        addCollectionData: function(){
            this.$http.get(apiPath + '/' + this.collection + '?$filter=name $eq ' + this.newEltName).then(res => {
                // console.log('res api call', res)
                if(res.body.length === 0){
                    this.$http.post(apiPath + '/' + this.collection, { name: this.newEltName })
                    .then(res => {
                        this.newEltName = ''
                        this.collectionData.push(res.body)
                    })
                    .catch( err => {
                        console.log('error on create place', err)
                    })
                }
            })
        }
    },
    mounted: function(){
        this.getCollectionData().then( () => { this.loadingData = false })
    }
}