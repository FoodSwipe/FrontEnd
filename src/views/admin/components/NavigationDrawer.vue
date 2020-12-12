<template>
	<v-navigation-drawer
		v-model="drawer"
		app
		floating
		dark
		color="#011431"
	>
		<v-row class="ma-0 pa-0">
			<v-col cols="12"
				class="ma-0 pa-0"
			>
				<v-img
					height="100"
					width="100%"
					src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
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
								@click.stop="closeDrawer()"
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
					style="border: 4px solid white; margin-top: -50px"
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
</template>
<script>
import { mapGetters } from "vuex"
export default {
	name: "AdminNavDrawer",
	data: () => ({
		drawerItems: [
			{ title: "Home", icon: "home", to: "/admin/home" },
			{ title: "Customers", icon: "group", to: "/admin/customer" },
			{ title: "Orders", icon: "view_list", to: "/admin/order" },
			{ title: "Transactions", icon: "payment", to: "/admin/transaction" },
			{ title: "Menu Items", icon: "local_bar", to: "/admin/menu-item" },
			{ title: "Menu Item Group", icon: "bubble_chart", to: "/admin/menu-item-group" },
			{ title: "Utilities", icon: "stars", to: "/admin/utilities" },
		],
	}),
	computed: {
		...mapGetters({
			drawerValueFromStore: "adminDrawer/drawerState"
		}),
		drawer: {
			get() {
				return this.drawerValueFromStore
			},
			set(value) {
				return value
			}
		}
	},
	methods: {
		closeDrawer() {
			this.$store.dispatch("adminDrawer/closeDrawer")
		}
	}
}
</script>
