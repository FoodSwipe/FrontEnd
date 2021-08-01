<template>
	<v-footer padless
		height="60"
	>
		<v-col
			class="text-center"
			cols="12"
		>
			<v-icon small
				color="grey"
			>
				copyright
			</v-icon>
			<div>
				{{ new Date().getFullYear() }} — <strong>Food Swipe Pvt. Ltd.</strong>
			</div>
		</v-col>
	</v-footer>
</template>
<script>
export default {
	name: "HomeFooter"
}
</script>
<style scoped>
.text-center {
	font-size: 12px;
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	justify-content: center;
}
</style>
