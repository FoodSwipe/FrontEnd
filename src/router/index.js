import Vue from "vue"
import VueRouter from "vue-router"

Vue.use(VueRouter)

const routes = [
	{
		path: "/",
		component: () => import("@/layout/HomeLayout"),
		children: [
			{
				path: "",
				name: "Food Swipe",
				component: () => import("@/views/home/Home"),
			},
			{
				path: "store",
				name: "Store",
				component: () => import("@/views/store/Store")
			},
			{
				path: "product/:id",
				name: "Product",
				component: () => import("@/views/store/ItemDetail")
			},
			{
				path: "profile",
				name: "Profile",
				component: () => import("@/views/profile/Profile"),
			},
			{
				path: "cart",
				name: "Cart",
				component: () => import("@/views/cart/Cart"),
			},
		]
	},
	{
		path: "/admin",
		component: () => import("@/layout/AdminLayout"),
		children: [
			{
				path: "",
				name: "Administration Home",
				component: () => import("@/views/admin/Home")
			},
		]
	}
]

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes
})

export default router
