import $api from "@/handler/axios"
import urls from "@/urls.json"
import { setCookingOrderOnLocalStorage } from "@/Helper"

const util = require("util")
const orderUrls = urls.order

export const SET_ORDERS = "SET_ORDERS"
export const SET_ORDER = "SET_ORDER"
export const SET_ORDER_FORM_ERRORS = "SET_ORDER_FORM_ERRORS"

const defaultOrderErrors = {
	custom_location: null,
	custom_contact: null,
	custom_email: null,
}

const state = {
	currentOrderItemsCount: 0,
	orders: {},
	order: {},
	orderFormErrors: {
		...defaultOrderErrors
	}
}

const mutations = {
	[SET_ORDERS](state, value){
		state.orders = value
	},
	[SET_ORDER](state, value) {
		state.order = value
	},
	[SET_ORDER_FORM_ERRORS](state, value) {
		state.orderFormErrors = value
	},
}

const getters = {
	allOrders: state => {
		return state.orders.results
	},
	detailOrder: state => {
		return state.order.results
	},
	orderFormFieldErrors: state => {
		return state.orderFormErrors
	},
	currentCartLength: state => {
		return state.orders.results.length
	}
}

const actions = {
	clearFormErrors({commit}) {
		commit("SET_ORDER_FORM_ERRORS", {
			...defaultOrderErrors
		})
	},
	async fetchAllWithAuthenticated({commit}) {
		const res = await $api.get(orderUrls.listAuthenticated)
		commit("SET_ORDERS", res)
	},
	async withCartItems({commit}, payload) {
		const res = await $api.get(util.format(orderUrls.withCartItems, payload.id))
		commit("SET_ORDER", res)
	},
	async fetchAll({ commit }) {
		const res = await $api.get(orderUrls.list)
		commit("SET_ORDERS", res)
	},
	async startOrder({commit}, payload) {
		try {
			const res = await $api.post(orderUrls.initializeOrder, payload)
			setCookingOrderOnLocalStorage(res.id)
			return true
		} catch (e) {
			if (parseInt(e.response.status.toString()) === 400) {
				if (e.response.data) {
					if (Array.isArray(e.response.data)) {
						setCookingOrderOnLocalStorage(e.response.data[0].replace(/\D/g, ""))
						return e.response.data
					} else {
						commit("SET_ORDER_FORM_ERRORS", e.response.data)
						return false
					}
				}
			}
			return 500
		}
	},
	async create({commit}, payload) {
		try {
			await $api.post(orderUrls.list, payload)
			return true
		} catch (e) {
			if (parseInt(e.response.status.toString()) === 400) {
				commit("SET_ORDER_FORM_ERRORS", e.response.data)
				return false
			}
			return 500
		}
	},
	async update({commit}, payload) {
		try {
			await $api.put(util.format(orderUrls.detail, payload.id), payload.body)
			return true
		} catch (e) {
			if (parseInt(e.response.status.toString()) === 400) {
				commit("SET_ORDER_FORM_ERRORS", e.response.data)
				return false
			}
			return 500
		}
	},
	async delete({}, payload) {
		try {
			await $api.delete(util.format(orderUrls.detail, payload.id))
			return true
		} catch (e) {
			return false
		}
	},
	async unauthorizedUpdateOrder({commit}, payload) {
		try {
			await $api.patch(util.format(orderUrls.unAuthUpdateOrder, payload.id), payload.body)
			return true
		} catch (e) {
			if (parseInt(e.response.status.toString()) === 400) {
				commit("SET_ORDER_FORM_ERRORS", e.response.data)
				return false
			}
			return 500
		}
	},
	async patch({commit}, payload) {
		try {
			await $api.patch(util.format(orderUrls.detail, payload.id), payload.body)
			return true
		} catch (e) {
			if (parseInt(e.response.status.toString()) === 400) {
				commit("SET_ORDER_FORM_ERRORS", e.response.data)
				return false
			}
			return 500
		}
	},
	clearOrderDetail({commit}){
		commit("SET_ORDER", {})
	}
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}
