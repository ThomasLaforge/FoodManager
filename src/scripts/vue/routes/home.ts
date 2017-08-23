import { scanner } from '../components/scanner'
import { apiPath } from '../../FoodManager'

let template = `
    <div class="home">
        <scanner />
    </div>
`

export const home = {
    template: template,
    data: function() {
        return {
        }
    },
    components: {
        scanner
    },
    methods: {

    }
}