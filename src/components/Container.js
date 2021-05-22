import React from 'react';
import { Flex } from '@chakra-ui/core';

const Container = ({ children }) => {
  console.log('RERENDER');

  return (
    <Flex
      ml="auto"
      mr="auto"
      mt="0.4rem"
      mb="0.2rem"
      bg="transparentwhite.300"
      // opacity="20%"
      borderRadius="md"
      maxWidth="46rem"
      minHeight="100vh"
      pt="0.5rem"
      pb="2rem"
      pl="1.25rem"
      pr="1.25rem"
      alignSelf="center"
      flexDir="column"
    >
      {children}
    </Flex>
  );
};

export default Container;
