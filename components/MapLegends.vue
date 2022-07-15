<template>
  <div>
    <div v-for="legend in legends">
      <img :id="legend['id']" :src="require(`~/assets/legends/${getName(legend['link'])}.svg`)" :style="{ top: legend['top'], left: legend['left'] }" class="legend" />
    </div>
  </div>
</template>

<script>
    export default{
      props: ['level'],
      data(){
        return{
          legends: []
        }
      },

      methods: {
        async getLegends(level){
          this.legends = await this.$http.$get(`http://localhost:4567/map/legends/${this.level}`);
        },

        getName(url){
          return url.split("/")[2].split("-")[0];
        }
      },

      watch: {
        level(num){
          this.getLegends();
        }
      },

      mounted() {
        this.getLegends();
      }
    }
</script>

<style>
  .legend{
    height: 32px;
    width: 32px;
    position: absolute;
  }
</style>
