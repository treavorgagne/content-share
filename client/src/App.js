import React from 'react';
import { ChakraProvider, Box, VStack, theme } from '@chakra-ui/react';
import { Header } from './components/Header';
import { AddRecipe } from './pages/AddRecipe';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" p={2}>
        <VStack maxH="100vh">
          <Header />
          <AddRecipe />
        </VStack>
      </Box>
    </ChakraProvider>
  );
}

export default App;
