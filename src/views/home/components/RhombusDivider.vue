<template>
	<v-row class="ma-0 pa-0 px-4"
		align="center"
	>
		<v-avatar size="20">
			<v-img :src="rhombus" />
		</v-avatar>
		<v-divider />
		<v-avatar size="20">
			<v-img :src="rhombus" />
		</v-avatar>
	</v-row>
</template>
<script>
export default {
	name: "RhombusDivider",
	data: () => ({
		rhombus: "https://cdn1.iconfinder.com/data/icons/materia-arrows-symbols-vol-9/24/018_338_insignia_badge_shape-512.png"
	})
}
</script>
