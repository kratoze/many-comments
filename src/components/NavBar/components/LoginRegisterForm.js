import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Flex,
  Text,
  InputGroup,
  Input,
  ButtonGroup,
  Button,
  useToast,
} from '@chakra-ui/core';

import { startLogin, startSignup } from '../../../actions/user.js';
import LogoutButton from './LogoutButton';

const Login = () => {
  const [formUsername, setUsername] = useState('');
  const [formPassword, setPassword] = useState('');
  const username = useSelector((state) => {
    return state.users.username;
  });
  const error = useSelector((state) => state.users.error);
  const dispatch = useDispatch();
  const toast = useToast();
  useEffect(() => {
    if (error) {
      toast({
        description: error,
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  }, [error]);

  // useEffect(() => {
  //   console.log(username);
  // }, [username]);

  const renderLoginForm = () => {
    return (
      <Flex justifyContent="flex-end">
        <InputGroup size="sm" spacing={1}>
          <Input
            type="username"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </InputGroup>

        <ButtonGroup size="sm" spacing={1}>
          <Button
            width="5rem"
            variantColor="pink"
            variant="ghost"
            onClick={() => dispatch(startLogin(formUsername, formPassword))}
          >
            Login
          </Button>
          <Button
            width="5rem"
            variantColor="pink"
            variant="ghost"
            onClick={() => dispatch(startSignup(formUsername, formPassword))}
          >
            Register
          </Button>
        </ButtonGroup>
      </Flex>
    );
  };

  const renderLogoutButton = () => {
    return (
      <Flex alignItems="baseline" justifyContent="flex-end">
        <Text as="b" color="pink.500">
          Welcome {username}!
        </Text>
        <LogoutButton />
      </Flex>
    );
  };

  return username === null ? renderLoginForm() : renderLogoutButton();
};

export default Login;
