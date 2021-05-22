import { postConstants } from '../constants/post.constants';

export const getAllPostsRequest = () => ({
  type: postConstants.GET_ALL_POSTS_REQUEST,
});

export const getAllPostsSuccess = (posts) => ({
  type: postConstants.GET_ALL_POSTS_SUCCESS,
  posts,
});

export const getAllPostsError = (error) => ({
  type: postConstants.GET_ALL_POSTS_ERROR,
  error,
});

export const startGetAllPosts = () => {
  return async (dispatch) => {
    dispatch(getAllPostsRequest());
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/post`, {
        method: 'GET',
      });

      const data = await response.json();

      if (data.error) throw data.error;

      dispatch(getAllPostsSuccess(data));
    } catch (err) {
      dispatch(getAllPostsError(err));
    }
  };
};

export const createPost = (post) => ({
  type: 'CREATE_POST',
  post,
});

export const createPostRequest = () => ({
  type: postConstants.NEW_POST_REQUEST,
});

export const createPostSuccess = (post) => ({
  type: postConstants.NEW_POST_SUCCESS,
  post,
});

export const createPostError = (error) => ({
  type: postConstants.NEW_POST_ERROR,
  error,
});

export const startCreatePost = (id, text) => {
  return async (dispatch) => {
    dispatch(createPostRequest());
    try {
      const { token } = JSON.parse(localStorage.getItem('auth'));
      const response = await fetch(`${process.env.REACT_APP_API_URL}/post`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          auth: token,
        },
        body: JSON.stringify({
          author: id,
          text: text,
        }),
      });
      const data = await response.json();
      console.log(data);
      if (data.error) throw data.error;

      console.log(data);

      dispatch(createPostSuccess(data));
    } catch (err) {
      dispatch(createPostError(err));
    }
  };
};

export const deletePost = (post) => ({ type: 'DELETE_POST', post });

export const startDeletePost = (id) => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/post`, {
        method: 'DELETE',
        body: JSON.stringify({
          postId: id,
        }),
      });
      const data = await response.json();

      dispatch(deletePost(data));
    } catch (err) {
      throw new Error(err.response.data.error);
    }
  };
};
