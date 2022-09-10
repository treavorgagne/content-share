if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const express = require('express');
const mongoClient = require('./assets/mongoClient.js');

const app = express();
const port = process.env.PORT || 8000;

/**
 * Route to get the images of all the recipes for the home page.
 */
app.get('/', async (req, res) => {
  const collection = mongoClient.db('Recipes').collection('Dinner');
  const cursor = collection.find({});
  const all = await cursor.toArray();
  res.send(all);
  await cursor.close();
});

app.get('/dinner:id', async (req, res) => {
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
 */
app.post('/add', async (req, res) => {
  const meal = mongoClient.db('Recipes').collection('Dinner');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
