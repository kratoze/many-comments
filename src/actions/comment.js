import { commentConstants } from '../constants/comments.constants';

const getAllCommentsRequest = () => ({
  type: commentConstants.GET_ALL_COMMENTS_REQUEST,
});

const getAllCommentsSuccess = (comments) => ({
  type: commentConstants.GET_ALL_COMMENTS_SUCCESS,
  comments,
});

const getAllCommentsError = (error) => ({
  type: commentConstants.GET_ALL_COMMENTS_ERROR,
  error,
});

export const startGetAllComments = () => {
  return async (dispatch) => {
    dispatch(getAllCommentsRequest());
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/post/comment`,
        {
          method: 'GET',
        }
      );
      console.log(response);

      const data = await response.json();

      if (data.error) throw data.error;

      dispatch(getAllCommentsSuccess(data));
    } catch (err) {
      dispatch(getAllCommentsError(err));
    }
  };
};

const getCommentsByParentsRequest = () => ({
  type: commentConstants.GET_COMMENTS_BY_PARENT_REQUEST,
});

const getCommentsByParentSuccess = (comments) => ({
  type: commentConstants.GET_COMMENTS_BY_PARENT_SUCCESS,
  comments,
});

const getCommentsByParentError = (error) => ({
  type: commentConstants.GET_COMMENTS_BY_PARENT_ERROR,
  error,
});

export const startGetCommentsByParent = (parentId) => {
  return async (dispatch) => {
    dispatch(getCommentsByParentsRequest());
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/post/comment/${parentId}`,
        {
          method: 'GET',
        }
      );

      const data = await response.json();

      if (data.error) throw data.error;

      dispatch(getCommentsByParentSuccess(data));
    } catch (err) {
      dispatch(getCommentsByParentError(err));
    }
  };
};

const newCommentRequest = () => ({
  type: commentConstants.NEW_COMMENT_REQUEST,
});

const newCommentSuccess = (comment) => ({
  type: commentConstants.NEW_COMMENT_SUCCESS,
  comment,
});

const newCommentError = (error) => ({
  type: commentConstants.NEW_COMMENT_ERROR,
  error,
});

export const startAddComment = (parentId, text) => {
  return async (dispatch) => {
    dispatch(newCommentRequest());
    try {
      const { token } = JSON.parse(localStorage.getItem('auth'));
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/post/comment`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            auth: token,
          },
          body: JSON.stringify({ parentId, text }),
        }
      );
      const data = await response.json();

      if (data.error) throw data.error;

      dispatch(newCommentSuccess(data));
    } catch (err) {
      dispatch(newCommentError(err));
    }
  };
};
