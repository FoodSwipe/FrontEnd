import $api from "@/handler/axios"
import urls from "@/urls.json"

const util = require("util")
const menuItemGroupUrls = urls.menuItemGroup

export const SET_MENU_ITEM_GROUPS = "SET_MENU_ITEM_GROUPS"
export const SET_MENU_ITEM_GROUP = "SET_MENU_ITEM_GROUP"
export const SET_MENU_ITEM_GROUP_FORM_ERRORS = "SET_MENU_ITEM_GROUP_FORM_ERRORS"

const defaultErrors = {

}

const state = {
	itemTypes: {},
	itemType: {},
	menuItemGroupFormErrors: {
		...defaultErrors
	}
}

const mutations = {
	[SET_MENU_ITEM_GROUPS](state, value){
		state.itemTypes = value.results
	},
	[SET_MENU_ITEM_GROUP](state, value) {
		state.itemType = value
	},
	[SET_MENU_ITEM_GROUP_FORM_ERRORS](state, value) {
		state.menuItemGroupFormErrors = value
	}
}

const getters = {
	allMenuItemGroups: state => {
		return state.itemTypes
	},
	detailMenuItemGroup: state => {
		return state.itemType
	},
	menuItemGroupFormErrors: state => {
		return state.menuItemGroupFormErrors
	}
}

const actions = {
	clearFormErrors({commit}) {
		commit("SET_MENU_ITEM_GROUP_FORM_ERRORS", {
			...defaultErrors
		})
	},
	async fetchAll({ commit }) {
		const res = await $api.get(menuItemGroupUrls.list)
		commit("SET_MENU_ITEM_GROUPS", res)
	},
	async create({commit}, payload) {
		try {
			await $api.post(menuItemGroupUrls.list, payload)
			return true
		} catch (e) {
			if (e.response.status === 400) {
				commit("SET_MENU_ITEM_GROUP_FORM_ERRORS", e.response.data)
				return false
			}
			return 500
		}
	},
	async delete({}, payload) {
		try {
			await $api.delete(util.format(menuItemGroupUrls.detail, payload.id))
			return true
		} catch (e) {
			return false
		}
	},
	async patch({commit}, payload) {
		try {
			await $api.patch(util.format(menuItemGroupUrls.detail, payload.id), payload.body)
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
