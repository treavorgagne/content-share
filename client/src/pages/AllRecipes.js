import React, { useState, useEffect } from 'react';
import { Box, Text, Spinner } from '@chakra-ui/react';
import { RecipeImg } from './RecipeImg.js';

import axios from 'axios';
const axiosClient = axios.create({
  baseURL: 'http://localhost:8000',
});

export function AllRecipes() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    axiosClient
      .get('/allRecipes')
      .then(response => {
        setRecipes(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  if (recipes.length > 0) {
    return recipes.map(recipe => {
      return (
        <Box key={recipe.name}>
          <Text>{recipe.name}</Text>
          <RecipeImg imageKey={recipe.imageKey} />
        </Box>
      );
    });
  } else {
    return (
      <Box>
        <Spinner />
      </Box>
    );
  }
}
