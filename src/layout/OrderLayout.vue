<template>
	<v-card flat
		tile min-height="100vh"
		color="#fff5e6"
	>
		<simple-toolbar />
		<radio-group />
		<div class="order-router-view">
			<router-view />
		</div>
	</v-card>
</template>
<script>
import SimpleToolbar from "@/components/SimpleToolbar"
import { mapGetters } from "vuex"
import RadioGroup from "@/components/RadioGroup"

export default {
	name: "OrderConfirmation",
	components: { RadioGroup, SimpleToolbar }
}
</script>
<style lang="scss" scoped>
.order-router-view {
	margin-top: -12vh;
}
</style>
