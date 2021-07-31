<template>
	<v-main>
		<v-container class="ma-0 pa-0"
			fluid
		>
			<the-snack-bar />
			<router-view />
			<home-footer />
			<start-order-component />
		</v-container>
	</v-main>
</template>
<script>
import StartOrderComponent from "@/components/StartOrder"
export default {
	name: "HomeSimpleLayout",
	components: {
		StartOrderComponent,
		HomeFooter: () => import("@/views/home/components/Footer"),
		TheSnackBar: () => import("@/components/TheSnackBar")
	}
}
</script>
