<template>
	<v-list dark
		dense
	>
		<v-list-item-group
			v-for="(item, index) in filterOptions"
			:key="index"
		>
			<v-list-item>
				<v-list-item-icon v-if="item.icon">
					<v-icon>{{ item.icon }}</v-icon>
				</v-list-item-icon>
				<v-list-item-content>
					<v-list-item-title>{{ item.title }}</v-list-item-title>
				</v-list-item-content>
			</v-list-item>
			<v-divider v-if="index + 1 !== filterOptions.length"
				inset
			/>
		</v-list-item-group>
	</v-list>
</template>
<script>
export default {
	name: "DropdownListWithIconAndDivider",
	props: {
		filterOptions: {
			type: Array,
			required: true,
			default: () => []
		}
	}
}
</script>
