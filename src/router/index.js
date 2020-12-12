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
			{
				path: "order",
				name: "Order",
				component: () => import("@/layout/OrderLayout"),
				children: [
					{
						name: "Confirm Order",
						path: "shipping-confirmation",
						component: () => import("@/views/cart/OrderConfirmation")
					},
					{
						name: "Confirm Payment",
						path: "payment-confirmation",
						component: () => import("@/views/cart/PaymentConfirmation")
					},
					{
						name: "Review Order",
						path: "review-order",
						component: () => import("@/views/cart/ReviewOrder")
					}
				]
			},
		]
	},
	{
		path: "/admin",
		component: () => import("@/layout/AdminLayout"),
		children: [
			{
				path: "home",
				name: "Administration",
				component: () => import("@/views/admin/Home")
			},
			{
				path: "user",
				name: "User",
				component: () => import("@/views/admin/user/User")
			},
			{
				path: "user/:id",
				name: "User Detail",
				component: () => import("@/views/admin/user/UserDetail")
			},
			{
				path: "order",
				name: "Order",
				component: () => import("@/views/admin/order/Order")
			},
			{
				path: "transaction",
				name: "Transaction",
				component: () => import("@/views/admin/transaction/Transaction")
			},
			{
				path: "menu-item",
				name: "Menu Item",
				component: () =>import("@/views/admin/menu/MenuItem")
			},
			{
				path: "menu-item-group",
				name: "Menu Item Group",
				component: () =>import("@/views/admin/menu/MenuItemGroup")
			},
			{
				path: "utilities",
				name: "Utilities",
				component: () =>import("@/views/admin/utility/Utilities")
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
