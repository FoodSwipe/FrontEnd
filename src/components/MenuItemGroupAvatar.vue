<template>
	<v-card
		flat
		class="pa-2 d-flex justify-center align-center ma-0"
		max-width="140"
		rounded
		color="transparent"
		@click="$router.push(routeTo)"
	>
		<div>
			<v-avatar class="menu-group-av"
				size="100"
			>
				<v-img :src="itemGroup.image" />
			</v-avatar>
			<p class="item-name text-center">
				{{ itemGroup.name }}
			</p>
		</div>
	</v-card>
</template>

<script>
export default {
	name: "MenuItemGroupAvatar",
	props: {
		itemGroup: {
			type: Object,
			required: true
		},
	},
	computed: {
		routeTo() {
			return `/store/menu_item_group=${this.itemGroup.id}`
		}
	}
}
</script>

<style scoped lang="sass">
.menu-group-av:hover
	animation-name: scaleAnimation
	animation-fill-mode: forwards
	animation-duration: .7s
.menu-group-av
	animation-name: reverse
	animation-duration: .7s
@keyframes scaleAnimation
	from
		transform: scale(1)
	to
		transform: scale(1.1)
@keyframes reverse
	from
		transform: scale(1.1)
	to
		transform: scale(1)
.item-name
	padding-top: 15px
	width: 100px
	font-size: .87rem
	line-height: .87rem
	font-weight: 500
</style>
