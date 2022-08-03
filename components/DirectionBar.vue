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
import {mapWritableState, mapActions} from "pinia";
import {useDirectionStore} from "@/store/direction";

export default {
    emits: ['success'],
    computed: {
        ...mapWritableState(useDirectionStore, ['fromId', 'toId'])
    },
    methods: {
        ...mapActions(useDirectionStore, ['findRoute']),
        setFrom(id){
            this.fromId = id;
        },
        setTo(id){
            this.toId = id;
        },
        checkValue(){
            if(this.fromId !== "" && this.toId !== "")
                this.$refs.goBtn.classList.remove('disabled');
            else
                this.$refs.goBtn.classList.add('disabled');
        }
    },
    watch: {
        toId(newValue){
            this.checkValue();
        },
        fromId(newValue){
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
