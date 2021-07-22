<template>
	<v-main>
		<v-container class="ma-0 pa-0"
			fluid
		>
			<the-snack-bar />
			<router-view />
			<home-footer />
		</v-container>
	</v-main>
</template>
<script>
export default {
	name: "HomeSimpleLayout",
	components: {
		HomeFooter: () => import("@/views/home/components/Footer"),
		TheSnackBar: () => import("@/components/TheSnackBar")
	}
}
</script>
