import { apiPath } from '../FoodManager'

let template = `
    <div class="scanner">
        <h2>Scanner</h2>
        <input v-model="barCode">
        <button @click="submitBarCode">Send</button>
    </div>
`

export const scanner = {
    template: template,
    data: function() {
        return {
            barCode: ''
        }
    },
    methods: {
        submitBarCode : function(){
            console.log('scanner:submit bar code', this.barCode)
            this.$router.push({path: '/product/' + this.barCode});
        }
    }
}