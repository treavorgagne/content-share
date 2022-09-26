if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

var fs = require('fs');
const AWS = require('aws-sdk');
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
});

const bodyParser = require('body-parser');
const express = require('express');
const mongoClient = require('./assets/mongoClient.js');

const app = express();
const port = process.env.PORT || 8000;

async function getImage(imageKey) {
  const params = {
    Bucket: 'recipe-imgs',
    Key: imageKey,
  };
  const data = s3.getObject(params).promise();
  return data;
}

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

app.get('/', async (req, res) => {
  res.status(200).send('Hello World');
});

app.get('/getS3Image/:imageKey', async (req, res) => {
  console.log('app.get ' + req.params.imageKey);
  getImage(req.params.imageKey)
    .then(img => {
      let buf = Buffer.from(img.Body);
      let base64 = buf.toString('base64');
      res.send(base64);
    })
    .catch(error => {
      console.log('error');
      res.send({ error: error });
    });
});

app.get('/allRecipes', async (req, res) => {
  const collection = mongoClient.db('Recipes').collection('Dinner');
  const cursor = collection.find({});
  const recipes = await cursor.toArray();

  res.send(recipes);
  await cursor.close();
});

app.post('/uploadImage', async (req, res) => {
  // const blob = fs.readFileSync('./assets/test2.jpeg');
  const file = req.body.file;
  const fileName = req.body.fileName;
  console.log(file);

  // const uploadedImage = await s3
  //   .upload({
  //     Bucket: process.env.AWS_S3_BUCKET_NAME,
  //     Key: 'test2.jpeg',
  //     Body: blob,
  //   })
  //   .promise();

  if (file === '') {
    res.status(500).send('file empty' + file);
  } else {
    res.status(200).send('file received');
  }
});

app.post('/addRecipe', async (req, res) => {
  const meal = mongoClient.db('Recipes').collection('Dinner');

  const data = {
    name: req.body.recipe,
    directions: req.body.directions,
    ingredients: req.body.ingredients,
    recipeImgName: req.body.recipeImgName,
  };

  const result = await meal.insertOne(data);

  if (result.acknowledged === true) {
    res.status(200).send({ result: result });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
