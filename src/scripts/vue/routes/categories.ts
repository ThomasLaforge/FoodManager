import { dbCollection } from '../components/dbCollection'
import { apiPath } from '../../FoodManager'

let template = `
    <div class="stock">
        <dbCollection :collection="'categories'" />
    </div>
`

export const categories = {
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