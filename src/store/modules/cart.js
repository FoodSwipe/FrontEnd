import $api from "@/handler/axios"
import urls from "@/urls.json"

const util = require("util")
const cartUrls = urls.cart

export const SET_CART_ITEMS = "SET_CART_ITEMS"
export const SET_CART_ITEM = "SET_CART_ITEM"
export const SET_CART_LENGTH = "SET_CART_LENGTH"

const state = {
	cartItems: {},
	cartItem: {},
	cartLength: {}
}

const mutations = {
	[SET_CART_ITEMS](state, value){
		state.cartItems = value
	},
	[SET_CART_ITEM](state, value) {
		state.cartItem = value
	},
	[SET_CART_LENGTH](state, value) {
		state.cartLength = value
	}
}

const getters = {
	allCartItems: state => {
		return state.cartItems.results
	},
	detailCartItem: state => {
		return state.cartItem
	},
	menuItemGroupFormErrors: state => {
		return state.menuItemGroupFormErrors
	},
	cartLength: state => {
		return state.cartLength
	}
}

const actions = {
	async fetchAll({ commit }) {
		const res = await $api.get(cartUrls.list)
		commit("SET_CART_ITEMS", res)
	},
	async fetchParticular({commit}, payload) {
		const res = await $api.get(util.format(cartUrls.detail, payload.id))
		commit("SET_CART_ITEM", res)
	},
	async addToCart({commit}, payload) {
		try {
			await $api.post(cartUrls.list, payload)
			return true
		} catch (e) {
			return e.response.data
		}
	},
	async removeFromCart({}, payload) {
		try {
			await $api.delete(util.format(cartUrls.detail, payload.id))
			return true
		} catch (e) {
			return false
		}
	},
	async patch({commit}, payload) {
		try {
			await $api.patch(util.format(cartUrls.detail, payload.id), payload.body)
			return true
		} catch (e) {
			if (parseInt(e.response.status.toString()) === 400) {
				return e.response.data
			}
			return 500
		}
	}
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}
