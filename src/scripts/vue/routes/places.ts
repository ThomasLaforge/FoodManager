import { dbCollection } from '../components/dbCollection'
import { apiPath } from '../../FoodManager'

let template = `
    <div class="stock">
        <dbCollection :collection="'places'" />
    </div>
`

export const places = {
    template: template,
    data: function() {
        return {      
        }
    },
    components: {
        dbCollection
    },
    methods: {
    }
}