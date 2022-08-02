<template>
    <div>
        <NavBar @draw="drawPath"/>
        <div id="map">
            <img v-if="svg" :src="require(`~/assets/images/Map.svg`)" :height="height" :width="width" alt="svg Map">
            <img v-else :src="require(`~/assets/images/Map.webp`)" :height="height" :width="width" alt="satellite Map">
            <MapRoute :path="direction" v-if="direction" :height="height" :width="width"/>

            <MapTags :level="level"/>
            <MapLegends :level="level"/>
            <Pin :left="pinLeft" :top="pinTop" :svg="svg" :zoomlevel="level" :show="clipShow"/>
            <Location :left="locationX" :top="locationY"/>
        </div>

        <ViewButtons @change="changeView" @getLocation="geoLocate" :lined="svg"/>
        <ZoomButtons @zoomin="zoomIn" @zoomout="zoomOut"/>
    </div>
</template>

<script>
import {mapState} from 'pinia'
import {useSearchStore} from "@/store/search";

export default {
    data() {
        return {
            level: 4,
            position: {"x": 1800, "y": 2150},
            pinned: false,
            height: 3876,
            width: 3420,
            svg: true,
            clipShow: false,
            locationX: 0,
            locationY: 0,
            pinLeft: 0,
            pinTop: 0,
            callBackId: 0,
            direction: null,
        }
    },

    computed: {
        ...mapState(useSearchStore, ['searchId'])
    },

    methods: {
        unShrinkable() {
            return (this.height / 1.5 < screen.height) || (this.width / 1.5 < screen.width);
        },

        zoomIn() {
            let map = $('#map')[0];
            if (this.height < 3800 && this.width < 3400) {
                this.height *= 1.5;
                this.width *= 1.5;
                map.scrollLeft = map.scrollLeft * 1.5;
                map.scrollTop = map.scrollTop * 1.5;
                this.locationX = this.locationX * 1.5;
                this.locationY = this.locationY * 1.5;
                this.level++;
            }
            $('.show-box').css({
                'bottom': "-50vh",
                'height': '0',
            });
            $('#pin').hide();
        },

        zoomOut() {
            let map = $('#map')[0];
            if (this.height > 1148.46 && this.width > 1013.34) {
                if (this.unShrinkable())
                    return;
                this.height /= 1.5;
                this.width /= 1.5;
                map.scrollLeft = map.scrollLeft / 1.5;
                map.scrollTop = map.scrollTop / 1.5;
                this.locationX = this.locationX / 1.5;
                this.locationY = this.locationY / 1.5;
                this.level--;
            }
            $('.show-box').css({
                'bottom': "-50vh",
                'height': '0',
            });
            $('#pin').hide();
        },

        changeView() {
            this.svg = !this.svg;
        },

        fullZoomIn() {
            let times = 4 - this.level;
            while (times--)
                this.zoomIn();
        },

        fullZoomOut() {
            let times = this.level;
            while (times--)
                this.zoomOut();
        },

        goTo(pos) {
            let map = $('#map')[0];
            map.scrollLeft = pos["x"] - screen.width / 2;
            map.scrollTop = pos["y"] - screen.height / 2 + 200;
        },

        setPin(x, y) {
            $('#pin').show();
            this.pinLeft = x;
            this.pinTop = y;
        },

        setLocation(x, y) {
            $('#location').show();
            this.locationX = x;
            this.locationY = y;
        },

        async geoLocate() {
            if (!navigator.geolocation) {
                alert("Geolocation is not supported in this browser.");
            } else {
                if (this.callBackId !== 0)
                    navigator.geolocation.clearWatch(this.callBackId);
                this.callBackId = navigator.geolocation.watchPosition(await this.success, this.error);
            }
        },

        success(position) {
            let x = position.coords.longitude.toPrecision(7) * 100000;
            let y = position.coords.latitude.toPrecision(7) * 100000;
            x = (x - 7727333) * (this.width / 907.0);
            y = this.height - (y - 1149133) * (this.height / 1016.0);

            let offsetX = (2.258 / 100) * this.width;
            let offsetY = -(1.258 / 100) * this.height;

            x += offsetX;
            y += offsetY;
            this.setLocation(x, y);
            this.position = {'x': x, 'y': y}
        },

        error() {
            alert("Unable to get your location.");
        },

        async drawPath(obj) {
            this.svg = false;
            await this.fullZoomOut();
            this.direction = obj;
        }
    },

    mounted() {
        let query = this.$route.query;
        if (typeof query.level !== "undefined") {
            let level = 4 - parseInt(query.level);
            let x = parseInt(query.left);
            let y = parseInt(query.top);

            while (level--) {
                x *= 1.5;
                y *= 1.5;
            }
            this.position = {'x': x, 'y': y};

            if (query.svg === "false")
                this.svg = false;

            this.setPin(x, y);
        }

        this.goTo(this.position);

        let mc = new Hammer($('#map')[0], {touchAction: "auto"});
        let that = this;
        mc.get('press').set({time: 700});
        mc.on('press', function (event) {
            let x = event.srcEvent.layerX - 16;
            let y = event.srcEvent.layerY - 32;
            that.setPin(x, y);
            that.clipShow = true;
        });

        // $(document).on('mousemove', (event) => {
        //     let map = $('#map')[0];
        //     const {
        //         clientX,
        //         clientY
        //     } = event
        //     console.log(map.scrollTop + clientY - 100, map.scrollLeft + clientX - 20);
        // });
        // mc.get('pinch').set({ enable: true });
        // mc.on('pinchstart pinchin pinchend', () => { that.zoomOut() });
        // mc.on('pinchstart pinchout pinchend', () => { that.zoomIn() });
    },

    updated() {
        const that = this;
        $('#map').on('click', function () {
            $('#location').hide();
            navigator.geolocation.clearWatch(that.callBackId);
        });
    },

    watch: {
        async position(newValue) {
            await this.goTo(newValue);
        },

        async searchId(newValue) {
            let data = await this.$http.$get(`http://localhost:4567/map/location/${newValue}`);
            let left = parseInt(data["left"].slice(0, -2));
            let top = parseInt(data["top"].slice(0, -2));
            this.fullZoomIn();
            this.setPin(left - 20, top - 10);
            this.position = {"x": left, "y": top};
            $(`#${data['id']}`).click();
        }
    }
}

</script>

<style lang="scss">
#map {
    position: relative;
    overflow: scroll;
    margin-top: 10vh;
    width: 100vw;
    height: 100vh;

    &::-webkit-scrollbar {
        display: none;
    }

    img {
        position: absolute;
    }
}

</style>
