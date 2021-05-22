import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Flex, Icon, Collapse, Text } from '@chakra-ui/core';

import CommentForm from './CommentForm';
import { startAddLike, startGetLikesByParent } from '../../../actions/like';
import { getUpvotesAndDownvotes } from '../../../reducers/like';

const InteractionBar = ({ parentId }) => {
  const [show, setShow] = useState(false);
  const likes = useSelector((state) => getUpvotesAndDownvotes(state, parentId));
  const dispatch = useDispatch();
  console.log(likes);
  useEffect(() => {
    dispatch(startGetLikesByParent(parentId));
  }, [dispatch]);

  const handleCommentToggle = () => setShow(!show);

  return (
    <Flex
      bg="transparentwhite.500"
      flexDir="column"
      borderRadius="md"
      pt="5px"
      pb="5px"
    >
      <Flex w="100%" justifyContent="space-around">
        <Icon
          name="chevron-up"
          cursor="pointer"
          size="20px"
          onClick={() => dispatch(startAddLike(parentId, true))}
        />
        <Text>{likes.upvotes}</Text>
        <Icon
          name="chevron-down"
          cursor="pointer"
          size="20px"
          onClick={() => dispatch(startAddLike(parentId, false))}
        />
        <Text>{likes.downvotes}</Text>

        <Icon
          name="chat"
          cursor="pointer"
          size="20px"
          onClick={handleCommentToggle}
        />
      </Flex>
      <Collapse isOpen={show}>
        <CommentForm parentId={parentId} />
      </Collapse>
    </Flex>
  );
};

export default InteractionBar;
