import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Flex, Text } from '@chakra-ui/core';

import { CommentItem } from './';
import { startGetCommentsByParent } from '../../../actions/comment.js';
import { getCommentsByParent } from '../../../reducers/comment.js';

const CommentList = ({ parentId }) => {
  const comments = useSelector((state) => getCommentsByParent(state, parentId));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startGetCommentsByParent(parentId));
  }, [dispatch]);

  console.log('rerender');
  return (
    <Flex flexDir="column" mt="0.2rem">
      {comments.length > 0
        ? comments.map((comment) => (
            <CommentItem
              key={comment._id}
              commentId={comment._id}
              text={comment.text}
              author={comment.author.username}
            />
          ))
        : ''}
    </Flex>
  );
};

export default CommentList;
