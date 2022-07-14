<template>
  <div id="main">
    <div class="ui icon violet button">
      <i class="info circle icon"></i>
    </div>
    <br/>
    <br/>
    <div class="ui icon violet button"  @click="$emit('change')">
      <i class="map icon" :class="{ outline: !lined }"></i>
    </div>
  </div>
</template>

<script>
  export default{
    props: { lined: Boolean },
    emits: ["change"]
  }
</script>

<style scoped>
  #main{
    position: fixed;
    left: 30px;
    bottom: 40px;
  }
</style>
