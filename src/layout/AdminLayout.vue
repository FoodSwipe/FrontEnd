<template>
	<div>
		<v-app-bar
			app
			dark
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
				<span>Home</span>
			</v-tooltip>
		</v-app-bar>
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
						src="https://t3.ftcdn.net/jpg/02/94/99/24/360_F_294992494_kPG2PgIe6Jn9sU4OcSw6Th6SvZD4OfWy.jpg"
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
						<v-img src="https://randomuser.me/api/portraits/women/85.jpg" />
					</v-avatar>
				</v-col>
			</v-row>
			<v-list class="py-0 text-center">
				<v-list-item link>
					<v-list-item-content class="py-0">
						<v-list-item-title class="title">
							Sandra Adams
						</v-list-item-title>
						<v-list-item-subtitle>sandra_a88@gmail.com</v-list-item-subtitle>
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
					<v-list-item-icon><v-icon>{{ item.icon }}</v-icon></v-list-item-icon>
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

export default {
	name: "AdminLayout",
	components: {
		AdminFooter: () => import("@/views/admin/components/Footer")
	},
	data: () => ({
		drawer: true,
		drawerItems: [
			{ title: "Home", icon: "home", to: "/admin/home" },
			{ title: "Users", icon: "group", to: "/admin/user" },
			{ title: "Orders", icon: "view_list", to: "/admin/order" },
			{ title: "Transactions", icon: "payment", to: "/admin/transaction" },
			{ title: "Menu Items", icon: "local_bar", to: "/admin/menu-item" },
			{ title: "Menu Item Group", icon: "bubble_chart", to: "/admin/menu-item-group" },
			{ title: "Utilities", icon: "stars", to: "/admin/utilities" },
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
}
.admin-layout-main {
	background: #e0e0da;
}
</style>
