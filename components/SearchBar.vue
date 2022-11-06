<template>
    <div class="input-wrapper">
        <div class="ui large icon input">
            <input v-model="query"
                   @keyup="getSuggestion"
                   @keydown.down.prevent="moveDown"
                   @keydown.up.prevent="moveUp"
                   ref="input"
                   type="text"
                   placeholder="Search...">
            <i  v-show="query !== ''" class="times circle grey link icon" @click="deleteHandler"></i>
            <i class="search link blue icon" id="search-icon" @click="getSuggestion"></i>
        </div>
        <div class="suggestion-box" ref="suggestion-box">
            <section v-if="response.length !== 0">
                <div v-for="match in response"
                     class="suggestion"
                     @mouseenter="hoverSelection"
                     @mouseleave="$event.target.classList.remove('selected')"
                     @click="clickHandler(match['id'], match['floor_no'])">
                    <div>
                        <div class="ui medium blue header">{{ match["match"] }}</div>
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
import { mapWritableState, mapActions } from 'pinia'
import { useSearchStore } from "@/store/search";

export default {
    data() {
        return {
            query: "",
            response: [],
            fetchPending: false,
        }
    },

    computed: {
        ...mapWritableState(useSearchStore, ['searchId', 'floorNum']),
    },

    methods: {
        ...mapActions(useSearchStore, ['searchData']),

        async getSuggestion() {
            let element = $(this.$refs["suggestion-box"]);
            if (this.query !== "") {
                element.show();
                this.fetchPending = true;
                this.response = await this.$http.$get(`http://geobits.ap-south-1.elasticbeanstalk.com/map/search?query=${encodeURIComponent(this.query)}`);
                this.fetchPending = false;
            } else {
                element.hide();
            }
        },

        hoverSelection( event ){
            let selected = $('.suggestion.selected');
            if(selected.length !== 0)
                selected[0].classList.remove('selected');
            event.target.classList.add('selected');
        },

        selectFirst(){
            let element = $('.suggestion');
            if(element.length !== 0)
                element[0].classList.add('selected');
        },

        moveDown(){
            let selected = $('.selected')
            let next = selected.next();
            if (next.length) {
                selected.removeClass('selected');
                next.addClass('selected');
                next.focus()
            }
            else{
                this.selectFirst();
            }
        },

        moveUp(){
            let selected = $('.selected')
            let prev = selected.prev();
            if (prev.length) {
                selected.removeClass('selected');
                prev.addClass('selected');
            }
            else{
                this.selectFirst();
            }
        },

        clickHandler(id, f_no){
            this.searchId = id;
            this.floorNum = f_no;
        },

        deleteHandler(){
            this.query = "";
        },
    },

    mounted() {
        let element = $(this.$refs["suggestion-box"]);
        element.hide();
        $('body').on('click', function (event) {
            if(event.target.id !== "search-icon")
                element.hide();
        });

        let input = $('input');
        input.on('focusin', function(){
            $('.map-buttons').hide();
            $('.show-box').hide();
            $('.direction-box').hide();
        });
        input.on('focusout', function(){
            $('.map-buttons').show();
            $('.show-box').show();
            $('.direction-box').show();
        });
    },

    updated() {
        $(this.$refs["suggestion-box"])[0].scrollTop = 0;
    }
}
</script>

<style lang="scss" scoped>

div.ui.large.icon.input {

    input {
        width: 50vw;
        border-radius: 15px;
        border: 1px solid var(--nav-border);
        padding-right: 4em;
        background: var(--nav-background);
        color: var(--nav-success-text);
    }

    ::placeholder {
        color: var(--nav-placeholder);
        opacity: 1;
    }

    :-ms-input-placeholder {
        color: var(--nav-placeholder);
    }
}

.input-wrapper {
    position: relative;

    i.blue.icon{
        color: var(--nav-border) !important;
    }

    i.grey.icon{
        color: var(--nav-text);
    }

    i.times.circle.icon{
        margin-right: 25px;
    }
}

.suggestion-box {
    min-height: 100px;
    max-height: 500px;
    overflow-y: scroll;
    width: 50vw;
    position: absolute;
    background: var(--suggestion-bg);
    top: 130%;
    border: 1px solid var(--nav-text);
    border-radius: 10px;

    .suggestion {
        color: var(--nav-text);
        padding: 20px;
        cursor: pointer;
        border-bottom: 1px solid var(--nav-text);

        &.selected{
            background-color: var(--selected);
        }

        .ui.header {
            padding-left: 0;
        }

        .ui.blue.header{
            color: var(--box-primary)
        }
    }

    #load-segment{
        min-height: 100px;
    }

    .no-result{
        padding: 3% 6%;
        color: var(--nav-success-text);
        font-size: 1.2rem;
    }
}

@media screen and (max-width: 520px) {
    div.ui.large.icon.input{
        input{
            width: 70vw;
        }
    }

    .suggestion-box{
        width: 70vw;
    }
}
</style>
