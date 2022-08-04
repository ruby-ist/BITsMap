<template>
    <div class="input-wrapper">
        <div class="ui large icon input"  :class = "{success: successClass}">
            <input v-model="query"
                   @keyup="getSuggestion"
                   @keydown.down.prevent="moveDown"
                   @keydown.up.prevent="moveUp"
                   @keydown.enter.prevent="enterHandler"
                   @keyup.enter.prevent="hideSuggestion"
                   @keydown.delete="setBarValue('')"
                   type="text"
                   :placeholder="placeholder">
            <i class="map marker alternate icon"
               @click="provideLocation"
               :class="{grey: locationUsed, teal: !locationUsed, link: !locationUsed}"></i>
        </div>
        <div class="suggestion-box" ref="suggestion-box">
            <section v-if="response.length !== 0">
                <div v-for="match in response"
                     class="suggestion"
                     @mouseenter="hoverSelection"
                     @click="clickHandler(match['id'], match['match'])"
                     @mouseleave="$event.target.classList.remove('selected')">
                    <div>
                        <div class="ui medium teal header">{{ match["match"] }}</div>
                        <div>{{ match["floor"] }}, {{ match["name"] }}</div>
                    </div>
                </div>
            </section>
            <section v-else>
                <div v-if="fetchPending" class="ui segment" id="load-segment">
                    <div class="ui active centered inline blue elastic loader"></div>
                </div>
                <div  v-else class="no-result">
                    No result found!
                </div>
            </section>
        </div>
    </div>
</template>

<script>
import {mapState, mapWritableState} from "pinia";
import {useDirectionStore} from "@/store/direction";
import {useToBarStore} from "~/store/toBar";

export default {
    props: ["placeholder"],
    emits: ["setPlace"],
    data() {
        return {
            successClass: false,
            query: "",
            response: [],
            fetchPending: false,
        }
    },
    computed: {
        ...mapWritableState(useDirectionStore, ['top', 'left', 'locationUsed']),
        ...mapState(useToBarStore, ['id', 'name', 'showBoxTrigger'])
    },
    methods: {
        async getSuggestion() {
            let element = $(this.$refs["suggestion-box"]);
            if (this.query !== "") {
                element.show();
                this.fetchPending = true;
                this.response = await this.$http.$get(`https://geobits.herokuapp.com/map/search?query=${encodeURIComponent(this.query)}`);
                this.fetchPending = false;
            } else {
                element.hide();
            }
        },

        setBarValue(place){
            this.successClass = (place.length !== 0)
            this.$emit('setPlace', place);
        },

        clickHandler(id, name){
            this.query = name;
            this.setBarValue(id);
        },

        enterHandler(){
            $('.selected').click();
        },

        hoverSelection(event) {
            let selected = $('.suggestion.selected');
            if (selected.length !== 0)
                selected[0].classList.remove('selected');
            event.target.classList.add('selected');
        },

        selectFirst(){
            let element = $(this.$refs["suggestion-box"]).children().children().first();
            if(element.length !== 0)
                element[0].classList.add('selected');
        },

        moveDown() {
            let selected = $('.selected')
            let next = selected.next();
            if (next.length) {
                selected.removeClass('selected');
                next.addClass('selected');
                next.focus()
            } else {
                this.selectFirst();
            }
        },

        moveUp() {
            let selected = $('.selected')
            let prev = selected.prev();
            if (prev.length) {
                selected.removeClass('selected');
                prev.addClass('selected');
            } else {
                this.selectFirst();
            }
        },

        hideSuggestion(){
            $(this.$refs["suggestion-box"]).hide();
            this.response = []
        },

        async provideLocation(){
            if (!navigator.geolocation)
                alert("Geolocation is not supported in this browser.");
            else
                navigator.geolocation.getCurrentPosition(await this.success, this.error);
        },

        success(position){
            let x = position.coords.longitude.toPrecision(7) * 100000;
            let y = position.coords.latitude.toPrecision(7) * 100000;
            this.left = (x - 7727333) * (3420 / 907.0);
            this.top = 3876 - (y - 1149133) * (3876 / 1016.0);

            this.query = "Your Location";
            this.setBarValue("my-location");
            this.locationUsed = true;
        },

        error(){
            alert("Unable to get your location.");
        },
    },

    mounted() {
        this.locationUsed = false;
        let element = $(this.$refs["suggestion-box"]);
        element.hide();
        $('body:not(.suggestion-box)').on('click', function () {
            this.response = [];
            element.hide();
        });
    },

    updated() {
        $(this.$refs["suggestion-box"])[0].scrollTop = 0;
    },

    watch:{
        query(newValue, oldValue){
            $('.selected').removeClass('selected');

            if(newValue.length < 3)
                this.setBarValue('');

            if(oldValue === "Your Location")
                this.locationUsed = false
        },

        name(newValue){
            if(this.placeholder === "To") {
                console.log(this.id, this.name);
                this.clickHandler(this.id, this.name);
            }
        }
    }
}
</script>

<style lang="scss" scoped>

div.ui.large.icon.input {
    input {
        width: 21vw;
        border-radius: 5px;
        border: 1px solid #16A89D;
    }

    &.success{
        input{
            color: teal;
        }
    }
}

.input-wrapper.item {
    position: relative;
    display: inline-flex !important;
    padding: 0.5rem 2px !important;
}

.suggestion-box {
    min-height: 100px;
    max-height: 500px;
    overflow: scroll;
    width: 25vw;
    position: absolute;
    background: white;
    top: 130%;
    border: 1px solid teal;
    border-radius: 10px;

    .suggestion {
        padding: 20px;
        cursor: pointer;
        border-bottom: 1px solid #EAF6F6;

        &.selected {
            background: #EAF6F6;
        }

        .ui.header {
            padding-left: 0;
        }
    }

    #load-segment{
        min-height: 100px;
    }

    .no-result{
        padding: 3% 6%;
        color: teal;
        font-size: 1.2rem;
    }
}

@media screen and (max-width: 520px) {
    div.ui.large.icon.input {
        input {
            width: 80vw;
        }
    }

    .suggestion-box {
        width: 80vw;
    }
}
</style>
