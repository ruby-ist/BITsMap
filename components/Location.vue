<template>
    <div id="location" :style="{left: `${left}px`, top: `${top}px`}">
        <img :src="require(`~/assets/images/location2.svg`)">
    </div>
</template>

<script>
export default {
    props: {
        left: Number,
        top: Number,
    },

    mounted() {
        $('#location').hide();
    }
}
</script>

<style lang="scss" scoped>
#location{
    position: absolute;
    z-index: 2;
    transform: translate(-50%, -50%);

    img{
        height: 48px;
        width: 48px;
    }
}
</style>
