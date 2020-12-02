<template>
	<div class="home">
		<swiper />
		<order-now />
		<hot-items />
		<home-footer />
	</div>
</template>

<script>
export default {
	name: "HomeView",
	components: {
		Swiper: () => import("@/views/home/components/Swiper"),
		OrderNow: () => import("@/views/home/components/OrderNow"),
		HotItems: () => import("@/views/home/components/HotItems"),
		HomeFooter: () => import("@/views/home/components/Footer")
	}
}
</script>
