<template>
    <div id="main">
        <button class="ui icon teal button" @click="geoLocate">
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

    methods: {
        geoLocate() {
            if (!navigator.geolocation) {
                alert("Geolocation is not supported in this browser.");
            } else {
                let options = {
                    enableHighAccuracy: false,
                    timeout: 5000,
                    maximumAge: 0
                }
                navigator.geolocation.getCurrentPosition(this.success, this.error)
            }
        },

        success(position) {
            alert(`Latitude: ${position.coords.latitude}, Longitude: ${position.coords.longitude}`);
        },

        error() {
            alert("Unable to get your location.");
        },
    }
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
</style>
