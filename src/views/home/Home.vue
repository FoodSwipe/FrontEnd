<template>
	<div class="home">
		<swiper />
		<order-now />
		<hot-items />
		<v-divider inset
			class="mb-2"
		/>
		<our-menu />
		<how-we-serve />
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
		HowWeServe: () => import("@/views/home/components/HowWeServe")
	}
}
</script>
