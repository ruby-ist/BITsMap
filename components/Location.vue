<template>
    <div id="location" data-content="Click to share location" data-position="top center" :style="{left: `${left-48}px`, top: `${top-48}px`}">
        <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 291.1803 277.39916">
            <defs>
                <style>
                    .cls-1 {
                        fill: url(#radial-gradient);
                    }

                    .cls-2 {
                        fill: none;
                        stroke-width: 2px;
                    }

                    .cls-2, .cls-4 {
                        stroke: #116cff;
                    }

                    .cls-2, .cls-3, .cls-4 {
                        stroke-miterlimit: 10;
                    }

                    .cls-3 {
                        fill: #fff;
                        stroke: #000;
                    }

                    .cls-4 {
                        fill: #116cff;
                    }
                </style>
                <radialGradient id="radial-gradient" cx="181.73333" cy="92.90683" r="81.22867" gradientTransform="translate(-180.13945 -19.94068) scale(1.79235 1.70752)" gradientUnits="userSpaceOnUse">
                    <stop offset="0.14222" stop-color="#116cff"/>
                    <stop offset="1" stop-color="#116cff" stop-opacity="0.25"/>
                </radialGradient>
            </defs>
            <ellipse class="cls-1" cx="145.59015" cy="138.69958" rx="145.59015" ry="138.69958"/>
            <circle id="ring-1" class="cls-2" cx="145.59015" cy="138.69958" r="32"/>
            <g>
                <path id="dot" class="cls-3" d="M228.19114,109.92123a32,32,0,1,0,32,32A31.99909,31.99909,0,0,0,228.19114,109.92123Zm0,56.09226a24.09226,24.09226,0,1,1,24.09229-24.0923A24.11893,24.11893,0,0,1,228.19114,166.01349Z" transform="translate(-82.60103 -3.22165)"/>
                <circle class="cls-4" cx="228.19116" cy="141.92121" r="24.09228" transform="translate(-44.96207 328.17963) rotate(-76.71749)"/>
            </g>
        </svg>
        <div id="location-clipboard">
            <div class="ui action input">
                <input type="text" :value="url" ref="urlInput" disabled>
                <button class="ui blue right labeled icon button" @click="copy">
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
        let location = $('#location');
        location.hide();
        $('#location-clipboard').hide();
        let locationSVG = $('#location svg');
        locationSVG.on('click', ()=>{
            $('#location-clipboard').toggle();
        });

        gsap.to('#ring-1',{
            scale: 5,
            opacity: 0,
            transformOrigin: 'center',
            repeat: -1,
            duration: 2,
            repeatDelay: -0.1
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

    svg{
        height: 96px;
        width: 96px;
    }

    #location-clipboard{
        position: relative;
    }

    div.ui.action.input {
        position: absolute;
        top: 10px;
        left: 50%;
        transform: translateX(-50%);

        input {
            opacity: 1;
            background-color: var(--selected);
            color: var(--nav-success-text);
            border: 1px solid var(--nav-border);
            border-right: none;
        }

        .ui.icon.blue.button {
            background-color: var(--box-primary);
            border-color: var(--box-primary);
            color: var(--box-background);

            .icon {
                color: var(--box-background);
            }
        }
    }
}
</style>
