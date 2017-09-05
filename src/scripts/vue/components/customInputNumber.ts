let template = `
<div class="custom-number-input">
    <vBtn 
        @click="amountDown"
        :disabled="value === 1"
    >
        <vIcon>keyboard_arrow_left</vIcon>
    </vBtn>
    <vTextField 
        id="line-amount"
        :value="customValue"
        @input="updateValue"
        type="number" 
    />
    <vBtn @click="amountUp">
        <vIcon>keyboard_arrow_right</vIcon>
    </vBtn>                    
</div>
`

export const customInputNumber = {
    template: template,
    props: ['value'],
    data: function() {
        return {
            customValue: this.value
        }
    },
    computed: {
    },
    watch: {
    },
    methods: {
        updateValue: function(val){
            console.log('value to update', val)
            this.customValue = Number.parseInt(val)
            this.$emit('input', Number.parseInt(val))
        },
        amountDown: function(){
            console.log('amount down')
            if(this.customValue > 1) {
                this.customValue--
                this.$emit('input', this.customValue)
            }
        },
        amountUp: function(){
            console.log('amount up')
            this.customValue++
            this.$emit('input', this.customValue)
        }
    }
}