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
				name: "HOME",
				component: () => import("@/views/home/Home")
			},
		]
	},
	{
		path: "/admin",
		component: () => import("@/layout/AdminLayout"),
		children: [
			{
				path: "",
				name: "ADMINISTRATION HOME",
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
