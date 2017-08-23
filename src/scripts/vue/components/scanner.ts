import { apiPath, isValidBarCode } from '../../FoodManager'

let template = `
    <div class="scanner">
        <h2>Scanner</h2>
        <v-text-field 
            v-model="barCode" 
            id="scanner-textfield"
            autofocus
            :error="barCode.length > 0 && !isValidBarCode"
            hint="Enter a barcode or scan it!"
        />
        <v-btn @click="submitBarCode">Go to product</v-btn>
    </div>
`

export const scanner = {
    template: template,
    data: function() {
        return {
            barCode: '',
            notValidBarCode : false
        }
    },
    computed: {
        isValidBarCode: function(){ return isValidBarCode(this.barCode)}
    },
    methods: {
        submitBarCode : function(){
            if(this.barCode.length > 0){
                if( this.isValidBarCode ) {
                    console.log('scanner:submit bar code', this.barCode)
                    this.$router.push({path: '/product/' + this.barCode});
                }
                else {
                    this.notValidBarCode = true;
                }
            }
        }
    }
}