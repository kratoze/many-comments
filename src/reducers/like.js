import { combineReducers } from 'redux';

import { likeConstants } from '../constants/like.constants';

const initialState = {
  loading: false,
  error: null,
};

export const likeReducer = (state = initialState, action) => {
  switch (action.type) {
    case likeConstants.GET_ALL_LIKE_REQUEST:
    case likeConstants.GET_LIKES_BY_PARENT_REQUEST:
    case likeConstants.NEW_LIKE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case likeConstants.GET_ALL_LIKE_SUCCESS:
    case likeConstants.GET_LIKES_BY_PARENT_SUCCESS:
    case likeConstants.NEW_LIKE_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case likeConstants.GET_ALL_LIKE_ERROR:
    case likeConstants.GET_LIKES_BY_PARENT_ERROR:
    case likeConstants.NEW_LIKE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
};

const byId = (state = {}, action) => {
  switch (action.type) {
    case likeConstants.GET_ALL_LIKE_SUCCESS:
      return action.likes.reduce((likeObj, like) => {
        likeObj[like._id] = like;
        return likeObj;
      }, {});
    case likeConstants.GET_LIKES_BY_PARENT_SUCCESS:
      let newLikes = action.likes.reduce((likeObj, like) => {
        likeObj[like._id] = like;
        return likeObj;
      }, {});
      return {
        ...state,
        ...newLikes,
      };
    case likeConstants.NEW_LIKE_SUCCESS:
      return {
        ...state,
        [action.like._id]: action.like,
      };
    default:
      return state;
  }
};

const allIds = (state = [], action) => {
  switch (action.type) {
    case likeConstants.GET_ALL_LIKE_SUCCESS:
      console.log(state.likes);
      return action.likes.map((like) => like._id);
    case likeConstants.GET_LIKES_BY_PARENT_SUCCESS:
      return state.concat(action.likes.map((like) => like._id));
    case likeConstants.NEW_LIKE_SUCCESS:
      return [...state, action.like._id];
    default:
      return state;
  }
};

const likes = combineReducers({
  byId,
  allIds,
  likeReducer,
});

export const getAllLikes = (state) =>
  state.likes.allIds.map((id) => state.likes.byId[id]);

export const getLikesByParent = (state, parentId) =>
  getAllLikes(state).filter((like) => like.parent === parentId);

export const getUpvotesAndDownvotes = (state, parentId) => {
  const likes = getLikesByParent(state, parentId);
  return {
    upvotes: likes.filter((like) => like.positive === true).length,
    downvotes: likes.filter((like) => like.positive !== true).length,
  };
};

export default likes;
