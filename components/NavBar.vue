<template>
    <div id="navbar" class="ui secondary menu">
        <MainLogo class="logo" />
        <div class="right menu">
            <MiniLogo class="symbol" v-show="!navigation"/>
            <DirectionBar v-if="navigation"/>
            <SearchBar v-else class="item" />
            <div class="ui compact labeled icon menu" id="toggle-direction" @click="toggleNavigation">
                <a class="item">
                    <i class="large link blue icon"
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
import {useDetailsBoxStore} from "@/store/detailsBox";

export default {
    computed: {
        ...mapWritableState(useSearchStore, ['navigation']),
        ...mapWritableState(useDetailsBoxStore, ['directionBox'])
    },
    methods: {
        toggleNavigation(){
            this.navigation = !this.navigation;
            $('#routes .cls-2').css('visibility','hidden');
            $('.route-pin').hide();
            this.directionBox = false;
        }
    },
}
</script>

<style lang="scss" scoped>
#navbar {
    .symbol{
        display: none;
    }

    .logo{
        width: 150px;
        margin-left: 6vw;
    }

    position: fixed;
    top: 0;
    z-index: 4;
    width: 103vw;
    min-height: 85px;
    background: var(--nav-background);
    display: flex;
    border-bottom: 1px solid var(--nav-bottom);

    i.blue.icon{
        color: var(--nav-btn-bg) !important;
    }

    i.grey.icon{
        color: var(--nav-text);
    }

    div.labeled.menu{
        background: transparent;
        border: none;
        box-shadow: none;
        margin-left: 20px;

        a.item{
            margin: 0;
            color: var(--nav-btn-bg);
            border-left: 1px solid var(--nav-btn-bg);
        }
    }

    div.right.menu{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-right: 70px;
    }
}

@media screen and (max-width: 840px){
    #navbar{
        .logo{
            display: none;
        }

        div.right.menu{
            margin-right: 20px;
        }
    }
}

@media screen and (max-width: 520px){
    #navbar{
        justify-content: center;

        #toggle-direction{
            display: none;
        }

        div.right.menu{
            margin-right: auto;
            justify-content: right;
        }

        .symbol{
            width: 36px;
            display: block;
            margin-left: 6vw;
            margin-right: 4vw;
        }
    }
}

</style>
