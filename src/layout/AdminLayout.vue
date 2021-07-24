<template>
	<div>
		<scroll-top />
		<v-app-bar
			app
			dark
			height="58"
			class="px-2"
		>
			<v-app-bar-nav-icon @click="toggleDrawer()">
				<v-expand-transition>
					<v-icon v-if="!drawer">
						menu
					</v-icon>
					<v-icon v-else>
						menu_open
					</v-icon>
				</v-expand-transition>
			</v-app-bar-nav-icon>

			<v-toolbar-title>Food Swipe Administration</v-toolbar-title>

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
				<span>Home</span>
			</v-tooltip>
		</v-app-bar>
		<the-snack-bar />
		<v-navigation-drawer
			v-model="drawer"
			app
			floating
			dark
			color="rgb(75 45 0)"
		>
			<v-row class="ma-0 pa-0">
				<v-col cols="12"
					class="ma-0 pa-0"
				>
					<v-img
						height="100"
						width="100%"
						:src="require('@/assets/admin_cover.jpg')"
					>
						<v-row class="ma-0 pa-0 setting-nav-action">
							<v-toolbar class="text-center"
								dense
								color="transparent"
								dark
							>
								<v-spacer />
								<v-btn
									color="grey lighten-2"
									fab
									height="30"
									width="30"
									class="my-2"
									@click.stop="drawer = false"
								>
									<v-icon size="20"
										color="grey darken-3"
									>
										close
									</v-icon>
								</v-btn>
							</v-toolbar>
						</v-row>
					</v-img>
				</v-col>
				<v-col cols="12"
					class="d-flex justify-center"
				>
					<v-avatar
						size="120"
						class="admin-profile-avatar"
					>
						<div class="display-2">
							{{ $helper.getCurrentUser().username[0].toUpperCase() }}
						</div>
					</v-avatar>
				</v-col>
			</v-row>
			<v-list class="py-0 text-center">
				<v-list-item link>
					<v-list-item-content class="py-0">
						<v-list-item-title class="title">
							{{ $helper.getCurrentUser().profile.full_name }}
						</v-list-item-title>
						<v-list-item-subtitle>
							{{ $helper.getCurrentUser().email }}
						</v-list-item-subtitle>
					</v-list-item-content>
				</v-list-item>
			</v-list>

			<v-divider class="mt-2 mx-4" />
			<v-list
				nav
				dense
			>
				<v-list-item
					v-for="(item, index) in drawerItems"
					:key="index"
					:to="item.to"
					link
				>
					<v-list-item-icon style="max-width: 20px;">
						<v-icon size="20">
							{{ item.icon }}
						</v-icon>
					</v-list-item-icon>
					<v-list-item-content>
						<v-list-item-title>{{ item.title }}</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
			</v-list>
		</v-navigation-drawer>
		<v-main class="admin-layout-main">
			<v-container fluid>
				<router-view />
			</v-container>
		</v-main>
		<admin-footer />
	</div>
</template>
<script>
import router from "@/router"
import { mapGetters } from "vuex"
import TheSnackBar from "@/components/TheSnackBar"

export default {
	name: "AdminLayout",
	components: {
		TheSnackBar,
		AdminFooter: () => import("@/views/admin/components/Footer")
	},
	data: () => ({
		drawer: true,
		drawerItems: [
			{ title: "Home", icon: "home", to: "/admin/home" },
			{ title: "Orders", icon: "receipt_long", to: "/admin/order" },
			{ title: "KOT", icon: "view_list", to: "/admin/kot" },
			{ title: "Users", icon: "group", to: "/admin/user" },
			{ title: "Menu Items", icon: "local_bar", to: "/admin/menu-item" },
			{ title: "Item Types", icon: "group_work", to: "/admin/item-type" },
			{ title: "Item Groups", icon: "bubble_chart", to: "/admin/menu-item-group" },
			{ title: "Transactions", icon: "payment", to: "/admin/transaction" },
			{ title: "Top / Recommend", icon: "assistant", to: "/admin/top-recommended-items" },
			{ title: "Site Utilities", icon: "stars", to: "/admin/utilities" },
		],
		items: [
			{
				text: "> Home",
				disabled: false,
				href: "/admin/home",
			},
			{
				text: "Link 1",
				disabled: false,
				href: "breadcrumbs_link_1",
			},
			{
				text: "Link 2",
				disabled: true,
				href: "breadcrumbs_link_2",
			},
		],
	}),
	methods: {
		routeToHomePage() {
			router.push({name: "Food Swipe"})
		},
		toggleDrawer() {
			this.drawer = !this.drawer
		}
	}
}
</script>
<style lang="scss" scoped>
.admin-profile-avatar {
	border: 4px solid white; margin-top: -55px;
	background-color: #b67b0f;
	div {
		color: white;
		font-family: "Open Sans Condensed", Serif !important;
	}
}
.admin-layout-main {
	background: #2d2d2d;
	min-height: calc(100vh - 54px);
}
.admin-snackbar {
	margin-top: -60px;
}
</style>
