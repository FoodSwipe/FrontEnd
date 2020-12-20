import $api from "@/handler/axios"
import urls from "@/urls.json"

const util = require("util")
const menuItemUrls = urls.menuItem

export const SET_MENU_ITEMS = "SET_MENU_ITEMS"
export const SET_MENU_ITEM = "SET_MENU_ITEM"
export const SET_MENU_ITEM_FORM_ERRORS = "SET_MENU_ITEM_FORM_ERRORS"

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
	}
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
	}
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
	async fetchAll({ commit }) {
		const res = await $api.get(menuItemUrls.list)
		commit("SET_MENU_ITEMS", res)
	},
	async create({commit}, payload) {
		try {
			await $api.post(menuItemUrls.list, payload)
			return true
		} catch (e) {
			if (e.response.status === 400) {
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
			if (e.response.status === 400) {
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
			if (e.response.status === 400) {
				commit("SET_MENU_ITEM_FORM_ERRORS", e.response.data)
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
