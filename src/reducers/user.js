import { userConstants } from '../constants/user.constants';

const initialState = {
  username: null,
  id: null,
  loading: false,
  error: null,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        ...state,
        username: action.username,
        id: action.id,
        loading: false,
      };
    case userConstants.LOGIN_ERROR:
      console.log(action.error);
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case userConstants.LOGOUT:
      return initialState;
    default:
      return state;
  }
};
