import $api from "@/handler/axios"
import urls from "@/urls.json"
const util = require("util")

const itemUrls = urls.itemType

export const SET_ITEM_TYPES = "SET_ITEM_TYPES"
export const SET_ITEM_TYPE = "SET_ITEM_TYPE"
export const SET_ADD_ITEM_TYPE_ERROR_MSGS = "SET_ADD_ITEM_TYPE_ERROR_MSGS"

const defaultErrMsgs = {
	name: null,
	badge: null
}

const state = {
	itemTypes: {},
	itemType: {},
	addErrorMessages: {
		...defaultErrMsgs
	}
}

const mutations = {
	[SET_ITEM_TYPES](state, value) {
		state.itemTypes = value
	},
	[SET_ITEM_TYPE](state, value) {
		state.itemType = value
	},
	[SET_ADD_ITEM_TYPE_ERROR_MSGS](state, value) {
		state.addErrorMessages = value
	}
}

const getters = {
	allItemTypes: state => {
		return state.itemTypes
	},
	itemType: state => {
		return state.itemType
	},
	addItemTypeErrorMessages: state => {
		return state.addErrorMessages
	}
}

const actions = {
	clearAddItemTypeErrorMessages({commit}) {
		commit("SET_ADD_ITEM_TYPE_ERROR_MSGS", {
			...defaultErrMsgs
		})
	},
	async fetchAllItemTypes({ commit }, payload) {
		const res = await $api.getWithPayload(itemUrls.list, payload)
		commit("SET_ITEM_TYPES", res)
	},
	async fetchItemType({commit}, payload) {
		const res = await $api.get(util.format(itemUrls.detail, payload.id))
		commit("SET_ITEM_TYPE", res)
	},
	async create({commit}, payload) {
		try {
			await $api.post(itemUrls.list, payload)
			return true
		} catch (e) {
			if (parseInt(e.response.status.toString()) === 400) {
				commit("SET_ADD_ITEM_TYPE_ERROR_MSGS", e.response.data)
				return false
			}
			return 500
		}
	},
	async delete({}, payload) {
		try {
			await $api.delete(util.format(itemUrls.detail, payload.id))
			return true
		} catch (e) {
			return false
		}
	},
	async patch({commit}, payload) {
		try {
			await $api.patch(util.format(itemUrls.detail, payload.id), payload.body)
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
