<template>
    <div id="main">
        <button class="ui icon teal button" @click="$emit('getLocation')">
            <i class="search location icon"></i>
        </button>
        <br/>
        <br/>
        <button class="ui icon teal button" @click="$emit('change')">
            <i class="map icon" :class="{ outline: !lined }"></i>
        </button>
    </div>
</template>

<script>
export default {
    props: {lined: Boolean},
    emits: ["change"],
}
</script>

<style scoped>
#main {
    position: fixed;
    left: 50px;
    bottom: 60px;
    z-index: 3;
}

button.ui.icon.teal.button {
    border: 1px solid black;
    box-shadow: 0 0 2px black;
}

@media screen and (max-width: 520px) {
    #main{
        left: 25px;
    }
}
</style>
