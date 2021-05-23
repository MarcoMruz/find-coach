export default {
  sendMessage(context, { coachId, email, message }) {
    const newRequest = {
      id: new Date().toISOString(),
      coachId,
      email,
      message
    };

    context.commit('addRequest', newRequest);
  }
};
