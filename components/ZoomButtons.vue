<template>
    <div id="zoom-buttons" class="map-buttons">
        <Compass v-show="compass"/>
        <button class="ui blue icon button" @click="toggleNavigation">
            <i class="large icon" :class="{search: navigation, location: navigation, map: !navigation, signs: !navigation }"></i>
        </button>
        <button class="ui blue icon button" @click="compassHandler">
            <i class="large compass icon" :class="{outline: compass}"></i>
        </button>
        <button class="ui blue icon button" @click="$emit('zoomin')">
            <i class=" large plus icon"></i>
        </button>
        <button class="ui blue icon button" @click="$emit('zoomout')">
            <i class="large minus icon"></i>
        </button>
    </div>
</template>

<script>
import {mapState, mapWritableState} from "pinia";
import {useSearchStore} from "~/store/search";
import {useDetailsBoxStore} from "@/store/detailsBox";

export default {
    emits: ['zoomin', 'zoomout'],
    data(){
        return {
            compass: false,
        }
    },
    computed: {
        ...mapWritableState(useSearchStore, ['navigation']),
        ...mapState(useDetailsBoxStore, ['showBox', 'directionBox'])
    },
    methods: {
        toggleNavigation(){
            this.navigation = !this.navigation;
            $('.cls-2').css('visibility','hidden');
            $('.route-pin').hide();
            $('.direction-box').css({
                'bottom': "-50vh",
                'height': '0',
            });
        },

        toggleButtons(){
            if(this.showBox || this.directionBox)
                $('#zoom-buttons').hide();
            else
                $('#zoom-buttons').show();
        },

        compassHandler(){
            this.compass = !this.compass;
            $('#compass').toggle();
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
#zoom-buttons {
    position: fixed;
    right: 50px;
    bottom: 30px;
    z-index: 3;

    button{
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
    #zoom-buttons{
        right: 30px;
    }
}
</style>
