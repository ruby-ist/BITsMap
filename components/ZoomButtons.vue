<template>
    <div id="main" class="map-buttons">
        <Compass/>
        <button class="ui teal icon button" @click="toggleNavigation">
            <i class="large icon" :class="{search: navigation, location: navigation, map: !navigation, signs: !navigation }"></i>
        </button>
        <button class="ui teal icon button" @click="$emit('zoomin')">
            <i class=" large plus icon"></i>
        </button>
        <button class="ui teal icon button" @click="$emit('zoomout')">
            <i class="large minus icon"></i>
        </button>
    </div>
</template>

<script>
import {mapWritableState} from "pinia";
import {useSearchStore} from "~/store/search";

export default {
    emits: ['zoomin', 'zoomout'],
    computed: {
        ...mapWritableState(useSearchStore, ['navigation'])
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
        }
    }
}
</script>

<style scoped lang="scss">
#main {
    position: fixed;
    right: 50px;
    bottom: 30px;
    z-index: 3;

    button{
        display: block;
        margin: 25px auto;
    }
}

button.ui.icon.teal.button {
    border: 1px solid black;
    box-shadow: 0 0 2px black;
}

@media screen and (max-width: 520px) {
    #main{
        right: 30px;
    }
}
</style>
