<template>
	<div>
		<home-toolbar />
		<v-main class="home-layout">
			<v-container fluid
				class="pa-0"
			>
				<router-view />
			</v-container>
		</v-main>
		<home-footer />
	</div>
</template>

<script>
export default {
	name: "HomeLayout",
	components: {
		HomeToolbar: () => import("@/views/home/components/Toolbar"),
		HomeFooter: () => import("@/views/home/components/Footer")
	}
}
</script>
<style scoped lang="scss">
.home-layout {
	min-height: calc(100vh - 48px);
	padding: 0;
}
</style>
