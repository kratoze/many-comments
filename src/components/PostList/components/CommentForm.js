import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Textarea } from '@chakra-ui/core';

import { startAddComment } from '../../../actions/comment.js';

const CommentForm = ({ parentId }) => {
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  const handleChange = (event) => setText(event.target.value);

  const handleSumbit = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      console.log(text);
      dispatch(startAddComment(parentId, text));
      setText('');
    }
  };

  return (
    <>
      <Textarea
        placeholder="Add a comment..."
        p="1rem"
        minHeight="1rem"
        h="auto"
        // resize="none"
        h="3rem"
        variant="unstyled"
        bg="transparentwhite.600"
        value={text}
        onChange={handleChange}
        onKeyPress={handleSumbit}
      ></Textarea>
    </>
  );
};

export default CommentForm;
