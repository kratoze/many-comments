import React from 'react';
import { Box, Text } from '@chakra-ui/core';

import { InteractionBar, CommentList } from './';

const CommentItem = ({ commentId, text, author }) => {
  return (
    <Box
      bg="transparentwhite.500"
      mt="0.5rem"
      mb="0.5rem"
      p="1rem"
      borderRadius="md"
      boxShadow="inset -2px -2px 6px 1px #ffd9f9"
    >
      <Text>
        {text} by {author} Comment: {commentId}
      </Text>
      <InteractionBar parentId={commentId} />
      <CommentList parentId={commentId} />
    </Box>
  );
};

export default CommentItem;
