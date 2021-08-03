<template>
	<v-btn
		id="to-store"
		class="light-orange-gradient px-4"
		color="orange darken-4"
		fab
		dark
		small
		fixed
		top
		right
		to="/store"
	>
		<v-icon>store</v-icon>
	</v-btn>
</template>

<script>
export default {
	name: "VisitStore",
}
</script>

<style scoped>
#to-store {
	top: 100px;
}
</style>
