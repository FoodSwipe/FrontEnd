<template>
	<v-footer padless
		dark
	>
		<v-card
			class="text-center"
			width="100vw"
		>
			<v-card-text>©️ {{ new Date().getFullYear() }} — <strong>Food Swipe Pvt. Ltd.</strong></v-card-text>
		</v-card>
	</v-footer>
</template>
<script>
export default {
	name: "HomeFooter"
}
</script>
