<template>
    <div>
        <NavBar @find="findHandler"/>
        <div id="map">
            <img v-if="svg" :src="require(`~/assets/images/Map.svg`)" :height="height" :width="width" alt="svg Map">
            <img v-else :src="require(`~/assets/images/Map.webp`)" :height="height" :width="width" alt="satellite Map">

            <MapTags :level="level" :num="floor_no"/>
            <MapLegends :level="level"/>
            <Pin :left="pinLeft" :top="pinTop" />
            <Location :left="locationX" :top="locationY" />
        </div>

        <ViewButtons @change="changeView" @getLocation="geoLocate" :lined="svg"/>
        <ZoomButtons @zoomin="zoomIn" @zoomout="zoomOut"/>
    </div>
</template>

<script>
export default {
    data() {
        return {
            level: 4,
            position: {"x": 1800, "y": 2150},
            pinned: false,
            mapFile: "Map.svg",
            height: 3876,
            width: 3420,
            svg: true,
            pinShow: false,
            locationX: 0,
            locationY: 0,
            pinLeft: 0,
            pinTop: 0,
            floor_no: 0
        }
    },

    methods: {
        unShrinkable() {
            return (this.height / 1.5 < screen.height) || (this.width / 1.5 < screen.width);
        },

        zoomIn() {
            let map = $('#map')[0];
            let html = $('html')[0];
            if (this.height < 3800 && this.width < 3400) {
                this.height *= 1.5;
                this.width *= 1.5;
                map.scrollLeft = map.scrollLeft * 1.5;
                html.scrollTop = html.scrollTop * 1.5;
                this.locationX = this.locationX * 1.5;
                this.locationY = this.locationY * 1.5;
                this.level++;
            }
            $('.show-box').hide();
        },

        zoomOut() {
            let map = $('#map')[0];
            let html = $('html')[0];
            if (this.height > 1148.46 && this.width > 1013.34) {
                if (this.unShrinkable())
                    return;
                this.height /= 1.5;
                this.width /= 1.5;
                map.scrollLeft = map.scrollLeft / 1.5;
                html.scrollTop = html.scrollTop / 1.5;
                this.locationX = this.locationX / 1.5;
                this.locationY = this.locationY / 1.5;
                this.level--;
            }
            $('.show-box').hide();
        },

        changeView() {
            this.svg = !this.svg;
        },

        fullZoom() {
            let times = 4 - this.level;
            while (times--)
                this.zoomIn();
        },

        goTo(pos) {
            $('#map')[0].scrollLeft = pos["x"] - screen.width / 2;
            $('html')[0].scrollTop = pos["y"] - screen.height / 2 + 200;
        },

        setPin(x,y){
            $('#pin').show();
            this.pinLeft = x;
            this.pinTop = y;
        },

        setLocation(x,y){
            $('#location').show();
            this.locationX = x;
            this.locationY = y;
        },

        async findHandler(id, f_no) {
            let data = await this.$http.$get(`http://localhost:4567/map/location/${id}`);
            let left = parseInt(data["left"].slice(0, -2));
            let top = parseInt(data["top"].slice(0, -2));
            this.fullZoom();
            this.setPin(left - 20, top - 10);
            this.position = {"x": left, "y": top};
            $(`#${data['id']}`).click();
            this.floor_no = f_no;
        },

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
            let x = position.coords.longitude.toPrecision(7) * 100000;
            let y = position.coords.latitude.toPrecision(7) * 100000;
            x = (x - 7727333) * (this.width / 907.0);
            y = (y - 1149133) * (this.height / 1016.0 );
            this.setLocation(x, y);
            this.position = {'x': x, 'y': y}
        },

        error() {
            alert("Unable to get your location.");
        },
    },

    mounted() {
        this.goTo(this.position);
    },

    watch: {
        async position(newValue) {
            await this.goTo(newValue);
        }
    }
}

</script>

<style lang="scss">
#map {
    position: relative;
    overflow: scroll;
    margin-top: 10vh;

    &::-webkit-scrollbar {
        display: none;
    }
}

</style>
