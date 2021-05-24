import { AUTH_API_URL_LOG, AUTH_API_URL_REG } from '../../../../config';

let timer;

export default {
  async login(context, payload) {
    let data = null;

    try {
      data = await handleSignIn(AUTH_API_URL_LOG, payload, context);
    } catch (error) {
      throw new Error(error);
    }

    context.commit('setUser', {
      token: data.idToken,
      userId: data.localId
    });
  },

  async signup(context, payload) {
    let data = null;

    try {
      data = await handleSignIn(AUTH_API_URL_REG, payload, context);
    } catch (error) {
      throw new Error(error);
    }

    context.commit('setUser', {
      token: data.idToken,
      userId: data.localId
    });
  },

  logout(context) {
    context.commit('setUser', {
      token: null,
      userId: null,
      tokenExpiration: null
    });

    clearTimeout(timer);

    localStorage.removeItem('token');
    localStorage.removeItem('userId');
  },

  tryLogin(context) {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const tokenExpiration = localStorage.getItem('tokenExpiration');

    const expiresIn = +tokenExpiration - new Date().getTime();

    if (expiresIn <= 0) return;

    if (expiresIn > 0) {
      timer = setTimeout(() => {
        context.dispatch('autoLogout');
      }, expiresIn);
    }

    if (token && userId) {
      context.commit('setUser', { token, userId });
    }
  },

  autoLogout(context) {
    context.dispatch('logout');
    context.commit('setAutoLogout');
  }
};

async function handleSignIn(url, payload, context) {
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

  const expiresIn = +data.expiresIn * 1000;
  const expirationDate = new Date().getTime() + expiresIn;

  localStorage.setItem('token', data.idToken);
  localStorage.setItem('userId', data.localId);
  localStorage.setItem('tokenExpiration', expirationDate);

  timer = setTimeout(() => {
    context.dispatch('autoLogout');
  }, expiresIn);

  return data;
}
