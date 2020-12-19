import $api from "@/handler/axios"
import urls from "@/urls.json"

const util = require("util")
const itemTypeUrls = urls.itemType

export const SET_MENU_ITEM_TYPES = "SET_MENU_ITEM_TYPES"
export const SET_MENU_ITEM_TYPE = "SET_MENU_ITEM_TYPE"
export const SET_MENU_ITEM_TYPE_FORM_ERRORS = "SET_MENU_ITEM_TYPE_FORM_ERRORS"

const defaultErrors = {

}

const state = {
	itemTypes: {},
	itemType: {},
	itemTypeFormErrors: {
		...defaultErrors
	}
}

const mutations = {
	[SET_MENU_ITEM_TYPES](state, value){
		state.itemTypes = value
	},
	[SET_MENU_ITEM_TYPE](state, value) {
		state.itemType = value
	},
	[SET_MENU_ITEM_TYPE_FORM_ERRORS](state, value) {
		state.itemTypeFormError = value
	}
}

const getters = {
	allItemTypes: state => {
		return state.itemTypes.results
	},
	detailMenuItem: state => {
		return state.itemType
	},
	menuItemFormErrors: state => {
		return state.itemTypeFormErrors
	}
}

const actions = {
	clearFormErrors({commit}) {
		commit("SET_MENU_ITEM_TYPE_FORM_ERRORS", {
			...defaultErrors
		})
	},
	async fetchAll({ commit }) {
		const res = await $api.get(itemTypeUrls.list)
		commit("SET_MENU_ITEM_TYPES", res)
	},
	async create({commit}, payload) {
		try {
			await $api.post(itemTypeUrls.list, payload)
			return true
		} catch (e) {
			if (e.response.status === 400) {
				commit("SET_MENU_ITEM_TYPE_FORM_ERRORS", e.response.data)
				return false
			}
			return 500
		}
	},
	async delete({}, payload) {
		try {
			await $api.delete(util.format(itemTypeUrls.detail, payload.id))
			return true
		} catch (e) {
			return false
		}
	},
	async patch({commit}, payload) {
		try {
			await $api.patch(util.format(itemTypeUrls.detail, payload.id), payload.body)
			return true
		} catch (e) {
			if (e.response.status === 400) {
				commit("SET_MENU_ITEM_FORM_ERRORS", e.response.data)
				return false
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
