<template>
	<v-fab-transition>
		<v-btn
			v-show="scrollTop"
			v-scroll="onScroll"
			color="pink"
			fab
			dark
			small
			fixed
			bottom
			right
			@click="scrollToTop"
		>
			<v-icon>arrow_drop_up</v-icon>
		</v-btn>
	</v-fab-transition>
</template>

<script>
export default {
	name: "ScrollTop",
	props: {},
	data: () => ({
		scrollTop: null
	}),
	computed: {},
	methods: {
		scrollToTop() {
			window.scroll({
				top: 0,
				behavior: "smooth"
			})
		},
		onScroll(e) {
			if (typeof window === "undefined") return
			const top = window.pageYOffset || e.target.scrollTop
			this.scrollTop = top > 150
		}
	}
}
</script>

<style scoped>

</style>
