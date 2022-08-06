<template>
    <div id="pin" :style="{left: `${left}px`, top: `${top}px`}">
        <img :src="require(`~/assets/images/pin.svg`)">
        <div id="clipboard" v-show="show">
            <div class="ui action input">
                <input type="text" :value="url" ref="urlInput" disabled>
                <button class="ui teal right labeled icon button" @click="copy">
                    <i class="copy icon"></i>
                    <span ref="copyButton">Copy</span>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        left: Number,
        top: Number,
        svg: Boolean,
        zoomlevel: Number,
        show: Boolean,
    },
    data() {
        return {
            url: `https://geobits.onrender.com/?left=${this.left}&top=${this.top}&svg=${this.svg}&level=${this.zoomlevel}`,
        }
    },
    methods:{
      copy(){
            navigator.clipboard.writeText(this.$refs.urlInput.value);
            this.$refs.copyButton.innerText = "Copied!";
      }
    },
    mounted() {
        $('#pin').hide();
    },
    updated() {
        this.url = `https://geobits.onrender.com/?left=${this.left}&top=${this.top}&svg=${this.svg}&level=${this.zoomlevel}`;
        this.$refs.copyButton.innerText = "Copy";
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
