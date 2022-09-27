import React from 'react';
import { ChakraProvider, Box, VStack, theme } from '@chakra-ui/react';
import { Header } from './components/Header';
import { AddRecipe } from './pages/AddRecipe';
import { AllRecipes } from './pages/AllRecipes.js';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Box textAlign="center" p={2}>
          <VStack maxH="100vh">
            <Header />
            <Routes>
              <Route>
                <Route path="/" index element={<AllRecipes />} />
                <Route path="/add" element={<AddRecipe />} />
              </Route>
            </Routes>
          </VStack>
        </Box>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
