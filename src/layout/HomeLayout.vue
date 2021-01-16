<template>
	<div>
		<home-toolbar />
		<v-snackbar
			v-model="snack"
			top
			right
			:timeout="3000"
			:color="snackColor"
			class="home-snack"
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
		<v-main class="home-layout">
			<v-container fluid
				class="pa-0"
				:class="
					($route.name === 'Cart') ? 'top-padding': ''
				"
			>
				<router-view />
			</v-container>
		</v-main>
		<home-footer />
	</div>
</template>

<script>
import { mapGetters } from "vuex"

export default {
	name: "HomeLayout",
	components: {
		HomeToolbar: () => import("@/views/home/components/Toolbar"),
		HomeFooter: () => import("@/views/home/components/Footer")
	},
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
	},
}
</script>
<style scoped lang="scss">
.home-layout {
	padding-top: 6.5rem !important;
	min-height: calc(100vh - 3rem);
	@media only screen and (max-width: 528px) {
		padding-top: 7.6rem !important;
	}
}
.home-snack {
	margin-top: -60px;
}
</style>
