<template>
    <div id="compass">
        <img :src="require(`~/assets/images/compass.svg`)">
        <div class="shadow"></div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
    #compass{
        height: 8rem;
        width: 8rem;
        position: fixed;
        top: 12vh;
        right: 2rem;
        z-index: 5;

        img{
            z-index: 6;
        }

        .shadow{
            position: absolute;
            height: 100%;
            width: 100%;
            background: radial-gradient(#686D76, transparent, transparent);
            z-index: 4;
        }
    }
</style>