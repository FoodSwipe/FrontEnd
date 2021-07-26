<template>
	<div>
		<swiper />
		<hot-items />
		<our-menu />
		<how-we-serve />
		<food-swipe-facebook />
		<facebook-chat />
		<visit-store />
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
		FacebookChat: () => import("@/components/FbChat")
	},
};
</script>
