import { scanner } from '../components/scanner'
import { dbCollection } from '../components/dbCollection'
import { apiPath } from '../../FoodManager'

let template = `
    <div class="stock">
        <dbCollection :collection="'categories'" />
        <dbCollection :collection="'places'" />
    </div>
`

export const stock = {
    template: template,
    data: function() {
        return {      
        }
    },
    components: {
        scanner,
        dbCollection
    },
    methods: {
    }
}