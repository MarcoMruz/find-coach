import { API_URL } from '../../../../config';

export default {
  async sendMessage(context, { coachId, email, message }) {
    const newRequest = {
      email,
      message
    };

    const response = await fetch(`${API_URL}/requests/${coachId}.json`, {
      method: 'POST',
      body: JSON.stringify(newRequest)
    });

    const data = await response.json();

    if (!response.ok)
      throw new Error(data.message || 'Failed to send request.');

    context.commit('addRequest', {
      ...newRequest,
      id: data.name
    });
  },

  async loadRequests(context) {
    const userId = context.rootGetters.userId;
    const token = context.rootGetters.token;
    const response = await fetch(
      `${API_URL}/requests/${userId}.json?auth=${token}`
    );
    const data = await response.json();

    if (!response.ok)
      throw new Error(data.message || 'Oops problem with loading requests...');

    const requests = [];

    for (const key in data) {
      const request = {
        email: data[key].email,
        message: data[key].message,
        coachId: userId,
        id: key
      };

      requests.push(request);
    }

    context.commit('setRequests', requests);
  }
};
