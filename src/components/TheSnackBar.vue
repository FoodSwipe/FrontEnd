<template>
	<v-snackbar
		v-model="snack"
		top
		right
		:timeout="3000"
		:color="snackColor"
		class="food-swipe-snack"
	>
		{{ snackText }}

		<template #action="{ attrs }">
			<v-btn
				v-bind="attrs"
				text
				@click="snack = false"
			>
				Close
			</v-btn>
		</template>
	</v-snackbar>
</template>

<script>
import { mapGetters } from "vuex"

export default {
	name: "TheSnackBar",
	computed: {
		...mapGetters({
			snackText: "snack/snackText",
			snackColor: "snack/snackColor"
		}),
		snack: {
			get() {
				return this.$store.state.snack.snack
			},
			set(v) {
				this.$store.dispatch("snack/setSnackState", v)
			}
		}
	}
}
</script>

<style scoped>

</style>
