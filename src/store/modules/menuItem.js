import $api from "@/handler/axios"
import urls from "@/urls.json"

const util = require("util")
const menuItemUrls = urls.menuItem

export const SET_MENU_ITEMS = "SET_MENU_ITEMS"
export const SET_MENU_ITEM = "SET_MENU_ITEM"
export const SET_MENU_ITEM_FORM_ERRORS = "SET_MENU_ITEM_FORM_ERRORS"
export const SET_TOP_RECOMMENDED_ITEMS = "SET_TOP_RECOMMENDED_ITEMS"
export const SET_TOP_ITEMS = "SET_TOP_ITEMS"
export const SET_RECOMMENDED_ITEMS = "SET_RECOMMENDED_ITEMS"

const defaultErrors = {
	name: null,
	description: null,
	price: null,
	is_available: null,
	menu_item_group: null,
	item_type: null,
	scale: null,
	image: null,
	ingredients: null,
	weight: null,
	calorie: null,
	is_veg: null,
	is_bar_item: null,
	bar_size: null,
	created_at: null,
	created_by: null,
	updated_at: null,
	updated_by: null,
}

const state = {
	menuItems: {},
	menuItem: {},
	formError: {
		...defaultErrors
	},
	topRecommendedMenuItems: {},
	topItems: {},
	recommendedItems: {},
}

const mutations = {
	[SET_MENU_ITEMS](state, value){
		state.menuItems = value
	},
	[SET_MENU_ITEM](state, value) {
		state.menuItem = value
	},
	[SET_MENU_ITEM_FORM_ERRORS](state, value) {
		state.formError = value
	},
	[SET_TOP_RECOMMENDED_ITEMS](state, value) {
		state.topRecommendedMenuItems = value
	},
	[SET_TOP_ITEMS](state, value) {
		state.topItems = value
	},
	[SET_RECOMMENDED_ITEMS](state, value) {
		state.recommendedItems = value
	},
}

const getters = {
	allMenuItems: state => {
		return state.menuItems.results
	},
	detailMenuItem: state => {
		return state.menuItem
	},
	menuItemFormErrors: state => {
		return state.formError
	},
	topRecommendedItems: state => {
		return state.topRecommendedMenuItems.results
	},
	allTopItems: state => {
		return state.topItems.results
	},
	allRecommendedItems: state => {
		return state.recommendedItems.results
	}
}

const actions = {
	clearFormErrors({commit}) {
		commit("SET_MENU_ITEM_FORM_ERRORS", {
			...defaultErrors
		})
	},
	async fetchOrderNowList({commit}) {
		const res = await $api.get(menuItemUrls.orderNowList)
		commit("SET_MENU_ITEMS", res)
	},
	async fetchAll({ commit }, payload = null) {
		const res = await $api.getWithPayload(menuItemUrls.list, payload)
		commit("SET_MENU_ITEMS", res)
	},
	async getDetail({commit}, payload) {
		const res = await $api.get(util.format(menuItemUrls.detail, payload.id))
		commit("SET_MENU_ITEM", res)
	},
	async create({commit}, payload) {
		try {
			await $api.post(menuItemUrls.list, payload)
			return true
		} catch (e) {
			if (parseInt(e.response.status.toString()) === 400) {
				commit("SET_MENU_ITEM_FORM_ERRORS", e.response.data)
				return false
			}
			return 500
		}
	},
	async update({commit}, payload) {
		try {
			await $api.put(util.format(menuItemUrls.detail, payload.id), payload.body)
			return true
		} catch (e) {
			if (parseInt(e.response.status.toString()) === 400) {
				commit("SET_MENU_ITEM_FORM_ERRORS", e.response.data)
				return false
			}
			return 500
		}
	},
	async delete({}, payload) {
		try {
			await $api.delete(util.format(menuItemUrls.detail, payload.id))
			return true
		} catch (e) {
			return false
		}
	},
	async patch({commit}, payload) {
		try {
			await $api.patch(util.format(menuItemUrls.detail, payload.id), payload.body)
			return true
		} catch (e) {
			if (parseInt(e.response.status.toString()) === 400) {
				commit("SET_MENU_ITEM_FORM_ERRORS", e.response.data)
				return e.response.data
			}
			return 500
		}
	},
	async fetchTopRecommendedItems({commit}) {
		try {
			const res = await $api.get(menuItemUrls.topRecommendedMenuItem)
			commit("SET_TOP_RECOMMENDED_ITEMS", res)
			return true
		} catch (e) {
			return false
		}
	},
	async fetchTopItems({commit}) {
		try {
			const res = await $api.get(menuItemUrls.topItems)
			commit("SET_TOP_ITEMS", res)
			return true
		} catch (e) {
			return false
		}
	},
	async fetchRecommendedItems({commit}) {
		try {
			const res = await $api.get(menuItemUrls.recommendedItems)
			commit("SET_RECOMMENDED_ITEMS", res)
			return true
		} catch (e) {
			return false
		}
	},
	async patchTopRecommended({commit}, payload) {
		try {
			await $api.patch(util.format(menuItemUrls.topRecommendedMenuItemDetail, payload.id), payload.body)
			return true
		} catch (e) {
			if (parseInt(e.response.status.toString()) === 400) {
				return e.response.data
			}
			return 500
		}
	},
	async filter({commit}, payload) {
		try {
			const res = await $api.get(util.format(menuItemUrls.filter, payload.name))
			commit("SET_MENU_ITEMS", res)
			return true
		} catch (e) {
			return false
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
