const { MongoClient } = require('mongodb');
const uri =
  'mongodb+srv://treavorgagne:pkJBZK7vQ5Zp0a1A@contentcluster.vfir88b.mongodb.net/?retryWrites=true&w=majority';
const mongoClient = new MongoClient(uri);

module.exports = mongoClient;
