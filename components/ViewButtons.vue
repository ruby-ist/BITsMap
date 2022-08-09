<template>
    <div id="view-buttons" class="map-buttons">
        <button class="ui teal icon button">
            <i class="large info icon"></i>
        </button>
        <button class="ui teal icon button">
            <i class="large moon icon"></i>
        </button>
        <button class="ui teal icon button" @click="$emit('getLocation')">
            <i class="large street view icon"></i>
        </button>
        <button class="ui teal icon button" @click="$emit('change')">
            <i class="large map icon" :class="{ outline: !lined }"></i>
        </button>
    </div>
</template>

<script>
import {mapState} from "pinia";
import {useDetailsBoxStore} from "@/store/detailsBox";

export default {
    props: {lined: Boolean},
    emits: ["change"],
    computed: {
        ...mapState(useDetailsBoxStore, ['showBox', 'directionBox'])
    },
    methods: {
        toggleButtons(){
            if(this.showBox || this.directionBox)
                $('#view-buttons').hide();
            else
                $('#view-buttons').show();
        }
    },
    watch: {
        showBox(){
            this.toggleButtons();
        },
        directionBox(){
            this.toggleButtons();
        }
    }
}
</script>

<style scoped lang="scss">
#view-buttons {
    position: fixed;
    left: 50px;
    bottom: 30px;
    z-index: 3;

    button {
        display: block;
        margin: 25px auto;
    }
}

button.ui.icon.teal.button {
    border: 1px solid black;
    box-shadow: 0 0 2px black;
}

@media screen and (max-width: 520px) {
    #view-buttons {
        left: 30px;
    }
}
</style>
