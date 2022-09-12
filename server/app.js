if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

var bodyParser = require('body-parser');
const express = require('express');
const mongoClient = require('./assets/mongoClient.js');

const app = express();
const port = process.env.PORT || 8000;

// parse application/x-www-form-urlencoded & parse application/json
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// cors initialization
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

/**
 * Route to get the images of all the recipes for the home page.
 */
app.get('/', async (req, res) => {
  res.status(200).send('Hello World');
});

app.get('/dinner', async (req, res) => {
  const collection = mongoClient.db('Recipes').collection('Dinner');
  const cursor = collection.find({});
  const dinner = await cursor.toArray();
  res.send(dinner);
  await cursor.close();
});

app.get('/', async (req, res) => {
  const collection = mongoClient.db('Recipes').collection('Dinner');
  const cursor = collection.find({});
  const dinner = await cursor.toArray();
  res.send(dinner);
  await cursor.close();
});

/**
 * Route to add a recipe to the mongo database.
 * @param gets recipe name
 * @param gets list of directions
 * @param gets list of objects for every ingredients
 */
app.post('/addRecipe', async (req, res) => {
  const meal = mongoClient.db('Recipes').collection('Dinner');

  const data = {
    name: req.body.recipe,
    directions: req.body.directions,
    ingredients: req.body.ingredients,
  };

  const result = await meal.insertOne(data);

  if (result.acknowledged === true) {
    res.status(200).send({ result: result });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
