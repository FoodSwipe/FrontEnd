<template>
	<v-row
		class="fill-height ma-0 pa-0"
		justify="center"
		align="center"
	>
		<v-card color="transparent"
			flat max-width="800"
			class="mx-auto"
		>
			<v-card-title class="display-1 px-3">
				{{ heading }}
			</v-card-title>
			<v-card-subtitle class="subtitle px-3">
				{{ subtitle }}
			</v-card-subtitle>
			<v-card-actions>
				<v-btn :color="buttonColor">
					<v-icon size="24">
						{{ buttonIcon }}
					</v-icon>
					<span v-if="$vuetify.breakpoint.width > 165"
						class="ml-2 button-text"
					>{{ buttonText }}</span>
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-row>
</template>
<script>
export default {
	name: "SwiperImageContentComponent",
	props: {
		heading: {
			type: String,
			required: true
		},
		subtitle: {
			type: String,
			required: true
		},
		buttonText: {
			type: String,
			required: true
		},
		buttonIcon: {
			type: String,
			required: true
		},
		buttonColor: {
			type: String,
			required: true
		}
	}
}
</script>
<style lang="sass" scoped>
.button-text
	font-size: 1rem
	font-family: "Crete Round", serif
.display-1
	transition: all .3s
	@media only screen and (max-width: 365px)
		font-size: 1.5rem !important
		line-height: 1.5rem
	@media only screen and (max-width: 150px)
		font-size: 1.2rem !important
		line-height: 1.2rem
.subtitle
	transition: all .3s
	visibility: visible
	opacity: 1
	@media only screen and (max-width: 365px)
		font-size: 0.8rem !important
		line-height: 0.8rem
	@media only screen and (max-width: 180px)
		visibility: hidden
		opacity: 0
		max-width: 0
		width: 0
		max-height: 0
		height: 0
</style>
