<template>
    <div id="direction-bar">
        <FromToBar class="item" placeholder="From" @setPlace="setFrom"/>
        <i class="exchange alternate blue large link icon" @click="swap"></i>
        <FromToBar class="item" placeholder="To" @setPlace="setTo"/>

        <button ref="goBtn" class='ui blue disabled button' @click="findRoute">
            <i class="directions icon"></i> Go
        </button>
    </div>
</template>

<script>
import {mapState, mapWritableState, mapActions} from "pinia";
import {useDirectionStore} from "@/store/direction";
import {useSearchStore} from "@/store/search";

export default {
    data(){
        return{
            interval: 0,
        }
    },
    computed: {
        ...mapState(useSearchStore, ['navigation']),
        ...mapWritableState(useDirectionStore, ['fromId', 'toId', 'fromName', 'toName'])
    },
    methods: {
        ...mapActions(useDirectionStore, ['findRoute']),

        setFrom(id) {
            this.fromId = id;
        },

        setTo(id) {
            this.toId = id;
        },

        checkValue() {
            if (this.fromId !== "" && this.toId !== "")
                this.$refs.goBtn.classList.remove('disabled');
            else
                this.$refs.goBtn.classList.add('disabled');
        },

        swap(){
            [this.fromName, this.toName] = [this.toName, this.fromName];
            [this.fromId, this.toId] = [this.toId, this.fromId];
        }
    },

    beforeDestroy(){
        this.fromName = "";
        this.toName = "";
        this.fromId = "";
        this.toId = "";
    },

    watch: {
        toId() {
            this.checkValue();
        },
        fromId() {
            this.checkValue();
        },
    }
}
</script>

<style scoped lang="scss">
    i.blue.icon{
        color: var(--nav-btn-bg) !important;
    }

    button.ui.blue.button {
        margin-right: 1.5rem;
    }

    button.blue.button{
        background-color: var(--nav-btn-bg) !important;
    }

    @media screen and (max-width: 520px) {
        #direction-bar {
            padding: 20px 15px 0;

            i.exchange.icon{
                position: absolute;
                right: 14vw;
                transform: rotate(90deg) translateX(10px);
            }

            button{
                position: absolute;
                margin-right: 0;
                right: 8vw;
            }

            .item {
                margin-right: 3px;
                margin-bottom: 20px;
            }
        }
    }
</style>
