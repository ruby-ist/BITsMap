<template>
	<div id="main">
		<button class="ui icon teal button" @click="$emit('zoomin')">
			<i class="plus icon"></i>
		</button>
		<br/>
		<br/>
		<button class="ui icon teal button" @click="$emit('zoomout')" >
			<i class="minus icon"></i>
		</button>
	</div>
</template>

<script>
	export default{
		emits: ['zoomin', 'zoomout']
	}
</script>

<style scoped>
	#main{
		position: fixed;
		right: 50px;
    bottom: 60px;
    z-index: 2;
	}

  button.ui.icon.teal.button{
    border: 1px solid black;
    box-shadow: 0 0 2px black;
  }
</style>
