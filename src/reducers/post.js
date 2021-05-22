import { combineReducers } from 'redux';

import { postConstants } from '../constants/post.constants';
import { commentConstants } from '../constants/comments.constants';

const initialState = {
  loading: false,
  error: null,
};

const postRequestReducer = (state = initialState, action) => {
  switch (action.type) {
    case postConstants.GET_ALL_POSTS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case postConstants.GET_ALL_POSTS_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case postConstants.GET_ALL_POSTS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case postConstants.NEW_POST_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case postConstants.NEW_POST_SUCCESS:
      return {
        loading: false,
      };
    case postConstants.NEW_POST_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case 'DELETE_POST':
      return state.filter((post) => post._id !== action.id);
    default:
      return state;
  }
};

const byId = (state = {}, action) => {
  switch (action.type) {
    case postConstants.GET_ALL_POSTS_SUCCESS:
      return action.posts.reduce((postObj, post) => {
        postObj[post._id] = post;
        return postObj;
      }, {});
    case postConstants.NEW_POST_SUCCESS:
      return {
        ...state,
        [action.post._id]: action.post,
      };
    default:
      return state;
  }
};

const allIds = (state = [], action) => {
  switch (action.type) {
    case postConstants.GET_ALL_POSTS_SUCCESS:
      return action.posts.map((post) => post._id);
    case postConstants.NEW_POST_SUCCESS:
      return [...state, action.post._id];
    default:
      return state;
  }
};

const posts = combineReducers({
  byId,
  allIds,
  postRequestReducer,
});

export const getAllPosts = (state) =>
  state.posts.allIds.map((id) => state.posts.byId[id]);

export default posts;
