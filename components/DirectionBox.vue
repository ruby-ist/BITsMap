<template>
    <div id="direction-box">
        <div class="ui large blue header">Distance: {{ Math.round(distance) }} m</div>
        <br/>
        <div class="details">
            <div class="place-name"> From:</div>
            <div class="ui blue label"> {{ fromName }} </div>
            <br/>
            <br/>
            <div class="place-name"> To:</div>
            <div class="ui blue label"> {{ toName }} </div>
        </div>

        <div class="icon-boxes">
            <div class="ui huge circular icon button" @click="directionBox = false">
                <i class="angle double down blue icon"></i>
            </div>
        </div>
    </div>
</template>

<script>
import {mapState, mapWritableState} from "pinia";
import {useDirectionStore} from "@/store/direction";
import {useDetailsBoxStore} from "@/store/detailsBox";

export default {
    props: ['distance'],
    computed: {
        ...mapState(useDirectionStore, ['fromName', 'toName']),
        ...mapWritableState(useDetailsBoxStore, ['directionBox'])
    },
    methods: {
        showUp(){
            gsap.to('#direction-box',{
                yPercent: 0,
                duration: 0.75,
            });
        },
        getDown() {
            gsap.to('#direction-box',{
                yPercent: 100,
                duration: 0.5
            });
        },
    },
    mounted(){
        let details = $('#direction-box')[0];
        let directionBox = new Hammer(details);
        let that = this;
        directionBox.get('swipe').set({ direction: Hammer.DIRECTION_VERTICAL });
        directionBox.on("swipedown", function(){
            that.directionBox = false;
        });

        gsap.set('#direction-box',{yPercent: 100});
    },
    watch: {
        directionBox(newValue){
            if(newValue)
                this.showUp();
            else
                this.getDown();
        }
    }
}
</script>

<style lang="scss" scoped>
#direction-box {
    color: var(--box-secondary);

    i.icon{
        color:  var(--box-background);
    }

    i.blue.icon, .ui.blue.header{
        color: var(--nav-btn-bg) !important;
    }

    .ui.blue.label{
        background-color: var(--box-primary);
        border-collapse: var(--box-primary);
        color: var(--box-background)
    }

    .ui.button{
        background-color: var(--box-background);
    }

    .ui.blue.button, .ui.blue.button:hover, .ui.blue.button:focus{
        background-color: var(--box-primary);
    }

    i.grey.icon{
        color: var(--nav-text);
    }


    position: fixed;
    bottom: 0;
    width: 80vw;
    left: 50%;
    transform: translateX(-50%);
    background: var(--box-background);
    z-index: 4;
    border-top: var(--box-border) solid var(--box-primary);
    border-radius: 20px 20px 0 0;
    padding: 3% 4%;
    font-family: monospace;
    cursor: default;

    .details{
        background: var(--box-background);
        border: 1px solid var(--segment-border);
        border-radius: 5px;
        padding: 2rem 3rem;
        box-shadow: 0 1px 5px 0 var(--segment-shadow) inset;
    }

    .place-name {
        display: inline-block;
    }

    div.ui.blue.label{
        cursor: pointer;
    }

    div.ui.circular.icon.button {
        border: 2px solid var(--box-primary);
    }

    .icon-boxes{
        position: absolute;
        top: 8%;
        right: 4%;

        .icon{
            margin: 0 6px;
        }
    }
}

@media screen and (max-width: 520px) {
    #direction-box {
        width: 100vw;
        padding: 6% 8%;

        div.ui.large.header{
            margin-top: 12px;
        }
    }
}
</style>