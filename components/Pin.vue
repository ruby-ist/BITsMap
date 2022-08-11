<template>
    <div id="pin" :style="{left: `${x}px`, top: `${y}px`}">
        <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
             viewBox="0 0 346 437.4" style="enable-background:new 0 0 346 437.4;" xml:space="preserve">
                    <path class="st0" d="M333.2,132.3C299.8,3,145.8-29.7,59.3,52.4c-63.6,60.4-69.5,162.5-13.1,232.3c37.1,46,75,91.4,112.6,137
            c9,10.9,19.5,11,28.4,0.2c37.8-45.8,75.7-91.5,113-137.6c24.4-29.7,37.9-66.9,38.2-105.3C338.4,161,336.9,146.5,333.2,132.3z
             M172.9,235.1c-35.5-0.1-64.7-29.3-64.8-64.8c0-35.9,29-65,64.9-65c35.7,0,64.8,28.8,65,64.5C238.2,205.6,208.6,235.2,172.9,235.1z"
                    />
        </svg>
        <div id="clipboard">
            <div class="ui action input">
                <input type="text" :value="url" ref="urlInput" disabled>
                <button class="ui blue right icon button" @click="goTo">
                    <i class="directions icon"></i>
                </button>
                <button id="pin-copy" class="ui black right icon button" @click="copy">
                    <i class="copy icon"></i>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import {mapWritableState} from "pinia";
import {useDirectionStore} from "@/store/direction";
import {useSearchStore} from "@/store/search";

export default {
    props: {
        x: Number,
        y: Number,
        svg: Boolean,
        zoomLevel: Number,
    },
    data() {
        return {
            url: `https://geobits.onrender.com/?left=${this.x}&top=${this.y}&svg=${this.svg}&level=${this.zoomLevel}`,
        }
    },
    computed: {
        ...mapWritableState(useSearchStore, ['navigation']),
        ...mapWritableState(useDirectionStore, ['toId','toName','pinTop','pinLeft']),
    },
    methods:{
        copy() {
            navigator.clipboard.writeText(this.$refs.urlInput.value);
        },
        goTo() {
            this.navigation = true;
            this.pinLeft = this.x * (1.5 ** (4 - this.zoomLevel));
            this.pinTop = this.y * (1.5 ** (4 - this.zoomLevel));
            this.toName = "";
            setTimeout(() => {
                this.toId = "pinned-location";
                this.toName = "Pinned Location";
            }, 500);
        }
    },
    mounted() {
        $('#pin-copy').popup({
            inline     : true,
            hoverable  : true,
            content: "Copied!",
            on: "click"
        });
        $('#pin').hide();
    },
    updated() {
        this.url = `https://geobits.onrender.com/?left=${this.x}&top=${this.y}&svg=${this.svg}&level=${this.zoomLevel}`;
    }
}
</script>

<style lang="scss" scoped>
#pin {
    position: absolute;
    z-index: 2;

    .st0{
        fill: var(--nav-success-text);
        stroke:#000000;
        stroke-width:15;
        stroke-miterlimit:10;
    }

    svg {
        height: 32px;
        width: 32px;
    }

    #clipboard{
        position: relative;
    }

    div.ui.action.input {
        position: absolute;
        top: 4px;
        left: 50%;
        transform: translateX(-50%);

        input {
            opacity: 1;
            background-color: var(--selected);
            color: var(--nav-success-text);
            border: 1px solid var(--nav-border);
            border-right: none;
        }

        .ui.icon.black.button{
            background-color: var(--nav-background);
            border-color: var(--nav-background);
            border-radius: 0 .28571429rem .28571429rem 0;

            .icon{
                color: var(--box-primary);
            }
        }

        .ui.icon.blue.button{
            background-color: var(--box-primary);
            border-color: var(--box-primary);

            .icon{
                color: var(--nav-background);
            }
        }
    }
}
</style>
