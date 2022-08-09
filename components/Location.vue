<template>
    <div id="location" :style="{left: `${left-36}px`, top: `${top-36}px`}">
        <img :src="require(`~/assets/images/location2.svg`)" oncontextmenu="return false;">
        <div id="location-clipboard">
            <div class="ui action input">
                <input type="text" :value="url" ref="urlInput" disabled>
                <button class="ui teal right labeled icon button" @click="copy">
                    <i class="share icon"></i>
                    <span ref="copyButton">Share</span>
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
        zoomLevel: Number,
    },
    data() {
        return {
            url: `https://geobits.onrender.com/?left=${this.left}&top=${this.top}&svg=${this.svg}&level=${this.zoomLevel}`,
        }
    },
    methods:{
        copy(){
            navigator.clipboard.writeText(this.$refs.urlInput.value);
            this.$refs.copyButton.innerText = "Copied!";
        }
    },
    mounted() {
        $('#location').hide();
        let location = $('#location img');
        location.on('click', ()=>{
            $('#location-clipboard').toggle();
        });
    },
    updated() {
        this.url = `https://geobits.onrender.com/?left=${this.left}&top=${this.top}&svg=${this.svg}&level=${this.zoomLevel}`;
        this.$refs.copyButton.innerText = "Share";
    }
}
</script>

<style lang="scss" scoped>
#location{
    position: absolute;
    z-index: 2;
    transform: translate(-50%, -50%);

    img{
        height: 72px;
        width: 72px;
    }

    #location-clipboard{
        position: relative;
    }

    div.ui.action.input {
        position: absolute;
        top: 84px;
        left: 50%;
        transform: translateX(-40%);

        input {
            opacity: 1;
        }
    }
}
</style>
