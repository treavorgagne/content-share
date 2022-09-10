const { MongoClient } = require('mongodb');
const uri = `mongodb+srv://${process.env.MONGO_DB}:${process.env.MONGO_PASSWORD}@contentcluster.vfir88b.mongodb.net/?retryWrites=true&w=majority`;
const mongoClient = new MongoClient(uri);

module.exports = mongoClient;
