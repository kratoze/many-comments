import { combineReducers } from 'redux';

import { commentConstants } from '../constants/comments.constants';

const initialState = {
  loading: false,
  error: null,
};

// function addComment(state, action) {
//   const { parent } = action;
//
//   let hasFoundParent = false;
//   let currentParent = parent;
//
//   while(!hasFoundParent) {
//     if(state.posts)
//   }
//
// }

export const commentReducer = (state = initialState, action) => {
  switch (action.type) {
    case commentConstants.GET_ALL_COMMENTS_REQUEST:
    case commentConstants.GET_COMMENTS_BY_PARENT_REQUEST:
    case commentConstants.NEW_COMMENT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case commentConstants.GET_ALL_COMMENTS_SUCCESS:
    case commentConstants.GET_COMMENTS_BY_PARENT_SUCCESS:
    case commentConstants.NEW_COMMENT_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case commentConstants.GET_ALL_COMMENTS_ERROR:
    case commentConstants.GET_COMMENTS_BY_PARENT_ERROR:
    case commentConstants.NEW_COMMENT_ERROR:
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
    case commentConstants.GET_ALL_COMMENTS_SUCCESS:
      return action.comments.reduce((commentObj, comment) => {
        commentObj[comment._id] = comment;
        return commentObj;
      }, {});
    case commentConstants.GET_COMMENTS_BY_PARENT_SUCCESS:
      let newComments = action.comments.reduce((commentObj, comment) => {
        commentObj[comment._id] = comment;
        return commentObj;
      }, {});
      return {
        ...state,
        ...newComments,
      };
    case commentConstants.NEW_COMMENT_SUCCESS:
      return {
        ...state,
        [action.comment._id]: action.comment,
      };
    default:
      return state;
  }
};

const allIds = (state = [], action) => {
  switch (action.type) {
    case commentConstants.GET_ALL_COMMENTS_SUCCESS:
      return action.comments.map((comment) => comment._id);
    case commentConstants.GET_COMMENTS_BY_PARENT_SUCCESS:
      return state.concat(action.comments.map((comment) => comment.id));
    case commentConstants.NEW_COMMENT_SUCCESS:
      return [...state, action.comment._id];
    default:
      return state;
  }
};

const comments = combineReducers({
  byId,
  allIds,
  commentReducer,
});

export const getAllComments = (state) =>
  state.comments.allIds.map((id) => state.comments.byId[id]);

export const getCommentsByParent = (state, parentId) =>
  getAllComments(state).filter((comment) => comment.parent === parentId);

export default comments;
