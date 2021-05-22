import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Flex,
  Textarea,
  Button,
  InputGroup,
  InputRightElement,
  useToast,
} from '@chakra-ui/core';

import { startCreatePost } from '../actions/post';

const PostForm = () => {
  const [text, setText] = useState('');
  const userId = useSelector((state) => state.users.id);
  const error = useSelector((state) => {
    console.log(state);
    return state.posts.error;
  });

  const dispatch = useDispatch();
  const toast = useToast();

  useEffect(() => {
    if (error) {
      toast({
        title: "Couldn't create post",
        description: error,
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  }, [error]);

  let sendPost = function () {
    dispatch(startCreatePost(userId, text));
    setText('');
    toast({
      title: 'You added a new post!',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  return userId !== null ? (
    <Flex mt="0.4rem" mb="0.4rem">
      <InputGroup width="100%">
        <Textarea
          resize="none"
          variant="unstyled"
          p="1rem"
          bg="transparentwhite.600"
          type="text"
          placeholder="Create a new post..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <InputRightElement top="50%" right="1%">
          <Button
            size="sm"
            alignSelf="flex-end"
            variant="ghost"
            onClick={sendPost}
          >
            Submit
          </Button>
        </InputRightElement>
      </InputGroup>
    </Flex>
  ) : (
    ''
  );
};

export default PostForm;
