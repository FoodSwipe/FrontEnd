<template>
	<div class="pa-4">
		<v-card
			max-width="1000"
			class="mx-auto pa-2"
		>
			<v-text-field
				v-model="order.location"
				clearable
				filled
				prepend-inner-icon="explore"
				label="Your Location Here..."
				hide-details="auto"
			/>
			<div class="text-center pt-2">
				<v-btn depressed
					class="purple-gradient"
					dark
				>
					<v-icon>fastfood</v-icon>
					<span v-if="$vuetify.breakpoint.width > 255"
						class="ml-2"
					>start my order</span>
				</v-btn>
			</div>
		</v-card>
	</div>
</template>
<script>
export default {
	name: "OrderNowComponent",
	data: () => ({
		order: {
			location: ""
		}
	})
}
</script>
