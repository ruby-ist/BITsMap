<template>
    <div id="location" :style="{left: `${left-36}px`, top: `${top-36}px`}">
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
        height: 72px;
        width: 72px;
    }
}
</style>
