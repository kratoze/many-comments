import React from 'react';
import { Box, Text } from '@chakra-ui/core';

import { InteractionBar, CommentList } from './';

const PostItem = ({ postId, author, text, comments }) => {
  return (
    <Box
      bg="transparentwhite.400"
      mt="0.5rem"
      mb="0.5rem"
      p="1rem"
      borderRadius="md"
    >
      <Text>
        {text} by {author} Post: {postId}
      </Text>
      <InteractionBar parentId={postId} />
      <CommentList parentId={postId} />
    </Box>
  );
};

export default PostItem;
