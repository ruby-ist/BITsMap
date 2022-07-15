<template>
    <div class="show-box">
        <div class="ui large teal header title">{{ details['name'] }}</div>
        <div class="ui small teal label main">{{ details['main'] }}</div>

        <div class="ui pointing secondary menu">
            <a v-for="floor in details['floors']"
               :class="{item: true, active: floor['name'].includes('Ground')}"
               :data-tab="floor['name'].replace(' ', '')">{{ floor['name'] }}
            </a>
        </div>

        <div v-for="floor in details['floors']" class="ui tab segment"
             :class="{active: floor['name'].includes('Ground')}"
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
    props: ['details'],

    methods: {
        getDown(){
            $('.show-box').hide();
        }
    },

    mounted() {
        $('.menu .item').tab();
        $('.show-box').hide();
    },

    updated() {
        $('.menu .item').tab();
    }
}
</script>

<style lang="scss" scoped>
.show-box {
    position: fixed;
    bottom: 0;
    width: 80vw;
    left: 50%;
    transform: translateX(-50%);
    background: whitesmoke;
    z-index: 2;
    border: 1px solid teal;
    border-top: 6px solid teal;
    border-radius: 20px 20px 0 0;
    padding: 3% 4%;

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
        overflow: scroll;
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

    div.ui.circular.icon.button{
        position: absolute;
        top: 8%;
        right: 4%;
        border: 2px solid teal;
    }
}
</style>
