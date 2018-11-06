import superagent from 'superagent';
import * as routes from '../routes';
// Syncronous
export const set = token => ({
  type: 'TOKEN_SET',
  payload: token,
});

export const remove = () => ({
  type: 'TOKEN_REMOVE',
});
// Asyncronous
export const signupRequest = user => (store) => {
  return superagent.post(`${API_URL}${routes.SIGNUP_BACKEND}`) // eslint-disable-line
    .send(user)
    .withCredentials()
    .then((response) => {
      return store.dispatch(set(response.text));
    });
};

export const loginRequest = user => (store) => {
  return superagent.get(`${API_URL}${routes.LOGIN_BACKEND}`) // eslint-disable-line
    .auth(user.username, user.password)
    .withCredentials()
    .then((response) => {
      return store.dispatch(set(response.text));
    });
};
