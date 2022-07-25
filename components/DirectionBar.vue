<template>
    <div>
        <FromToBar class="item" placeholder="From" @setPlace="setFrom"/>
        <FromToBar class="item" placeholder="To" @setPlace="setTo" />

        <button ref="goBtn" class='ui teal disabled button' @click="findRoute">
            <i class="directions icon"></i> Go
        </button>
    </div>
</template>

<script>
export default {
    emits: ['success'],
    data(){
        return{
            from: "",
            to: ""
        }
    },
    methods: {
        setFrom(id){
            this.from = id;
        },
        setTo(id){
            this.to = id;
        },
        async findRoute(){
            let response = await this.$http.$get(`http://localhost:4567/map/direction?from=${this.from}&to=${this.to}`);
            this.$emit('success', response);
        },
        checkValue(){
            if(this.from !== "" && this.to !== "")
                this.$refs.goBtn.classList.remove('disabled');
            else
                this.$refs.goBtn.classList.add('disabled');
        }
    },
    watch: {
        to(newValue){
            this.checkValue();
        },
        from(newValue){
            this.checkValue();
        }
    }
}
</script>

<style scoped>
    button.ui.teal.button{
        margin-right: 1.5rem ;
    }
</style>
