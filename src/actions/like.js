import { likeConstants } from '../constants/like.constants';

const getAllLikesRequest = () => ({
  type: likeConstants.GET_ALL_LIKE_REQUEST,
});

const getAllLikesSuccess = (likes) => ({
  type: likeConstants.GET_ALL_LIKE_SUCCESS,
  likes,
});

const getAllLikesError = (error) => ({
  type: likeConstants.GET_ALL_LIKE_ERROR,
  error,
});

export const startGetAllLikes = () => {
  return async (dispatch) => {
    dispatch(getAllLikesRequest());
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/post/like`,
        {
          method: 'GET',
        }
      );
      console.log(response);

      const data = await response.json();

      if (data.error) throw data.error;

      dispatch(getAllLikesSuccess(data));
    } catch (err) {
      dispatch(getAllLikesError(err));
    }
  };
};

const getLikesByParentRequest = () => ({
  type: likeConstants.GET_LIKES_BY_PARENT_REQUEST,
});

const getLikesByParentSuccess = (likes) => ({
  type: likeConstants.GET_LIKES_BY_PARENT_SUCCESS,
  likes,
});

const getLikesByParentError = (error) => ({
  type: likeConstants.GET_LIKES_BY_PARENT_ERROR,
  error,
});

export const startGetLikesByParent = (parentId) => {
  return async (dispatch) => {
    dispatch(getLikesByParentRequest());
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/post/like/${parentId}`,
        {
          method: 'GET',
        }
      );

      const data = await response.json();

      if (data.error) throw data.error;

      dispatch(getLikesByParentSuccess(data));
    } catch (err) {
      dispatch(getLikesByParentError(err));
    }
  };
};

const newLikeRequest = () => ({
  type: likeConstants.NEW_LIKE_REQUEST,
});

const newLikeSuccess = (like) => ({
  type: likeConstants.NEW_LIKE_SUCCESS,
  like,
});

const newLikeError = (error) => ({
  type: likeConstants.NEW_LIKE_ERROR,
  error,
});

export const startAddLike = (parentId, positive) => {
  return async (dispatch) => {
    dispatch(newLikeRequest());
    try {
      const { token } = JSON.parse(localStorage.getItem('auth'));
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/post/like`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            auth: token,
          },
          body: JSON.stringify({ parentId, positive }),
        }
      );
      const data = await response.json();

      if (data.error) throw data.error;

      dispatch(newLikeSuccess(data));
    } catch (err) {
      dispatch(newLikeError(err));
    }
  };
};
