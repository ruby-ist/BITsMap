<template>
    <div id="view-buttons" class="map-buttons">
        <button class="ui blue icon button">
            <i class="large info icon"></i>
        </button>
        <button class="ui blue icon button">
            <i class="large icon" :class="{ moon: !isDark, sun: isDark}" @click="$emit('changeTheme')"></i>
        </button>
        <button class="ui blue icon button" @click="$emit('getLocation')">
            <i class="large street view icon"></i>
        </button>
        <button class="ui blue icon button" @click="$emit('changeSVG')">
            <i class="large map icon" :class="{ outline: !lined }"></i>
        </button>
    </div>
</template>

<script>
import {mapState} from "pinia";
import {useDetailsBoxStore} from "@/store/detailsBox";

export default {
    props: {lined: Boolean, isDark: Boolean},
    emits: ["changeSVG", "changeTheme"],
    computed: {
        ...mapState(useDetailsBoxStore, ['showBox', 'directionBox'])
    },
    methods: {
        toggleButtons(){
            if(screen.width < 540 && (this.showBox || this.directionBox))
                gsap.to('#view-buttons button', {xPercent: -200, duration: 0.4});
            else
                gsap.to('#view-buttons button', {xPercent: 0, duration: 0.4, stagger: 0.2});
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

button.blue.button{
    background-color: var(--button-background);

    &:hover, &:focus{
        background-color: var(--button-background);
    }

    i.icon{
        color: var(--button-icon);
    }
}

button.ui.icon.button {
    box-shadow: 0 0 2px black;
}

@media screen and (max-width: 520px) {
    #view-buttons {
        left: 30px;
    }
}
</style>
