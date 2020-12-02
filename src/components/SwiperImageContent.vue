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
			<v-card-title class="display-1">
				{{ mainHeading }}
			</v-card-title>
			<v-card-subtitle>
				{{ subtitle }}
			</v-card-subtitle>
			<v-card-actions>
				<v-btn>
					<v-icon size="24">
						{{ buttonIcon }}
					</v-icon>
					<span class="ml-2 button-text">{{ buttonText }}</span>
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-row>
</template>
<script>
export default {
	name: "SwiperImageContentComponent",
	props: {
		mainHeading: {
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
		}
	}
}
</script>
<style lang="sass" scoped>
.button-text
	font-size: 1rem
	font-family: "Crete Round", serif

</style>
