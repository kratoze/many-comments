import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider, CSSReset } from '@chakra-ui/core';
import { Global } from '@emotion/core';

import store from './store/configureStore.js';
import customTheme from './theme/theme';

import { Container, NavBar, PostForm, PostList } from './components';

const App = () => (
  <Provider store={store}>
    <ThemeProvider theme={customTheme}>
      <Global
        styles={{
          body: {
            background:
              'linear-gradient(-45deg, rgb(255, 217, 249), rgb(209, 248, 255))',
          },
        }}
      />
      <CSSReset />
      <Container>
        <NavBar />
        <PostForm />
        <PostList />
      </Container>
    </ThemeProvider>
  </Provider>
);

export default App;
