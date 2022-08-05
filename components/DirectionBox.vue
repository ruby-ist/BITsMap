<template>
    <div class="direction-box">
        <div class="ui large teal header">Distance: {{ Math.round(distance) }} m</div>
        <br/>
        <div class="details">
            <div class="place-name"> From :</div>
            <div class="ui teal label"> {{ fromName }} </div>
            <br/>
            <br/>
            <div class="place-name"> To :</div>
            <div class="ui teal label"> {{ toName }} </div>
        </div>

        <div class="icon-boxes">
            <div class="ui huge circular icon button" @click="getDown">
                <i class="angle double down teal icon"></i>
            </div>
        </div>
    </div>
</template>

<script>
import {mapState} from "pinia";
import {useDirectionStore} from "@/store/direction";

export default {
    props: ['distance'],
    computed: {
        ...mapState(useDirectionStore, ['fromName', 'toName'])
    },
    methods: {
        getDown() {
            $('.direction-box').css({
                'bottom': "-50vh",
                'height': '0',
            });
        },
    },
}
</script>

<style lang="scss" scoped>
.direction-box {
    position: fixed;
    bottom: -50vh;
    width: 80vw;
    left: 50%;
    transform: translateX(-50%);
    background: whitesmoke;
    z-index: 3;
    border: 1px solid teal;
    border-top: 6px solid teal;
    border-radius: 20px 20px 0 0;
    padding: 3% 4%;
    transition: bottom .75s ease-out;
    font-family: monospace;

    .details{
        background: white;
        border: 1px solid lightslategray;
        border-radius: 5px;
        padding: 2rem 3rem;
    }

    .place-name {
        display: inline-block;
    }

    div.ui.circular.icon.button {
        border: 1px solid teal;
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
    .show-box {
        width: 100vw;
        padding: 6% 8%;
    }
}
</style>