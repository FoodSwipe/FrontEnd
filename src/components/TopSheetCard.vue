<template>
	<v-card class="mx-auto pa-4 sheet-card"
		outlined
		rounded
		color="#ffffff87"
		max-width="1000"
	>
		<v-sheet
			class="sheet mx-auto"
			dark
			rounded
			max-width="900"
			elevation="4"
			:color="color"
		>
			<v-card-title class="d-flex justify-space-between align-center py-8">
				<p class="section-header mb-0">
					{{ title }}
				</p>
			</v-card-title>
		</v-sheet>
		<div class="py-6" />
		<div class="pa-1">
			<slot />
		</div>
	</v-card>
</template>

<script>
export default {
	name: "TopSheetCard",
	props: {
		color: {
			type: String,
			required: true
		},
		title: {
			type: String,
			required: true
		}
	}
}
</script>

<style scoped lang="sass">
.sheet
	margin-top: -50px
.item-name
	padding-top: 10px
	width: 100px
	font-size: .87rem
	line-height: .87rem
	font-weight: 500
</style>
