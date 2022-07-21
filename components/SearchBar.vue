<template>
    <div class="input-wrapper">
        <div class="ui large icon input">
            <input v-model="query" @keydown.down.prevent="moveDown" @keydown.up.prevent="moveUp" @keydown.enter="getSuggestion" type="text" placeholder="Search...">
            <i class="search link teal icon" @click="getSuggestion"></i>
        </div>
        <div class="suggestion-box">
            <section v-if="response.length !== 0">
                <div v-for="match in response"
                     class="suggestion"
                     @mouseenter="hoverSelection"
                     @mouseleave="$event.target.classList.remove('selected')"
                     @click="clickHandler(match['id'], match['floor_no'])">
                    <div>
                        <div class="ui medium teal header">{{ match["match"] }}</div>
                        <div>{{ match["floor"] }}, {{ match["name"] }}</div>
                    </div>
                </div>
            </section>
            <section v-else>
                <div class="no-result">
                    no result found
                </div>
            </section>
        </div>
    </div>
</template>

<script>
export default {
    emits: ["custom"],
    data() {
        return {
            query: "",
            response: [],
        }
    },

    methods: {
        async getSuggestion() {
            let element = $('.suggestion-box');
            if (this.query !== "") {
                element.show();
                element.innerText = `<div class="ui segment"><div class="ui active blue elastic loader"></div></div>`;
                this.response = await this.$http.$get(`https://geobits.herokuapp.com/map/search?query=${encodeURIComponent(this.query)}`);
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
            this.$emit('custom', id, f_no);
        }
    },

    mounted() {
        let element = $('.suggestion-box');
        element.hide();
        $('body:not(.suggestion-box)').on('click', function () {
            element.hide();
        });
    },

    updated() {
        $('.suggestion-box')[0].scrollTop = 0;
    }
}
</script>

<style lang="scss" scoped>

div.ui.large.icon.input {
    margin-right: 6vw;

    input {
        width: 50vw;
        border-radius: 20px;
        border: 1px solid #16A89D;
    }
}

.input-wrapper {
    position: relative;
}

.suggestion-box {
    min-height: 100px;
    max-height: 500px;
    overflow: scroll;
    width: 50vw;
    position: absolute;
    background: white;
    top: 130%;
    border: 1px solid teal;
    border-radius: 10px;

    .suggestion {
        padding: 20px;
        cursor: pointer;
        border-bottom: 1px solid #EAF6F6;

        &.selected{
            background: #EAF6F6;
        }

        .ui.header {
            padding-left: 0;
        }
    }
}

@media screen and (max-width: 520px) {
    div.ui.large.icon.input{
        input{
            width: 80vw;
        }
    }

    .suggestion-box{
        width: 80vw;
    }
}
</style>
