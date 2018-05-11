const getters = {
  isAuthenticated(state) {
    return state.user !== null && state.user !== undefined
  },

  getTicket(state) {
    return state.ticket.ticket
  }
}
export default getters
