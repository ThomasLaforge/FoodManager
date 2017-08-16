import { apiPath } from '../../FoodManager'

let template = `
    <div class="scanner">
        <h2>Scanner</h2>
        <v-text-field v-model="barCode" id="scanner-textfield" />
        <v-btn @click="submitBarCode">Send</v-btn>
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
            if(this.barCode.length > 0){
                console.log('scanner:submit bar code', this.barCode)
                this.$router.push({path: '/product/' + this.barCode});
            }
        }
    }
}