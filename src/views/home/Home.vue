<template>
	<div>
		<home-toolbar />
		<order-now style="z-index: 1; position: absolute; top: 30vh;" />
		<swiper />
		<hot-items />
		<our-menu />
		<how-we-serve />
		<food-swipe-facebook />
		<facebook-chat />
		<visit-store v-if="$vuetify.breakpoint.width < 1000" />
		<v-chip class="ma-1 contact-chip"
			:class="{ 'slight-up' : ($vuetify.breakpoint.width > 1300),
				'slight-down': ($vuetify.breakpoint.width < 1300)
			}"
			color="orange lighten-4"
		>
			<v-icon small
				left color="#f96a1f"
			>
				call
			</v-icon>
			<a href="tel:9802801073"
				class="text-decoration-none"
				style="color: #f96a1f;"
			>
				9802801073
			</a>
		</v-chip>
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
<style lang="scss" scoped>
.public-contact-icon {
	height: 100%;
	display: flex;
	align-items: center;
	padding-right: 6px;
}
.contact-chip {
	position: fixed; right: 10px; z-index: 3;
}
.slight-up {
	top: 5px;
}
.slight-down {
	top: 55px;
}
</style>
