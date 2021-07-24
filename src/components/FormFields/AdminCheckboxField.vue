<template>
	<v-col cols="12"
		:xl="(split) ? 6 : null"
		:lg="(split) ? 6 : null"
		:md="(split) ? 6 : null"
		:sm="(split) ? 6 : null"
		class="checkbox-input-column"
	>
		<v-checkbox
			class="checkbox-field"
			:value="value"
			:label="label.toUpperCase()"
			hide-details
			:prepend-icon="icon"
			@change="$emit('input', $event)"
		/>
	</v-col>
</template>

<script>
import FieldErrorMessage from "@/mixin/FieldErrorMessage"

export default {
	name: "AdminCheckboxField",
	mixins: [FieldErrorMessage],
	props: {
		split: {
			type: Boolean,
			default: false
		},
		value: {
			required: true
		},
		icon: {
			required: false,
			type: String,
			default: null
		},
		label: {
			required: true,
			type: String,
		}
	},
	emits: ["input", "change"],
}
</script>

<style lang="scss" scoped>
.checkbox-input-column {
	::v-deep.v-input--checkbox {
		background-color: #1e1e1e;
		margin-top: 0;
		padding: 15px 14px;
		border: 1px solid #545454 !important;
		border-radius: 4px;
		&:hover {
			border: 1.2px solid white !important;
		}
	}
}
</style>
