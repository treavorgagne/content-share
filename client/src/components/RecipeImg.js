import React, { useState, useEffect } from 'react';
import { Box, Spinner, Image } from '@chakra-ui/react';

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
    <Box w={'100%'} h={'100%'}>
      {recipeImg === '' ? (
        <Spinner />
      ) : (
        <Image
          boxSize="100%"
          alt={imageKey}
          src={`data:image/jpeg;charset=utf-8;base64,${recipeImg}`}
        />
      )}
    </Box>
  );
}
