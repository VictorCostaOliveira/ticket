const getters = {
  isAuthenticated(state) {
    return state.user !== null && state.user !== undefined
  }
}
export default getters
