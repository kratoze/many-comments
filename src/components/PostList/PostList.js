import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Flex } from '@chakra-ui/core';

import { startGetAllPosts } from '../../actions/post.js';

import { PostItem } from './components';
import { getAllPosts } from '../../reducers/post.js';

const PostList = () => {
  const posts = useSelector((state) => {
    return getAllPosts(state);
  });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(startGetAllPosts());
    return;
  }, [dispatch]);

  return (
    <Flex flexDir="column" mt="0.2rem">
      {posts.length > 0
        ? posts.map((post) => (
            <PostItem
              key={post._id}
              p="2rem"
              borderBottom="2px"
              borderColor="black"
              author={post.author.username}
              postId={post._id}
              text={post.text}
              comments={post.comments}
            ></PostItem>
          ))
        : 'No posts found'}
    </Flex>
  );
};

export default PostList;
