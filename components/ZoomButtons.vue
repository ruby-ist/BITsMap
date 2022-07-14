<template>
	<div id="main">
		<button class="ui icon violet button" @click="$emit('zoomin')">
			<i class="plus icon"></i>
		</button>
		<br/>
		<br/>
		<button class="ui icon violet button" @click="$emit('zoomout')" >
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
		right: 30px;
    bottom: 40px;
	}
</style>
