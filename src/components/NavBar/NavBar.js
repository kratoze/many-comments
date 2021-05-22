import React from 'react';
import { Flex, Image } from '@chakra-ui/core';

import { LoginRegisterForm } from './components';
import logo from '../../assets/comms_logo.png';

const NavBar = () => {
  return (
    <Flex justifyContent="space-between" alignItems="baseline">
      <Image ml="0.5rem" alignSelf="flex-start" src={logo} size="35px" />
      <LoginRegisterForm alignSelf="flex-end" />
    </Flex>
  );
};

export default NavBar;
