<template>
	<div class="home">
		<swiper />
		<order-now />
		<rhombus-divider />
		<hot-items />
		<v-row class="ma-0 pa-0">
			<v-col
				cols="12"
				xl="8"
				lg="8"
				md="8"
			>
				<our-menu />
			</v-col>
			<v-col cols="12"
				xl="4"
				lg="4"
				md="4"
			>
				<recommended-items />
			</v-col>
		</v-row>
		<rhombus-divider />
		<how-we-serve />
		<rhombus-divider />
		<food-swipe-facebook />
	</div>
</template>

<script>
export default {
	name: "HomeView",
	components: {
		Swiper: () => import("@/views/home/components/Swiper"),
		OrderNow: () => import("@/views/home/components/OrderNow"),
		HotItems: () => import("@/views/home/components/HotItems"),
		OurMenu: () => import("@/views/home/components/OurMenu"),
		RecommendedItems: () => import("@/views/home/components/Recommendations"),
		HowWeServe: () => import("@/views/home/components/HowWeServe"),
		FoodSwipeFacebook: () => import("@/views/home/components/Facebook"),
		RhombusDivider: () => import("@/views/home/components/RhombusDivider"),
	}
}
</script>
