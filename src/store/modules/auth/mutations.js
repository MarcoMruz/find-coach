export default {
  setUser(state, { token, userId }) {
    state.token = token;
    state.userId = userId;
    state.autoLogout = false;
  },

  setAutoLogout(state) {
    state.autoLogout = true;
  }
};
