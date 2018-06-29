const getters = {
  isAuthenticated(state) {
    return state.user !== null && state.user !== undefined;
  },

  getTicket(state) {
    return state.ticket.number;
  },

  getUser(state) {
    return state.user;
  },
};

export default getters;
