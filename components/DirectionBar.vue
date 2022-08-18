<template>
    <div id="direction-bar">
        <FromToBar class="item" placeholder="From" @setPlace="setFrom"/>
        <i class="exchange alternate blue large link icon" @click="swap"></i>
        <FromToBar class="item" placeholder="To" @setPlace="setTo"/>

        <button ref="goBtn" class='ui blue disabled button' @click="goHandler">
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
        ...mapWritableState(useDirectionStore, ['myTop', 'myLeft', 'fromId', 'toId', 'fromName', 'toName'])
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

        goHandler(){
            this.findRoute();
            if(this.fromId === "my-location" || this.toId === "my-location")
                this.setTimer();
        },

        async provideLocation(){
            if (!navigator.geolocation)
                alert("Geolocation is not supported in this browser.");
            else
                navigator.geolocation.getCurrentPosition(await this.success, this.error);
        },

        success(position){
            let x = position.coords.longitude.toPrecision(7) * 100000;
            let y = position.coords.latitude.toPrecision(7) * 100000;
            this.myLeft = (x - 7727333) * (3420 / 907.0);
            this.myTop = 3876 - (y - 1149133) * (3876 / 1016.0);
            if(!this.$refs.goBtn.classList.contains('disabled'))
                this.findRoute();
        },

        error(){
            alert("Unable to get your location.");
        },

        setTimer(){
            this.interval = setInterval(this.provideLocation, 30000);
        },

        clearTimer(){
            clearInterval(this.interval);
        },

        swap(){
            this.clearTimer();
            [this.fromName, this.toName] = [this.toName, this.fromName];
            [this.fromId, this.toId] = [this.toId, this.fromId];
        }
    },

    beforeDestroy(){
        this.clearTimer();
        this.fromName = "";
        this.toName = "";
        this.fromId = "";
        this.toId = "";
    },

    watch: {
        async toId(newValue, oldValue) {
            this.checkValue();

            if(oldValue === "my-location")
                await this.clearTimer();
        },
        async fromId(newValue, oldValue) {
            this.checkValue();

            if(oldValue === "my-location")
                await this.clearTimer();
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
