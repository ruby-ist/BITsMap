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
        bottom: 35%;
        right: 2rem;
        z-index: 5;

        img{
            position: absolute;
            z-index: 6;
        }

        .shadow{
            position: absolute;
            height: 100%;
            width: 100%;
            background: radial-gradient(#fff, transparent, transparent);
            z-index: 4;
        }
    }

    @media screen and (max-width: 520px) {
        #compass{
            right: 15px;
        }
    }
</style>