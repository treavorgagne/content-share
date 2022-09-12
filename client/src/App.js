import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  ChakraProvider,
  Box,
  VStack,
  theme,
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
  Checkbox,
} from '@chakra-ui/react';
import { Header } from './components/Header';

const axiosClient = axios.create({
  baseURL: 'http://localhost:8000',
});

function App() {
  const [recipe, setRecipe] = useState('');

  const [directions, setDirections] = useState([]);
  const [step, setStep] = useState('');

  const [ingredients, setIngredients] = useState([]);
  const [ingredientOption, setIngredientOption] = useState(true);
  const [ingredientAmount, setIngredientAmount] = useState(1);
  const [ingredientUnit, setIngredientUnit] = useState('tbs');
  const [ingredientName, setIngredientName] = useState('');

  useEffect(() => {
    const savedStateDirections = window.localStorage.getItem('directions');
    if (savedStateDirections !== null)
      setDirections(JSON.parse(savedStateDirections));

    const savedStateIngredients = window.localStorage.getItem('ingredients');
    if (savedStateIngredients !== null)
      setIngredients(JSON.parse(savedStateIngredients));

    const recipeState = window.localStorage.getItem('recipe');
    if (recipe !== null) setRecipe(recipeState);
  }, []);

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

  const handleIngredientAdd = () => {
    if (ingredientName !== '') {
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
    }
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
    axiosClient
      .post('/addRecipe', {
        recipe: recipe,
        ingredients: ingredients,
        directions: directions,
      })
      .then(response => {
        console.log(response);
      });
  };

  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" p={2}>
        <VStack maxH="100vh">
          <Header />
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
                    <FormLabel>Type</FormLabel>
                    <Stack justifyContent={'space-around'} direction="row">
                      <Checkbox size="lg" value="Dinner">
                        Dinner
                      </Checkbox>
                      <Checkbox size="lg" value="Lunch">
                        Lunch
                      </Checkbox>
                      <Checkbox size="lg" value="Breakfast">
                        Breakfast
                      </Checkbox>
                      <Checkbox size="lg" value="Snack">
                        Snack
                      </Checkbox>
                    </Stack>
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
                <Box maxH={'35vh'} overflow="scroll">
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
                <Box maxH={'35vh'} overflow="scroll">
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
        </VStack>
      </Box>
    </ChakraProvider>
  );
}

export default App;
