<template>
    <div id="show-box">
        <div class="ui large blue header title">{{ details['name'] }}</div>
        <div class="ui small blue label main">{{ details['main'] }}</div>

        <div class="ui pointing secondary menu">
            <a v-for="(floor, index) in details['floors']"
               class="item" :data-tab="floor['name'].replace(' ', '')" @click="goToFloor(index)">{{ floor['name'] }}
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

        <div class="icon-boxes">
            <div class="ui huge circular blue icon button" id="direction-btn"
                 @click="goTo(details['id'], details['name'])">
                <i class="directions icon"></i>
            </div>

            <div class="ui huge circular icon button" @click="showBox = false">
                <i class="angle double down blue icon"></i>
            </div>
        </div>
    </div>
</template>

<script>
import {mapWritableState} from "pinia";
import {useSearchStore} from "@/store/search";
import {useDirectionStore} from "@/store/direction";
import {useDetailsBoxStore} from "@/store/detailsBox";

export default {
    props: ['details'],

    data() {
        return {
            initialFloor: 0
        }
    },

    computed: {
        ...mapWritableState(useSearchStore, ['floorNum', 'navigation']),
        ...mapWritableState(useDirectionStore,['toId', 'toName']),
        ...mapWritableState(useDetailsBoxStore, [['showBox']])
    },

    methods: {
        showUp(){
            gsap.to('#show-box',{
                yPercent: 0,
                duration: 0.75,
                ease: "power4"
            });
        },
        getDown() {
            gsap.to('#show-box',{
                yPercent: 100,
                duration: 0.5
            });
            $('#pin').hide();
        },

        async goToFloor(n) {
            let item = $('.item.active')
            if (item.length !== 0)
                item[0].classList.remove('active');

            let tab = $('.tab.active')
            if (tab.length !== 0)
                tab[0].classList.remove('active');

            item = $('.pointing.secondary.menu .item')
            item[n].classList.add('active');

            tab = $('.tab');
            tab[n].classList.add('active');
            this.initialFloor = 0;
        },

        goTo(id, name) {
            this.navigation = true;
            setTimeout(()=> {
                this.toId = id;
                this.toName = name;
                }, 500);
        }
    },

    mounted() {
        let details = $('#show-box')[0];
        let showbox = new Hammer(details);
        let that = this;
        showbox.get('swipe').set({ direction: Hammer.DIRECTION_VERTICAL });
        showbox.on("swipedown", function(){
            that.showBox = false;
        });

        gsap.set('#show-box',{yPercent: 100});
    },

    updated() {
        this.goToFloor(this.initialFloor);
    },

    watch: {
        floorNum(newValue) {
            this.initialFloor = newValue;
        },

        showBox(newValue){
            if(newValue)
                this.showUp();
            else
                this.getDown();
        }
    }
}
</script>

<style lang="scss" scoped>
#show-box {
    color: var(--box-secondary);

    i.icon{
        color:  var(--box-background);
    }

    i.blue.icon, .ui.blue.header{
        color: var(--nav-btn-bg) !important;
    }

    .ui.blue.label{
        background-color: var(--box-primary);
        border-collapse: var(--box-primary);
        color: var(--box-background)
    }

    .ui.button{
        background-color: var(--box-background);
    }

    .ui.blue.button, .ui.blue.button:hover, .ui.blue.button:focus{
        background-color: var(--box-primary);
    }

    i.grey.icon{
        color: var(--nav-text);
    }

    position: fixed;
    bottom: 0;
    width: 80vw;
    left: 50%;
    transform: translateX(-50%);
    background: var(--box-background);
    z-index: 4;
    border-top: var(--box-border) solid var(--box-primary);
    border-bottom: none;
    border-radius: 10px 10px 0 0;
    padding: 3% 4%;
    cursor: default;

    .title {
        font-weight: 900;
        margin-bottom: 20px;
        font-family: 'Nunito Sans', sans-serif;
        width: 60%;
    }

    div.ui.secondary.pointing.menu {

        border-bottom: 2px solid var(--box-menu-line);

        a.item{
            color:var(--box-secondary);
        }

        a.active.item {
            color: var(--box-primary);
        }

    }

    div.ui.tab.segment {
        max-height: 18vh;
        overflow-y: scroll;
        background: var(--box-background);
        border-color: var(--segment-border);
        font-size: 1rem;
        box-shadow: 0 1px 5px 0 var(--segment-shadow) inset;
        font-family: monospace;

        ul {
            list-style: none;

            li {
                margin: 10px 0;
            }

            li::before {
                content: "\2022";
                color: var(--box-primary);
                font-weight: bold;
                display: inline-block;
                width: 1em;
                margin-left: -1em;
            }
        }
    }

    div.ui.circular.icon.button {
        border: 2px solid var(--box-primary);
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
    #show-box {
        width: 100vw;
        padding: 6% 8%;

        .ui.large.header{
            margin-top: 20px;
        }

        div.ui.secondary.pointing.menu {
            overflow-x: auto;
            overflow-y: hidden;
            scrollbar-width: none;

            &::-webkit-scrollbar {
                display: none;
            }

            .item {
                margin-bottom: 0;
            }
        }

        div.ui.tab.segment {
            min-height: 20vh;
            padding: 20px 10% 20px 5%;

            ul{
                padding-left: 20px;
            }
        }
    }
}
</style>
