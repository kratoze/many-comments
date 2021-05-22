import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Flex, Text, Button } from '@chakra-ui/core';

import { startLogout } from '../../../actions/user.js';

const LogoutButton = () => {
  const dispatch = useDispatch();

  return (
    <Button
      width="5rem"
      variantColor="pink"
      variant="ghost"
      onClick={() => dispatch(startLogout())}
    >
      Logout
    </Button>
  );
};

export default LogoutButton;
