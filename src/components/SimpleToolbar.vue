<template>
	<v-toolbar flat
		style="border-bottom: 2px solid darkorange;"
	>
		<v-btn text
			to="/"
		>
			<div class="organization-title">
				Food swipe
			</div>
		</v-btn>
		<v-spacer />
		<v-btn to="/store"
			text
			class="ma-1"
		>
			<v-icon size="16">
				store
			</v-icon>
			<span
				v-if="$vuetify.breakpoint.width > 300"
				style="font-size: 12px;"
			>Store</span>
		</v-btn>
		<v-btn to="/cart"
			text
			class="ma-1"
		>
			<v-icon size="16">
				shopping_cart
			</v-icon>
			<span
				v-if="$vuetify.breakpoint.width > 300"
				style="font-size: 12px;"
			>Cart</span>
		</v-btn>
	</v-toolbar>
</template>

<script>
export default {
	name: "SimpleToolbar"
}
</script>

<style scoped>

</style>
