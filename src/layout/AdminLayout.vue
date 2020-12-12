<template>
	<div>
		<toolbar />
		<navigation-drawer />
		<v-main>
			<v-container fluid>
				<router-view />
			</v-container>
		</v-main>
	</div>
</template>
<script>
export default {
	name: "AdminLayout",
	components: {
		Toolbar: () => import("@/views/admin/components/Toolbar"),
		NavigationDrawer: () => import("@/views/admin/components/NavigationDrawer"),
	}
}
</script>
