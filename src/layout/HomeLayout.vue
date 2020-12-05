<template>
	<div>
		<home-toolbar />
		<router-view />
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
