import $api from "@/handler/axios"

export const SET_LOGS = "SET_LOGS"

import urls from "@/urls.json"

const logUrls = urls.log

const state = {
	logs: {}
}

const mutations = {
	[SET_LOGS](state, value) {
		state.logs = value
	}
}

const getters = {
	allLogs: state => {
		return state.logs.results
	}
}

const actions = {
	async fetchAllLogs({commit}) {
		try {
			const res = await $api.get(logUrls.list)
			commit("SET_LOGS", res)
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
