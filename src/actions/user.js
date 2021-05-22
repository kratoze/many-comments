import { userConstants } from '../constants/user.constants';

export const loginSuccess = (username, id) => ({
  type: userConstants.LOGIN_SUCCESS,
  username,
  id,
});

export const loginRequest = () => ({
  type: userConstants.LOGIN_REQUEST,
});

export const loginError = (error) => ({
  type: userConstants.LOGIN_ERROR,
  error,
});

export const logout = () => ({
  type: userConstants.LOGOUT,
});

export const startLogin = (username, password) => {
  return async (dispatch) => {
    dispatch(loginRequest());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();

      const user = {
        username: data.username,
        id: data.id,
        token: response.headers.get('auth'),
      };

      if (data.error) throw data.error;

      localStorage.setItem('auth', JSON.stringify(user));

      dispatch(loginSuccess(data.username, data.id));
    } catch (err) {
      dispatch(loginError(err));
    }
  };
};

export const startLogout = () => {
  return async (dispatch) => {
    try {
      const { token } = JSON.parse(localStorage.getItem('auth'));
      const response = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
        method: 'DELETE',
        headers: {
          auth: token,
        },
      });
      localStorage.removeItem('auth');
      dispatch(logout());
    } catch (err) {
      dispatch(loginError(err));
    }
  };
};

const registerRequest = {
  type: userConstants.REGISTER_REQUEST,
};

const registerSuccess = () => ({
  type: userConstants.REGISTER_SUCCESS,
});

export const startSignup = (username, password) => {
  return async (dispatch) => {
    dispatch(loginRequest());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();

      if (data.error) throw data.error;

      const user = {
        username: data.username,
        id: data.id,
        token: response.headers.get('auth'),
      };

      localStorage.setItem('auth', JSON.stringify(user));
      dispatch(loginSuccess(data.username, data.id));
    } catch (err) {
      dispatch(loginError(err));
    }
  };
};
