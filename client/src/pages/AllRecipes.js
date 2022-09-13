import React, { useState, useEffect } from 'react';
import { Box, Text, Spinner } from '@chakra-ui/react';

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
          <Text>
            {recipe.name} {recipe._id}
          </Text>
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
