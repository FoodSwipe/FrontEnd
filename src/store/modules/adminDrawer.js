export const SET_DRAWER = "SET_DRAWER"

const state = {
	drawer: true
}

const mutations = {
	[SET_DRAWER](state, value) {
		state.drawer = value
	}
}

const getters = {
	drawerState: state => {
		return state.drawer
	}
}

const actions = {
	toggleDrawer({state, commit}) {
		commit("SET_DRAWER", !(state.drawer))
	},
	closeDrawer({commit}) {
		commit("SET_DRAWER", false)
	}
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}
