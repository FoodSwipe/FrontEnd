<template>
	<div
		style="font-family: 'Righteous', cursive; font-size: 14px; background-color: transparent;"
		class="d-flex justify-start align-center py-4 white--text"
	>
		<div
			v-for="(item, index) in items"
			:key="index"
			class="d-flex"
		>
			<div
				class="px-1 breadcrumb-item"
				:class="{'cursor text-uppercase': item.to, 'disabled': !item.to}"
				@click="item.to && $router.push(item.to)"
			>
				{{ item.text }}
			</div>
			<div v-if="index + 1 < items.length"
				class="px-1"
			>
				/
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "AdminBreadcrumb",
	props: {
		items: {
			type: Array,
			required: true
		}
	},
	data: () => ({}),
	computed: {},
	methods: {}
}
</script>

<style scoped lang="scss">
.disabled {
	color: lightgrey;
}
</style>
