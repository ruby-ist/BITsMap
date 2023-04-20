<template>
    <div>
        <NavBar />
        <div id="main-popup" data-content="Hold anywhere to pin the location. Double tap to hide the pin and your location" data-position="bottom center" data-variation="small inverted basic"></div>
        <div id="map">
            <img class="the-map" v-if="svg && darkTheme" :src="require(`~/static/Map-dark.svg`)" :height="height" :width="width"
                 alt="svg Map" oncontextmenu="return false">
            <img class="the-map" v-else-if="svg" :src="require(`~/static/Map.svg`)" :height="height" :width="width"
                 alt="svg Map" oncontextmenu="return false">
            <img class="the-map" v-else :src="require(`~/static/Map.webp`)" :height="height" :width="width"
                 alt="satellite Map" oncontextmenu="return false">
            <MapRoute :height="height" :width="width"/>

            <MapTags :level="level" :class="{'dark-tags': (darkTheme && svg)}"/>
            <MapLegends :level="level"/>
            <Pin :x="pinLeft" :y="pinTop" :svg="svg" :zoomLevel="level"/>
            <Location :left="locationX" :top="locationY" :svg="svg" :zoomLevel="level"/>
        </div>

        <ViewButtons @changeSVG="changeView" @changeTheme="toggleTheme" :lined="svg" :isDark="darkTheme"/>
        <ZoomButtons @zoomin="handleZoomIn" @zoomout="handleZoomOut" @getLocation="geoLocate"/>
    </div>
</template>

<script>
import {mapState, mapWritableState} from 'pinia'
import {useSearchStore} from "@/store/search";
import {useMapStore} from "@/store/map";
import {usePinStore} from "@/store/pin";
import {useDetailsBoxStore} from "@/store/detailsBox";

export default {
    data() {
        return {
            position: {"x": 1800, "y": 2150},
            height: 3876,
            width: 3420,
            clipShow: false,
            locationX: 0,
            locationY: 0,
            pinLeft: 0,
            pinTop: 0,
            callBackId: 0,
            direction: null,
            mapAltered: false,
            cache: {},
            minLevel: 1,
            darkTheme: false,
        }
    },

    computed: {
        ...mapWritableState(useMapStore, ['svg', 'level', 'fullZoomOutTrigger']),
        ...mapWritableState(usePinStore, ['startX', 'startY', 'endX', 'endY']),
        ...mapState(useSearchStore, ['searchId']),
        ...mapWritableState(useDetailsBoxStore, ['showBox'])
    },
    methods: {
        unShrinkable(scale) {
            return (this.height / scale < screen.height) || (this.width / scale < screen.width);
        },

        async zoomIn() {
            let newLevel = this.level;
            let map = $('#map')[0];
            if (this.height < 3800 && this.width < 3400) {
                if(this.mapAltered)
                    await this.setCache();
                this.height *= 1.5;
                this.width *= 1.5;
                map.scrollLeft = map.scrollLeft * 1.5;
                map.scrollTop = map.scrollTop * 1.5;
                this.locationX = this.locationX * 1.5;
                this.locationY = this.locationY * 1.5;
                this.startX = this.startX * 1.5;
                this.startY = this.startY * 1.5;
                this.endX = this.endX * 1.5;
                this.endY = this.endY * 1.5;
                newLevel++;
                this.mapAltered = false;
            }
            this.showBox = false;
            return newLevel;
        },
        async zoomOut() {
            let newLevel = this.level;
            let map = $('#map')[0];
            if (this.height > 1148.46 && this.width > 1013.34) {
                if (this.unShrinkable(1.5))
                    return;
                if(this.mapAltered)
                    await this.setCache();
                this.height /= 1.5;
                this.width /= 1.5;
                map.scrollLeft = map.scrollLeft / 1.5;
                map.scrollTop = map.scrollTop / 1.5;
                this.locationX = this.locationX / 1.5;
                this.locationY = this.locationY / 1.5;
                this.startX = this.startX / 1.5;
                this.startY = this.startY / 1.5;
                this.endX = this.endX / 1.5;
                this.endY = this.endY / 1.5;
                newLevel--;
                this.mapAltered = false;
            }
            this.showBox = false;
            return newLevel;
        },

        handleZoomIn(){
            let that = this;
            this.zoomIn().then(function(result){
                if(result !== undefined)
                    that.level = result;
            });
        },

        handleZoomOut(){
            let that = this;
            this.zoomOut().then(function(result){
                if(result !== undefined)
                    that.level = result;
            });
        },

        changeView() {
            this.svg = !this.svg;
        },

        toggleTheme() {
            this.darkTheme = !this.darkTheme;
            let main = $('#main');
            if(this.darkTheme){
                main.removeClass('light')
                main.addClass('dark');
            }
            else{
                main.removeClass('dark')
                main.addClass('light');
            }
        },

        async fullZoomIn() {
            let times = 4 - this.level;
            while(times--){
                await this.zoomIn();
            }
            this.level = 4;
        },

        async fullZoomOut() {
            let times = this.level - 1;
            while(times--){
                await this.zoomOut();
            }
            this.level = this.minLevel;
        },

        goTo(pos) {
            let map = $('#map')[0];
            map.scrollLeft = pos["x"] - screen.width / 2;
            map.scrollTop = pos["y"] - screen.height / 2 + 300;
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
            this.cache["locationX"] = x;
            this.cache["locationY"] = y;
        },

        async geoLocate() {
            if (!navigator.geolocation) {
                alert("Geolocation is not supported in this browser.");
            } else {
                if (this.callBackId !== 0)
                    navigator.geolocation.clearWatch(this.callBackId);
                this.callBackId = navigator.geolocation.watchPosition(await this.success, this.error, {enableHighAccuracy: true});
            }
        },

        async success(position) {
            await this.fullZoomIn();
            let x = position.coords.longitude * 100000;
            let y = position.coords.latitude * 100000;
            x = (x - 7727333) * (this.width / 907.0);
            y = this.height - (y - 1149133) * (this.height / 1016.0);

            x += 45;
            y -= 28;
            this.setLocation(x, y);
            this.position = {'x': x, 'y': y - screen.height / 5};
        },

        error() {
            alert("Unable to get your location.");
        },

        storeCache(){
            this.cache["height"] = this.height;
            this.cache["width"] = this.width;
            this.cache["locationX"] = this.locationX;
            this.cache["locationY"] = this.locationY;
            this.cache["startX"] = this.startX;
            this.cache["startY"] = this.startY;
            this.cache["endX"] = this.endX;
            this.cache["endY"] = this.endY;
        },

        setCache(){
            this.height = this.cache["height"];
            this.width = this.cache["width"];
            this.locationX = this.cache["locationX"];
            this.locationY = this.cache["locationY"];
            this.startX = this.cache["startX"];
            this.startY = this.cache["startY"];
            this.endX = this.cache["endX"];
            this.endY = this.cache["endY"];
        },


        scale(scale) {
            let map = $('#map .the-map');
            let height = parseInt(map.css('height').slice(0, -2));
            let width = parseInt(map.css('width').slice(0, -2));

            height = height * scale;
            width = width * scale;
            this.height = height;
            this.width = width;

            let tags = $('.tag');
            $.each(tags, function (k, tag) {
                let left = parseInt($(tag).css('left').slice(0, -2));
                let top = parseInt($(tag).css('top').slice(0, -2));

                $(tag).css({
                    'left': `${left * scale}px`,
                    'top': `${top * scale}px`
                });
            });

            let legends = $('.legend');
            $.each(legends, function (k, legend) {
                let left = parseInt($(legend).css('left').slice(0, -2));
                let top = parseInt($(legend).css('top').slice(0, -2));

                $(legend).css({
                    'left': `${left * scale}px`,
                    'top': `${top * scale}px`
                });
            });

            map.scrollLeft = map.scrollLeft * scale;
            map.scrollTop = map.scrollTop * scale;
            this.locationX = this.locationX * scale;
            this.locationY = this.locationY * scale;
            this.startX = this.startX * scale;
            this.startY = this.startY * scale;
            this.endX = this.endX * scale;
            this.endY = this.endY * scale;

            this.showBox = false;
        },

        setTheme(theme){
            this.darkTheme = theme;
        }
    },

    beforeCreate() {
        let query = this.$route.query;
        if (typeof query.level !== "undefined") {
            this.level = parseInt(query.level);
            if (query.svg === "false")
                this.svg = false;
        }
    },

    mounted() {
        this.darkTheme = $('#main')[0].classList[0] === 'dark';
        let that = this;
        let media = window.matchMedia('(prefers-color-scheme: dark)');
        media.addEventListener('change', event => {
            that.darkTheme = event.matches;
        });
        let query = this.$route.query;
        if (typeof query.level !== "undefined") {
            let givenLevel = 4 - parseInt(query.level)
            let x = parseInt(query.left);
            let y = parseInt(query.top);

            while (givenLevel--) {
                this.height /= 1.5;
                this.width /= 1.5
            }
            this.position = {'x': x, 'y': y};
            this.setPin(x, y);
        }

        this.goTo(this.position);
        this.storeCache();
        let isDown = false;
        let startX;
        let startY;
        let scrollTop;
        let scrollLeft;
        let map = $('#map')[0];
        map.addEventListener('mousedown', (e) => {
            isDown = true;
            startX = e.pageX - map.offsetLeft;
            startY = e.pageY - map.offsetTop;
            scrollLeft = map.scrollLeft;
            scrollTop = map.scrollTop;
        });
        map.addEventListener('mouseleave', () => {
            isDown = false;
        });
        map.addEventListener('mouseup', () => {
            isDown = false;
        });
        map.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - map.offsetLeft;
            const y = e.pageY - map.offsetTop;
            const walkX = (x - startX);
            const walkY = (y - startY);
            map.scrollLeft = scrollLeft - walkX;
            map.scrollTop = scrollTop - walkY;
        });

        let mc = new Hammer(map, {touchAction: 'manipulation'});
        mc.get('press').set({time: 700});
        mc.on('press', function (event) {
            let x = event.srcEvent.layerX;
            let y = event.srcEvent.layerY;
            that.setPin(x, y);
            that.clipShow = true;
        });

        mc.on('doubletap', function () {
            $('#pin').hide();
        });

        map.onwheel = function (event) {
            if (event.deltaY <= -100) {
                event.preventDefault();
                that.zoomIn().then((result) => {
                    if(result !== undefined)
                        that.level = result;
                });
            }
            if (event.deltaY >= 100) {
                event.preventDefault();
                that.zoomOut().then((result) => {
                    if(result !== undefined)
                        that.level = result;
                });
            }
        };

        mc.get('pinch').set({enable: true});
        mc.on('pinchstart pinchmove pinchend', (ev) => {
            if (ev.type === 'pinchmove') {
                that.mapAltered = true;
                that.scale(ev.scale);
            }
        });

        let minHeight = 1148.44;
        let minWidth = 1013.34;
        while(!(minHeight > screen.height && minWidth > screen.width)){
            this.minLevel++;
            minHeight *= 1.5;
            minWidth *= 1.5;
        }

        $('#location-btn').popup('show');
        $('#routes-btn').popup('show');
        $('#main-popup').popup('show');

        setTimeout(()=>{
            $('#location-btn').popup('destroy');
            $('#routes-btn').popup('destroy');
            $('#main-popup').popup('hide');
        }, 5000);

        // $(document).on('mousemove', (event) => {
        //     let map = $('#map')[0];
        //     const {
        //         clientX,
        //         clientY
        //     } = event
        //     console.log(map.scrollTop + clientY - 85, map.scrollLeft + clientX -2);
        // });
    },

    updated() {
        let mc = new Hammer(map, {touchAction: "auto"});
        const that = this;
        mc.on('doubletap', function () {
            $('#location').hide();
            navigator.geolocation.clearWatch(that.callBackId);
        });
    },

    watch: {
        async position(newValue) {
            await this.goTo(newValue);
        },

        async fullZoomOutTrigger() {
            await this.fullZoomOut();
        },

        async searchId(newValue) {
            let data = await this.$http.$get(`https://api-geobits.onrender.com/map/location/${newValue}`);
            let left = parseInt(data["left"].slice(0, -2));
            let top = parseInt(data["top"].slice(0, -2));
            await this.fullZoomIn();
            await this.setPin(left - 15, top + 35);
            this.clipShow = false;
            this.position = {"x": left, "y": top};
            $(`#${data['id']}`).click();
        },

        callBackId(){
            setTimeout(() => {
                $('#location').popup('show')
            }, 500);
        },

        level(){
            this.storeCache();
        }
    }
}

</script>

<style lang="scss">
#map {
    position: relative;
    overflow: scroll;
    margin-top: 85px;
    width: 100vw;
    height: 100vh;
    cursor: grab;

    &:active {
        cursor: grabbing;
    }

    &::-webkit-scrollbar {
        display: none;
    }

    img {
        position: absolute;
    }
}

</style>
