<template>
	<v-col
		cols="12"
	>
		<!-- eslint-disable-next-line vue/no-deprecated-v-bind-sync -->
		<v-autocomplete :search-input.sync="itemType"
			:value="value"
			:items="itemTypes.results"
			:loading="itemTypeLoading"
			outlined
			clearable
			multiple
			item-text="name"
			item-value="id"
			label="SELECT ITEM TYPE GROUP"
			class="menu-item-type-field"
			hide-details="auto"
			prepend-inner-icon="bubble_chart"
			placeholder="Start typing"
			:error-messages="getErrorMessage"
			@input="$emit('input', $event)"
			@change="$emit('change', $event)"
		>
			<template #no-data>
				<v-list-item>
					<v-list-item-title>
						No menu item type group found.
					</v-list-item-title>
				</v-list-item>
			</template>
		</v-autocomplete>
	</v-col>
</template>
<script>
import FieldErrorMessage from "@/mixin/FieldErrorMessage"
import MenuItemTypeAutocomplete from "@/mixin/MenuItemTypeAutocomplete"

export default {
	name: "MenuItemTypeField",
	mixins: [
		FieldErrorMessage,
		MenuItemTypeAutocomplete
	],
	props: {
		/* eslint-disable vue/require-prop-types */
		value: {
			required: true
		},
		errors: {
			type: Object,
			required: false,
			default: () => {}
		},
	},
	emits: ["input", "change"],
	data() {
		return {
			name: "item_type"
		}
	}
}
</script>
