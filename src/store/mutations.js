const mutations = {
  setUser(state, payload) {
    state.user = payload;
  },

  setError(state, payload) {
    state.error = payload;
  },

  setLoading(state, payload) {
    state.loading = payload;
  },

  setTicket(state, payload) {
    state.ticket = payload
  }
};

export default mutations
