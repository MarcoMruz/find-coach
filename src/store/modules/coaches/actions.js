import { API_URL } from '../../../../config';

export default {
  async registerCoach(context, data) {
    const userId = context.rootGetters.userId;
    const coach = {
      firstName: data.first,
      lastName: data.last,
      areas: data.areas,
      description: data.desc,
      hourlyRate: data.rate
    };

    const response = await fetch(`${API_URL}/coaches/${userId}.json`, {
      method: 'PUT',
      body: JSON.stringify(coach),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) return;

    context.commit('registerCoach', {
      ...coach,
      id: userId
    });
  },

  async loadCoaches(context) {
    const response = await fetch(`${API_URL}/coaches.json`);
    const data = await response.json();

    if (!response.ok)
      throw new Error(data.message || 'Failed to fetch data from server!');

    const coaches = [];

    for (const key in data) {
      const coach = {
        firstName: data[key].firstName,
        lastName: data[key].lastName,
        areas: data[key].areas,
        description: data[key].description,
        hourlyRate: data[key].hourlyRate,
        id: key
      };

      coaches.push(coach);
    }

    context.commit('setCoaches', coaches);
  }
};
