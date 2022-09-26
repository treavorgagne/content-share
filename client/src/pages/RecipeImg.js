import React, { useState, useEffect } from 'react';
import { Box, Spinner } from '@chakra-ui/react';

import axios from 'axios';
const axiosClient = axios.create({
  baseURL: 'http://localhost:8000',
});

export function RecipeImg(props) {
  const [recipeImg, setRecipeImg] = useState('');
  const [imageKey] = useState(props.imageKey);

  useEffect(() => {
    axiosClient
      .get(`/getS3Image/${imageKey}`)
      .then(response => {
        setRecipeImg(response.data);
      })
      .catch(error => {
        console.log('error:' + error);
      });
  }, []);

  return (
    <Box w={300} h={300}>
      {recipeImg === '' ? (
        <Spinner />
      ) : (
        <img
          alt={imageKey}
          src={`data:image/jpeg;charset=utf-8;base64,${recipeImg}`}
        />
      )}
    </Box>
  );
}
