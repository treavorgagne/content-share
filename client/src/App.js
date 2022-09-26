import React from 'react';
import { ChakraProvider, Box, VStack, theme } from '@chakra-ui/react';
import { Header } from './components/Header';
import { AddRecipe } from './pages/AddRecipe';
import { AllRecipes } from './pages/AllRecipes.js';
import { RecipeImg } from './pages/RecipeImg.js';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" p={2}>
        <VStack maxH="100vh">
          <Header />
          {/* <AddRecipe /> */}
          <AllRecipes />
          {/* <RecipeImg imageKey="testImg.jpeg" />
          <RecipeImg imageKey="test2.jpeg" /> */}
        </VStack>
      </Box>
    </ChakraProvider>
  );
}

export default App;
