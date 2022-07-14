<template>
  <div>
    <div id="map">
      <div v-if="svg">
        <img :src="require(`~/assets/images/Map.svg`)" :height="height" :width="width">
      </div>
      <div v-else>
        <img :src="require(`~/assets/images/Map.webp`)" :height="height" :width="width">
      </div>
    </div>

    <ViewButtons @change="changeView" :lined="svg" />
    <ZoomButtons @zoomin="zoomIn" @zoomout="zoomOut" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      level: 4,
      top: 1800,
      left: 2550,
      pinned: false,
      mapFile: "Map.svg",
      height: 3876,
      width: 3420,
      svg: true,
    }
  },

  methods: {
    unshrinkable() {
      return (this.height/1.5 < screen.height) || (this.width/1.5 < screen.width);
    },

    zoomIn() {
      if (this.height < 3800 && this.width < 3400) {
        this.height *= 1.5;
        this.width *= 1.5;
      }
    },

    zoomOut() {
      if (this.height > 1148.46 && this.width > 1013.34) {
        if(this.unshrinkable())
          return;
        this.height /= 1.5;
        this.width /= 1.5;
      }
    },

    changeView(){
      this.svg = !this.svg;
    }
  },

  mounted() {
    document.querySelector('#map').scrollTop = this.top - screen.height / 2 + 150;
    $('#map')[0].scrollLeft = this.left - screen.width;
  }
}

</script>
<style lang="scss">
#map {
  overflow: scroll;
}

</style>
