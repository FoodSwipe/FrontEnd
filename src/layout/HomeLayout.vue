<template>
	<div>
		<home-toolbar />
		<router-view />
	</div>
</template>

<script>
export default {
	name: "HomeLayout",
	components: {
		HomeToolbar: () => import("@/views/home/components/Toolbar")
	}
}
</script>
