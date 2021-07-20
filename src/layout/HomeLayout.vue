<template>
	<div>
		<the-snack-bar />
		<home-toolbar />
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
import TheSnackBar from "@/components/TheSnackBar"

export default {
	name: "HomeLayout",
	components: {
		TheSnackBar,
		HomeToolbar: () => import("@/views/home/components/Toolbar"),
		HomeFooter: () => import("@/views/home/components/Footer")
	}
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
.food-swipe-snack {
	margin-top: -60px;
}
</style>
