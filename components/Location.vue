<template>
    <div id="location" :style="{left: `${left}px`, top: `${top}px`}">
        <img :src="require(`~/assets/images/location.svg`)">
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

    img{
        height: 32px;
        width: 32px;
    }
}
</style>
