<template>
	<v-main>
		<v-container class="pa-0"
			style="max-width: 100vw;"
		>
			<the-snack-bar />
			<swiper />
			<hot-items />
			<our-menu />
			<how-we-serve />
			<food-swipe-facebook />
			<home-footer />
		</v-container>
	</v-main>
</template>

<script>
import TheSnackBar from "@/components/TheSnackBar"
import HomeFooter from "@/views/home/components/Footer"

export default {
	name: "HomeView",
	components: {
		HomeFooter,
		TheSnackBar,
		Swiper: () => import("@/views/home/components/Swiper"),
		HotItems: () => import("@/views/home/components/HotItems"),
		OurMenu: () => import("@/views/home/components/OurMenu"),
		HowWeServe: () => import("@/views/home/components/HowWeServe"),
		FoodSwipeFacebook: () => import("@/views/home/components/Facebook"),
	},
}
</script>
