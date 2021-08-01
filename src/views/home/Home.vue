<template>
	<div>
		<home-toolbar />
		<v-card height="100vh"
			class="transparent"
			style="z-index: 0; position: relative"
			dark
		>
			<order-now style="z-index: 2; position: absolute; top: 35vh;" />
			<v-card height="100vh"
				style="position: absolute; top: 0; z-index: 1;"
			>
				<swiper />
			</v-card>
		</v-card>
		<hot-items />
		<our-menu />
		<how-we-serve />
		<food-swipe-facebook />
		<facebook-chat />
		<visit-store v-if="$vuetify.breakpoint.width < 1000" />
		<scroll-top />
	</div>
</template>

<script>
export default {
	name: "HomeView",
	components: {
		VisitStore: () => import("@/components/VisitStore"),
		Swiper: () => import("@/views/home/components/Swiper"),
		HotItems: () => import("@/views/home/components/HotItems"),
		OurMenu: () => import("@/views/home/components/OurMenu"),
		HowWeServe: () => import("@/views/home/components/HowWeServe"),
		FoodSwipeFacebook: () => import("@/views/home/components/Facebook"),
		FacebookChat: () => import("@/components/FbChat"),
		HomeToolbar: () => import("@/views/home/components/Toolbar"),
		OrderNow: () => import("@/views/home/components/OrderNow"),
	},
};
</script>
