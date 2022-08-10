<template>
    <div id="direction-bar">
        <FromToBar class="item" placeholder="From" @setPlace="setFrom"/>
        <FromToBar class="item" placeholder="To" @setPlace="setTo"/>


        <button ref="goBtn" class='ui blue disabled button' @click="findRoute">
            <i class="directions icon"></i> Go
        </button>

    </div>
</template>

<script>
import {mapWritableState, mapActions} from "pinia";
import {useDirectionStore} from "@/store/direction";

export default {
    computed: {
        ...mapWritableState(useDirectionStore, ['fromId', 'toId'])
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
        }
    },
    watch: {
        toId(newValue) {
            this.checkValue();
        },
        fromId(newValue) {
            this.checkValue();
        }
    }
}
</script>

<style scoped lang="scss">
    button.ui.teal.button {
        margin-right: 1.5rem;
    }

    button.blue.button{
        background-color: var(--nav-btn-bg) !important;
    }

    @media screen and (max-width: 520px) {
        #direction-bar {
            padding: 20px 15px 0;


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
