export default {
  requests(state, _, _2, rootGetters) {
    return state.requests.filter(
      request => rootGetters.userId === request.coachId
    );
  },

  hasRequests(_, getters) {
    return getters.requests && getters.requests.length > 0;
  }
};
