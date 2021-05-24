import { AUTH_API_URL_LOG, AUTH_API_URL_REG } from '../../../../config';

export default {
  async login(context, payload) {
    let data = null;

    try {
      data = await handleSignIn(AUTH_API_URL_LOG, payload);
    } catch (error) {
      throw new Error(error);
    }

    context.commit('setUser', {
      token: data.idToken,
      userId: data.localId,
      tokenExpiration: data.expiresIn
    });
  },

  async signup(context, payload) {
    let data = null;

    try {
      data = await handleSignIn(AUTH_API_URL_REG, payload);
    } catch (error) {
      throw new Error(error);
    }

    context.commit('setUser', {
      token: data.idToken,
      userId: data.localId,
      tokenExpiration: data.expiresIn
    });
  }
};

async function handleSignIn(url, payload) {
  const response = await fetch(url, {
    method: 'POST',
    'Content-Type': 'application/json',
    body: JSON.stringify({
      ...payload,
      returnSecureToken: true
    })
  });

  const data = await response.json();

  if (!response.ok) throw new Error(data.message || 'Failed to register.');

  return data;
}
