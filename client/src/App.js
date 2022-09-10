import React, { useState } from 'react';
import {
  ChakraProvider,
  Grid,
  Box,
  VStack,
  theme,
  FormControl,
  Select,
  FormLabel,
  Stack,
  Button,
  Input,
  Heading,
  HStack,
  Tbody,
  Thead,
  TableContainer,
  Tr,
  Th,
  Td,
  Table,
} from '@chakra-ui/react';
import { Header } from './components/Header';

function App() {
  const [directions, setDirections] = useState([]);
  const [step, setStep] = useState('');

  const [ingredients, setIngredients] = useState([]);
  const [ingredientOption, setIngredientOption] = useState(true);
  const [ingredientAmount, setIngredientAmount] = useState(1);
  const [ingredientUnit, setIngredientUnit] = useState('tbs');
  const [ingredientName, setIngredientName] = useState('');

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

  const handleSubmit = () => {
    console.log('SUBMIT MOTHER FUCKERS');
  };

  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <VStack>
            <Header />
            <Box w={'70%'} mx={'auto'}>
              <form onSubmit={handleSubmit}>
                <FormControl>
                  <Stack>
                    <FormLabel>Type</FormLabel>
                    <Select isRequired placeholder="Select Recipe Type">
                      <option>Dinner</option>
                      <option>Lunch</option>
                      <option>Breakfast</option>
                      <option>Snack</option>
                    </Select>
                    <FormLabel>Ingredients</FormLabel>
                    <HStack>
                      <Select
                        isRequired
                        w={'20%'}
                        onChange={handleOptionChange}
                        name="ingredientOption"
                        id="ingredientOption"
                      >
                        <option value="required">required</option>
                        <option value="optional">optional</option>
                      </Select>
                      <Input
                        isRequired
                        w="10%"
                        value={ingredientAmount}
                        onChange={handleAmountChange}
                        type={'number'}
                        name="ingredientAmount"
                        id="ingredientAmount"
                      />
                      <Select
                        value={ingredientUnit}
                        isRequired
                        w={'20%'}
                        onChange={handleUnitChange}
                        name="ingredientUnit"
                        id="ingredientUnit"
                      >
                        <option value="tbs">tbs</option>
                        <option value="tps">tps</option>
                        <option value="mL">mL</option>
                        <option value="L">L</option>
                        <option value="grams">grams</option>
                        <option value="pinch">pinch</option>
                        <option value="dash">dash</option>
                        <option value="small">small</option>
                        <option value="medium">medium</option>
                        <option value="large">large</option>
                        <option value=""></option>
                      </Select>
                      <Input
                        isRequired
                        w="100%"
                        onChange={handleNameChange}
                        type={'text'}
                        name="ingredientName"
                        id="ingredientName"
                        placeholder="Ingredient Name"
                      />
                    </HStack>
                    <Button fontSize={'18px'} onClick={handleIngredientAdd}>
                      {' '}
                      Add Ingredient{' '}
                    </Button>
                    <Box mx={'auto'} textAlign="left">
                      <Stack w={'100%'} direction={'column'}>
                        <Heading
                          textAlign={'left'}
                          fontWeight={'500'}
                          fontSize={18}
                          color={'teal'}
                        >
                          Ingredient List
                        </Heading>

                        <TableContainer>
                          <Table
                            size={'sm'}
                            variant="striped"
                            colorScheme="teal"
                          >
                            <Thead>
                              <Tr>
                                <Th>Required</Th>
                                <Th isNumeric>Amount</Th>
                                <Th>Unit</Th>
                                <Th>Ingredient</Th>
                                <Th>Delete</Th>
                              </Tr>
                            </Thead>
                            <Tbody>
                              {ingredients.map((ingredient, index) => (
                                <Tr>
                                  <Td>{ingredient.required ? 'Yes' : 'No'}</Td>
                                  <Td isNumeric>{ingredient.amount}</Td>
                                  <Td>{ingredient.metric}</Td>
                                  <Td>{ingredient.ingredient}</Td>
                                  <Td>
                                    <Button
                                      size={'sm'}
                                      colorScheme={'red'}
                                      onClick={() =>
                                        handleIngredientDelete(index)
                                      }
                                      justifySelf={'right'}
                                    >
                                      X
                                    </Button>
                                  </Td>
                                </Tr>
                              ))}
                            </Tbody>
                          </Table>
                        </TableContainer>
                      </Stack>

                      <Stack>
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
                        <Heading
                          textAlign={'left'}
                          fontWeight={'500'}
                          fontSize={18}
                          color={'teal'}
                        >
                          Recipe Directions
                        </Heading>
                        <TableContainer>
                          <Table
                            size={'sm'}
                            variant="striped"
                            colorScheme="teal"
                          >
                            <Thead>
                              <Tr>
                                <Th>Step</Th>
                                <Th>Direction</Th>
                                <Th>Delete</Th>
                              </Tr>
                            </Thead>
                            <Tbody>
                              {directions.map((step, index) => (
                                <Tr>
                                  <Td>{index + 1}</Td>
                                  <Td>{step}</Td>
                                  <Td isNumeric>
                                    <Button
                                      size={'sm'}
                                      colorScheme={'red'}
                                      onClick={() =>
                                        handleDirectionsDelete(index)
                                      }
                                      justifySelf={'right'}
                                    >
                                      X
                                    </Button>
                                  </Td>
                                </Tr>
                              ))}
                            </Tbody>
                          </Table>
                        </TableContainer>
                      </Stack>
                    </Box>
                  </Stack>
                </FormControl>
              </form>
            </Box>
          </VStack>
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;
