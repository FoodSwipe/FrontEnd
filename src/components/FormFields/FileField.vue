<template>
	<v-col cols="12">
		<v-file-input
			:value="value"
			outlined
			small-chips
			show-size
			:accept="accept"
			:label="label.toUpperCase()"
			clearable
			prepend-icon=""
			prepend-inner-icon="camera"
			hide-details="auto"
			:error-messages="getErrorMessage"
			@input="$emit('input', $event)"
			@change="$emit('change', $event)"
		/>
	</v-col>
</template>

<script>
import FieldErrorMessage from "@/mixin/FieldErrorMessage"

export default {
	name: "FileField",
	mixins: [FieldErrorMessage],
	props: {
		value: {
			required: false
		},
		name: {
			required: true,
			type: String
		},
		label: {
			required: false,
			type: String,
			default: "Add Image (*)"
		},
		accept: {
			type: String,
			default: "image/*"
		}
	},
	emits: ["change", "input"],
}
</script>

<style scoped>

</style>
