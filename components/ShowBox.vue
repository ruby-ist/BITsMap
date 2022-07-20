<template>
    <div class="show-box">
        <div class="ui large teal header title">{{ details['name'] }}</div>
        <div class="ui small teal label main">{{ details['main'] }}</div>

        <div class="ui pointing secondary menu">
            <a v-for="(floor, index) in details['floors']"
               class="item" :data-tab="floor['name'].replace(' ', '')"  @click="goToFloor(index)">{{ floor['name'] }}
            </a>
        </div>

        <div v-for="floor in details['floors']" class="ui tab segment"
             :data-tab="floor['name'].replace(' ','')">
            <ul>
                <div v-for="room in floor['rooms']">
                    <li>{{ room }}</li>
                </div>
            </ul>
        </div>

        <div class="ui huge circular icon button" @click="getDown">
            <i class="angle double down teal icon"></i>
        </div>
    </div>
</template>

<script>
export default {
    props: ['details', 'floorNum'],

    data(){
        return{
            initialFloor: 0
        }
    },

    methods: {
        getDown() {
            $('.show-box').css('bottom','-50vw');
            $('#pin').hide();
        },

        async goToFloor(n){
            let item = $('.item.active')
            if( item.length !== 0 )
                item[0].classList.remove('active');

            let tab = $('.tab.active')
            if( tab.length !== 0 )
                tab[0].classList.remove('active');

            item = $('.item')
            item[(n+2)].classList.add('active');

            tab = $('.tab');
            tab[n].classList.add('active');
            this.initialFloor = 0;
        }
    },

    updated() {
        this.goToFloor(this.initialFloor);
    },

    watch: {
        floorNum(newValue){
            this.initialFloor = newValue;
        }
    }
}
</script>

<style lang="scss" scoped>
.show-box {
    position: fixed;
    bottom: -50vw;
    width: 80vw;
    left: 50%;
    transform: translateX(-50%);
    background: whitesmoke;
    z-index: 2;
    border: 1px solid teal;
    border-top: 6px solid teal;
    border-radius: 20px 20px 0 0;
    padding: 3% 4%;
    transition: bottom 1s ease-out;

    .title {
        font-weight: 500;
        margin-bottom: 20px;
        font-family: 'Nunito Sans', sans-serif;
    }

    div.ui.secondary.pointing.menu {

        a.active.item {
            color: teal;
        }

    }

    div.ui.tab.segment {
        max-height: 18vh;
        overflow-y: scroll;
        background: white;
        font-size: 1rem;
        box-shadow: 0 1px 2px 0 rgba(34, 36, 38, .15) inset;
        font-family: monospace;

        ul {
            list-style: none;

            li {
                margin: 5px 0;
            }

            li::before {
                content: "\2022";
                color: teal;
                font-weight: bold;
                display: inline-block;
                width: 1.1em;
                margin-left: -1em;
            }

        }
    }

    div.ui.circular.icon.button {
        position: absolute;
        top: 8%;
        right: 4%;
        border: 2px solid teal;
    }
}
</style>
