import $api from "@/handler/axios"
import urls from "@/urls.json"

const util = require("util")
const cartUrls = urls.cart

export const SET_CART_ITEMS = "SET_CART_ITEMS"
export const SET_CART_ITEM = "SET_CART_ITEM"
export const SET_CART_LENGTH = "SET_CART_LENGTH"
export const SET_ORDER_KOT_LIST = "SET_ORDER_KOT_LIST"
export const SET_KOT_FILTER_ERRORS = "SET_KOT_FILTER_ERRORS"

const state = {
	cartItems: {},
	cartItem: {},
	cartLength: {},
	orderKOTs: {},
	kotErrors: {
		order: null,
		batch: null,
		timestamp: null
	}
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
	},
	[SET_ORDER_KOT_LIST](state, value) {
		state.orderKOTs = value
	},
	[SET_KOT_FILTER_ERRORS](state, value) {
		state.kotErrors = value
	},
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
	},
	orderKOTs: state => {
		return state.orderKOTs.results
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
			console.log("whats going on ...")
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
	},
	async fetchOrderKOT({commit}, payload) {
		try {
			const res = await $api.get(util.format(cartUrls.filterKOT, payload.orderId, "", ""))
			commit("SET_ORDER_KOT_LIST", res)
		} catch (e) {
			if (parseInt(e.response.status.toString()) === 400) {
				commit("SET_KOT_FILTER_ERRORS", e.response.data)
				return false
			}
			return 500
		}
	},
	/**
	 *
	 * @param commit
	 * @param {Object} payload
	 * @param {Number} payload.cartId
	 * @param {Object} payload.body
	 *
	 * @return {Promise<void>|int|boolean}
	 */
	async adminUpdateCartItemQuantity({commit}, payload) {
		try {
			const resp = await $api.post(util.format(cartUrls.adminUpdateQuantity, payload.cartId), payload.body)
			return resp.detail
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
