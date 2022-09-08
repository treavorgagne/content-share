const express = require('express');
const mongoClient = require('./assets/mongoClient.js');

const app = express();
const port = 8000;

/**
 * Route to get the images of all the recipes for the home page.
 */
app.get('/', async (req, res) => {
  const collection = mongoClient
    .db('mongodbVSCodePlaygroundDB')
    .collection('sales');
  const items = collection.find({});
  const allPhotos = await items.toArray();
  res.send(allPhotos);
});

/**
 * Route to add a recipe to the mongo database.
 */
app.post('/add', async (req, res) => {
  const dinner = mongoClient.db('Recipes').collection('Dinner');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
