<template>
    <div id="main" class="ui secondary menu">

        <a class="item ui huge header">
            GeoBITs
        </a>
        <div class="right menu">
            <DirectionBar v-if="navigation"/>
            <SearchBar v-else class="item" />
            <div class="ui compact labeled icon menu" id="toggle-direction" @click="toggleNavigation">
                <a class="item">
                    <i class="large link teal icon"
                       :class="{search: navigation, location: navigation, map: !navigation, signs: !navigation }"></i>
                    {{ navigation ? "Search" : "Direction" }}
                </a>
            </div>
        </div>
    </div>
</template>

<script>
import {mapWritableState} from "pinia";
import {useSearchStore} from "~/store/search";

export default {
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
    },
}
</script>

<style lang="scss" scoped>
#main {
    position: fixed;
    top: 0;
    z-index: 4;
    width: 103vw;
    min-height: 85px;
    background: #EAF6F6;
    display: flex;
    border-bottom: 1px solid #16A89D;

    div.labeled.menu{
        background: transparent;
        border: none;
        box-shadow: none;
        margin-left: 20px;

        a.item{
            margin: 0;
            color: teal;
            border-left: 1px solid teal;
        }
    }

    .header {
        color: #16A89D !important;
        padding-left: 6vw;
        background: transparent;
        font-weight: 600;
    }

    div.right.menu{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-right: 70px;
    }
}

@media screen and (max-width: 520px){
    #main{
        justify-content: center;
        .header{
            display: none;
        }
    }
}

</style>
