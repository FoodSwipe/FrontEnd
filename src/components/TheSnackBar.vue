<template>
	<v-snackbar
		v-model="snack"
		:timeout="3000"
		class="food-swipe-snack"
		bottom
	>
		{{ snackText }}
		<template #action="{ attrs }">
			<v-btn
				text
				:color="snackColor"
				v-bind="attrs"
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
.food-swipe-snack {
	z-index: 200;
}
</style>
