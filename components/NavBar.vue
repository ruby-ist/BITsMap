<template>
    <div id="main" class="ui secondary menu">

        <a class="item ui huge header">
            GeoBITs
        </a>
        <div class="right menu">
            <DirectionBar v-if="navigation" @success="transport"/>
            <SearchBar v-else class="item" />
            <i class="large link teal icon"
               :class="{search: navigation, location: navigation, map: !navigation, signs: !navigation }"
               @click="toggleNavigation"></i>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            navigation: false,
        }
    },
    methods: {
        transport(obj){
            this.$emit('draw', obj)
        },

        toggleNavigation(){
            this.navigation = !this.navigation;
            $('.cls-2').css('visibility','hidden');
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
    height: 10vh;
    background: #EAF6F6;
    display: flex;
    border-bottom: 1px solid #16A89D;

    i.large.teal.link.icon{
        padding-left: 1rem;
        border-left: 1px solid teal;
    }

    .header {
        color: #16A89D !important;
        padding-left: 6vw;
        background: transparent;
        font-weight: 600;
    }

    div.right.menu{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 70vw;
        margin-right: 50px;
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
