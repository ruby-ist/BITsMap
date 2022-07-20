<template>
    <div id="pin" :style="{left: `${left}px`, top: `${top}px`}">
        <img :src="require(`~/assets/images/pin.svg`)">
    </div>
</template>

<script>
export default {
    props: {
        left: Number,
        top: Number,

    },

    mounted() {
        $('#pin').hide();
    }
}
</script>

<style lang="scss" scoped>
    #pin{
        position: absolute;

        img{
            height: 32px;
            width: 32px;
        }
    }
</style>
