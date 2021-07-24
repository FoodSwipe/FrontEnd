<template>
	<v-badge
		:dark="dark"
		color="orange"
		offset-x="10"
		offset-y="15"
	>
		<template #badge>
			<span class="white--text number-font">{{ cartCount }}</span>
		</template>
		<v-tooltip bottom>
			<template #activator="{on, attrs}">
				<v-btn
					:disabled="$route.name === 'Cart'"
					icon
					small
					class="mr-2"
					v-bind="attrs"
					to="/cart"
					v-on="on"
				>
					<v-icon size="26">
						shopping_cart
					</v-icon>
				</v-btn>
			</template>
			<span>Cart</span>
		</v-tooltip>
	</v-badge>
</template>

<script>
import { mapGetters } from "vuex"

export default {
	name: "CartIndicator",
	props: {
		dark: {
			type: Boolean,
			default: true
		}
	},
	computed: {
		...mapGetters({
			alreadyCookingOrder: "order/detailOrder"
		}),
		cartCount() {
			if (this.alreadyCookingOrder) {
				return this.alreadyCookingOrder["total_items"]
			} else return 0
		}
	},
}
</script>

<style scoped>

</style>
