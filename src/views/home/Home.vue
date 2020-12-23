<template>
	<div class="home">
		<swiper />
		<order-now />
		<hot-items />
		<v-divider inset
			class="mb-2"
		/>
		<v-row class="ma-0 pa-0">
			<v-col
				cols="12"
				xl="8"
				lg="8"
				md="8"
				sm="8"
			>
				<our-menu />
			</v-col>
			<v-col cols="12"
				xl="4"
				lg="4"
				md="4"
				sm="4"
			>
				<recommended-items />
			</v-col>
		</v-row>
		<how-we-serve />
		<v-row class="ma-0 pa-0 px-4"
			align="center"
		>
			<v-avatar size="20">
				<v-img src="https://cdn1.iconfinder.com/data/icons/materia-arrows-symbols-vol-9/24/018_338_insignia_badge_shape-512.png" />
			</v-avatar>
			<v-divider />
			<v-avatar size="20">
				<v-img src="https://cdn1.iconfinder.com/data/icons/materia-arrows-symbols-vol-9/24/018_338_insignia_badge_shape-512.png" />
			</v-avatar>
		</v-row>
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
		FoodSwipeFacebook: () => import("@/views/home/components/Facebook")
	}
}
</script>
