import React, { useState, useEffect } from 'react';
import {
  Box,
  Text,
  Spinner,
  Grid,
  GridItem,
  Stack,
  VStack,
} from '@chakra-ui/react';
import { RecipeImg } from '../components/RecipeImg.js';

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
    return (
      <Stack
        direction={'row'}
        justifyContent="space-around"
        align="top"
        w="95%"
        mx={'auto'}
        spacing={4}
      >
        <Grid
          templateColumns={[
            'repeat(1, 1fr)',
            'repeat(2, 1fr)',
            'repeat(2, 1fr)',
            'repeat(4, 1fr)',
          ]}
          gap={6}
        >
          {recipes.map(recipe => {
            return (
              <div key={recipe.name}>
                <Text>{recipe.name}</Text>
                <GridItem w="100%" h="100%">
                  <RecipeImg imageKey={recipe.imageKey} />
                </GridItem>
              </div>
            );
          })}
        </Grid>
      </Stack>
    );
  } else {
    return (
      <Box>
        <Spinner />
      </Box>
    );
  }
}
