import { AUTH_API_URL } from '../../../../config';

export default {
  // login(context, payload) {},

  async signup(context, payload) {
    const response = await fetch(AUTH_API_URL, {
      method: 'POST',
      body: JSON.stringify(payload),
      returnSecureToken: true
    });

    const data = await response.json();

    if (!response.ok) throw new Error(data.message || 'Failed to register.');

    context.commit('setUser', {
      token: data.idToken,
      userId: data.localId,
      tokenExpiration: data.expiresIn
    });
  }
};
