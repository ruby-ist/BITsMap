<template>
    <div id="pin" :style="{left: `${x}px`, top: `${y}px`}">
        <img :src="require(`~/assets/images/pin.svg`)">
        <div id="clipboard">
            <div class="ui action input">
                <input type="text" :value="url" ref="urlInput" disabled>
                <button class="ui violet right icon button" @click="goTo">
                    <i class="directions icon"></i>
                </button>
                <button class="ui blue right icon button" @click="copy">
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
            // this.$refs.copyButton.innerText = "Copied!";
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
        $('#pin').hide();
    },
    updated() {
        this.url = `https://geobits.onrender.com/?left=${this.x}&top=${this.y}&svg=${this.svg}&level=${this.zoomLevel}`;
        // this.$refs.copyButton.innerText = "Copy";
    }
}
</script>

<style lang="scss" scoped>
#pin {
    position: absolute;
    z-index: 2;

    img {
        height: 32px;
        width: 32px;
    }

    #clipboard{
        position: relative;
    }

    div.ui.action.input {
        position: absolute;
        top: 36px;
        left: 50%;
        transform: translateX(-45%);

        input {
            opacity: 1;
        }
    }
}
</style>
