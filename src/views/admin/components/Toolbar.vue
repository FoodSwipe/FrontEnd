<template>
	<v-app-bar
		app
		dark
	>
		<v-app-bar-nav-icon @click="toggleDrawer()">
			<v-expand-transition>
				<v-icon v-if="!drawerValueFromStore">
					menu
				</v-icon>
				<v-icon v-else>
					close
				</v-icon>
			</v-expand-transition>
		</v-app-bar-nav-icon>

		<v-toolbar-title>{{ $route.name }}</v-toolbar-title>

		<v-spacer />
		<v-tooltip left>
			<template #activator="{ on, attrs }">
				<v-btn icon
					v-bind="attrs"
					@click="routeToHomePage"
					v-on="on"
				>
					<v-icon>
						home
					</v-icon>
				</v-btn>
			</template>
			<span>Feeds Page</span>
		</v-tooltip>
	</v-app-bar>
</template>
<script>
import router from "@/router"
import { mapGetters } from "vuex"

export default {
	name: "AdminToolbar",
	computed: {
		...mapGetters({
			drawerValueFromStore: "adminDrawer/drawerState"
		}),
	},
	methods: {
		routeToHomePage() {
			router.push({name: "Food Swipe"})
		},
		toggleDrawer() {
			this.$store.dispatch("adminDrawer/toggleDrawer")
		}
	}
}
</script>
