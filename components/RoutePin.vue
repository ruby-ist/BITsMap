<template>
    <div v-if="type === 'start'" class="route-pin" :style="{left: `${startX - 16}px`, top: `${startY - 16}px`}">
        <img :src="require(`~/assets/images/pin.svg`)">
    </div>
    <div v-else class="route-pin" :style="{left: `${endX - 16}px`, top: `${endY - 16}px`}">
        <img :src="require(`~/assets/images/pin.svg`)">
    </div>
</template>

<script>
import {mapState} from "pinia";
import {usePinStore} from "@/store/pin";

export default {
    props: ["type"],
    computed: {
      ...mapState(usePinStore, ['startX', 'startY', 'endX', 'endY'])
    },
    mounted() {
        $('.route-pin').hide();
    },
}
</script>

<style lang="scss" scoped>
.route-pin {
    position: absolute;
    z-index: 2;

    img {
        height: 32px;
        width: 32px;
    }
}
</style>
