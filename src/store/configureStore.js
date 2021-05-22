import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import posts from '../reducers/post.js';
import comments from '../reducers/comment.js';
import likes from '../reducers/like.js';
import { userReducer } from '../reducers/user.js';

const reducers = combineReducers({
  posts: posts,
  comments: comments,
  likes: likes,
  users: userReducer,
});

const store = createStore(reducers, compose(applyMiddleware(thunk)));

export default store;
