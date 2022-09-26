import React, { useState, useEffect } from 'react';
import {
  Box,
  FormControl,
  Select,
  FormLabel,
  Stack,
  Button,
  Input,
  HStack,
  Tbody,
  Thead,
  TableContainer,
  Tr,
  Th,
  Td,
  Table,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';
const axiosClient = axios.create({
  baseURL: 'http://localhost:8000',
});

export function AddRecipe() {
  // recipe name state
  const [recipe, setRecipe] = useState('');

  // recipe image state
  const [recipeImgName, setRecipeImgName] = useState('');
  const [recipeImg, setRecipeImg] = useState();

  // recipe directions state list
  const [directions, setDirections] = useState([]);
  const [step, setStep] = useState('');

  // recipe ingredients state list object
  const [ingredients, setIngredients] = useState([]);
  const [ingredientOption, setIngredientOption] = useState(true);
  const [ingredientAmount, setIngredientAmount] = useState(1);
  const [ingredientUnit, setIngredientUnit] = useState('tbs');
  const [ingredientName, setIngredientName] = useState('');

  // for poppup banner
  const toast = useToast();

  // on load use effect
  useEffect(() => {
    const savedStateDirections = window.localStorage.getItem('directions');
    if (savedStateDirections !== null)
      setDirections(JSON.parse(savedStateDirections));

    const savedStateIngredients = window.localStorage.getItem('ingredients');
    if (savedStateIngredients !== null)
      setIngredients(JSON.parse(savedStateIngredients));

    const recipeState = window.localStorage.getItem('recipe');
    if (recipeState !== null) setRecipe(recipeState);
  }, []);

  // use effect to set locale storage when any of the form data changes
  useEffect(() => {
    const newIngredient = JSON.stringify([...ingredients]);
    localStorage.setItem('ingredients', newIngredient);
  }, [ingredients]);

  useEffect(() => {
    const newDirections = JSON.stringify([...directions]);
    localStorage.setItem('directions', newDirections);
  }, [directions]);

  useEffect(() => {
    localStorage.setItem('recipe', recipe);
  }, [recipe]);

  // function to handle when new ingredient is added to the list
  const handleIngredientAdd = () => {
    if (ingredientName === '') {
      toast({
        title: 'Missing Ingredient Name',
        description: `Field must be complete`,
        status: 'warning',
        duration: 6000,
        isClosable: true,
      });

      return;
    }

    if (ingredientAmount === '') {
      toast({
        title: 'Missing Ingredient Amount',
        description: `Field must be complete`,
        status: 'warning',
        duration: 6000,
        isClosable: true,
      });
      return;
    }

    setIngredients(prev => {
      return [
        {
          required: ingredientOption,
          amount: ingredientAmount,
          ingredient: ingredientName,
          metric: ingredientUnit,
        },
        ...prev,
      ];
    });
    document.getElementById('ingredientName').value = '';
    setIngredientName('');
  };

  const handleOptionChange = ({ target }) => {
    if (target.value === 'required') {
      setIngredientOption(true);
    } else {
      setIngredientOption(false);
    }
  };

  const handleAmountChange = ({ target }) => {
    setIngredientAmount(target.value);
  };

  const handleUnitChange = ({ target }) => {
    setIngredientUnit(target.value);
  };

  const handleNameChange = ({ target }) => {
    setIngredientName(target.value);
  };

  const handleImageChange = async e => {
    const file = e.target.files[0];
    const fileSize = (file.size / 1024 / 1024).toFixed(2);
    if (fileSize > 1.0) {
      toast({
        title: 'Warning',
        description: `Image cannot be larger than 1 MB.`,
        status: 'warning',
        duration: 9000,
        isClosable: true,
      });
      e.target.value = null;
    } else {
      console.log(file);
      setRecipeImgName(file.name);
      setRecipeImg(file);
    }
  };

  const handleIngredientDelete = targetIndex => {
    setIngredients(prev => {
      return prev.filter((_, index) => index !== targetIndex);
    });
  };

  const handleStepChange = ({ target }) => {
    setStep(target.value);
  };

  const handleAddDirection = () => {
    if (step !== '') {
      setDirections(prev => {
        return [...prev, step];
      });
      document.getElementById('step').value = '';
      setStep('');
    }
  };

  const handleDirectionsDelete = targetIndex => {
    setDirections(prev => {
      return prev.filter((_, index) => index !== targetIndex);
    });
  };

  const handleRecipeName = ({ target }) => {
    setRecipe(target.value);
  };

  const handleSubmit = () => {
    if (ingredients.length === 0) {
      toast({
        title: 'Warning',
        description: `Failed to add recipe. Ingredients list cannot be empty.`,
        status: 'warning',
        duration: 9000,
        isClosable: true,
      });
    } else if (directions.length === 0) {
      toast({
        title: 'Warning',
        description: `Failed to add recipe. Directions list cannot be empty.`,
        status: 'warning',
        duration: 9000,
        isClosable: true,
      });
    } else if (recipeImg === undefined) {
      toast({
        title: 'Warning',
        description: `Failed to add recipe. Please set recipe image.`,
        status: 'warning',
        duration: 9000,
        isClosable: true,
      });
    } else if (recipe === '') {
      toast({
        title: 'Warning',
        description: `Failed to add recipe. Recipe name cannot be empty.`,
        status: 'warning',
        duration: 9000,
        isClosable: true,
      });
    } else {
      // axiosClient
      //   .post('/addRecipe', {
      //     recipe: recipe,
      //     ingredients: ingredients,
      //     directions: directions,
      //     recipeImgName: recipeImgName,
      //   })
      //   .then(res => {
      //     if (res.status === 200) {
      //       toast({
      //         title: 'Recipe created.',
      //         description: `${recipe} added to recipes. Feel free to add more.`,
      //         status: 'success',
      //         duration: 9000,
      //         isClosable: true,
      //       });
      //       document.getElementById('step').value = '';
      //       document.getElementById('ingredientName').value = '';
      //       document.getElementById('recipeName').value = '';
      //       setStep('');
      //       setRecipe([]);
      //       setIngredients([]);
      //       setDirections([]);
      //       setIngredientName('');
      //     }
      //   })
      //   .then(() => {
      console.log(recipeImg);
      axiosClient
        .post('/uploadImage', {
          file: recipeImg,
          fileName: recipeImgName,
        })
        .then(res => {
          if (res.status === 200) {
            toast({
              title: 'Recipe Image Uploaded.',
              description: `${recipeImgName} image uploaded to AWS S3 bucket successfully. ${res.data}`,
              status: 'success',
              duration: 9000,
              isClosable: true,
            });
            document.getElementById('recipeImage').value = null;
            setRecipeImg();
            setRecipeImgName('');
          }
        })
        .catch(err => {
          console.log(err);
        });
      // });
    }
  };

  return (
    <Stack
      direction={['column', 'column', 'column', 'row']}
      align="top"
      w="95%"
      mx={'auto'}
      spacing={4}
    >
      <Box w={'100%'}>
        <form onSubmit={handleSubmit}>
          <FormControl>
            <Stack>
              <FormLabel>Recipe Name</FormLabel>
              <Input
                isRequired
                w="100%"
                onChange={handleRecipeName}
                type={'text'}
                name="recipeName"
                id="recipeName"
                placeholder="Tacos"
                value={recipe}
              ></Input>
              <FormLabel>Ingredients</FormLabel>
              <HStack>
                <Select
                  isRequired
                  w={'33%'}
                  onChange={handleOptionChange}
                  name="ingredientOption"
                  id="ingredientOption"
                >
                  <option value="required">required</option>
                  <option value="optional">optional</option>
                </Select>
                <Input
                  isRequired
                  w="33%"
                  value={ingredientAmount}
                  onChange={handleAmountChange}
                  type={'number'}
                  name="ingredientAmount"
                  id="ingredientAmount"
                />
                <Select
                  value={ingredientUnit}
                  isRequired
                  w={'34%'}
                  onChange={handleUnitChange}
                  name="ingredientUnit"
                  id="ingredientUnit"
                >
                  <option value="tbs">tbs</option>
                  <option value="tps">tps</option>
                  <option value="mL">mL</option>
                  <option value="L">L</option>
                  <option value="grams">grams</option>
                  <option value="kilograms">kilograms</option>
                  <option value="oz">oz</option>
                  <option value="pinch">pinch</option>
                  <option value="dash">dash</option>
                  <option value="small">small</option>
                  <option value="medium">medium</option>
                  <option value="large">large</option>
                  <option value=""></option>
                </Select>
              </HStack>
              <Input
                w="100%"
                onChange={handleNameChange}
                type={'text'}
                name="ingredientName"
                id="ingredientName"
                placeholder="Salt and Pepper"
              />
              <Button fontSize={'18px'} onClick={handleIngredientAdd}>
                {' '}
                Add Ingredient{' '}
              </Button>
              <FormLabel>Directions</FormLabel>
              <Input
                w="100%"
                onChange={handleStepChange}
                type={'text'}
                name="step"
                id="step"
                placeholder="Direction Instructions"
              />
              <Button fontSize={'18px'} onClick={handleAddDirection}>
                Add Direction
              </Button>

              <FormLabel>Recipe Image</FormLabel>
              <input
                w="100%"
                type={'file'}
                name="moneyshot"
                id="recipeImage"
                accept=".png, .jpg, .jpeg"
                onChange={handleImageChange}
              />

              <Button
                fontSize={'18px'}
                colorScheme={'green'}
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </Stack>
          </FormControl>
        </form>
      </Box>
      <Box w={'100%'}>
        <Stack direction={'column'}>
          <FormLabel> Ingredient List</FormLabel>
          <Box
            maxH={'35vh'}
            overflowY="auto"
            __css={{
              '&::-webkit-scrollbar': { w: '2' },
              '&::-webkit-scrollbar-track': { w: '6' },
              '&::-webkit-scrollbar-thumb': {
                borderRadius: '10',
                bg: 'blue.200',
              },
            }}
          >
            <TableContainer>
              <Table size={'sm'} variant="striped" colorScheme="teal">
                <Thead>
                  <Tr>
                    <Th>Required</Th>
                    <Th isNumeric>Amount</Th>
                    <Th>Unit</Th>
                    <Th>Ingredient</Th>
                    <Th isNumeric>Delete</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {ingredients.map((ingredient, index) => (
                    <Tr key={ingredient.ingredient + index}>
                      <Td>{ingredient.required ? 'Yes' : 'No'}</Td>
                      <Td isNumeric>{ingredient.amount}</Td>
                      <Td>{ingredient.metric}</Td>
                      <Td>{ingredient.ingredient}</Td>
                      <Td isNumeric>
                        <Button
                          size={'xs'}
                          colorScheme={'red'}
                          onClick={() => handleIngredientDelete(index)}
                        >
                          X
                        </Button>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
          <FormLabel> Recipe Directions</FormLabel>
          <Box
            maxH={'35vh'}
            overflowY="auto"
            __css={{
              '&::-webkit-scrollbar': { w: '2' },
              '&::-webkit-scrollbar-track': { w: '6' },
              '&::-webkit-scrollbar-thumb': {
                borderRadius: '10',
                bg: 'blue.200',
              },
            }}
          >
            <TableContainer>
              <Table size={'sm'} variant="striped" colorScheme="teal">
                <Thead>
                  <Tr>
                    <Th>Step #</Th>
                    <Th>Direction</Th>
                    <Th isNumeric>Delete</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {directions.map((step, index) => (
                    <Tr key={step}>
                      <Td>{index + 1}</Td>
                      <Td>{step}</Td>
                      <Td isNumeric>
                        <Button
                          size={'xs'}
                          colorScheme={'red'}
                          onClick={() => handleDirectionsDelete(index)}
                        >
                          X
                        </Button>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
        </Stack>
      </Box>
    </Stack>
  );
}
