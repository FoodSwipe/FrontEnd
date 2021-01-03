import $api from "@/handler/axios"
import urls from "@/urls.json"

export const SET_TRANSACTIONS = "SET_TRANSACTIONS"

const transactionUrls = urls.transaction

const state = {
	transactions: {}
}

const mutations = {
	[SET_TRANSACTIONS](state, value) {
		state.transactions = value
	}
}

const getters = {
	allTransactions: state => {
		return state.transactions.results
	}
}

const actions = {
	async fetchAllTransactions({commit}) {
		try {
			const res = await $api.get(transactionUrls.list)
			commit("SET_TRANSACTIONS", res)
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
