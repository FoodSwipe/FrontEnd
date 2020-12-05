<template>
	<div class="home">
		<swiper />
		<order-now />
		<hot-items />
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
		HowWeServe: () => import("@/views/home/components/HowWeServe")
	}
}
</script>
