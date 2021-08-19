//const mongoose = require('mongoose');

//const { database } = require('./keys');

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://ricky_2020:ricky_2020_01@cluster0.gw98i.mongodb.net/socialsuecia?retryWrites=true&w=majority";
const encodedURI = encodeURI(uri);
const mongoose = new MongoClient(encodedURI, { useNewUrlParser: true });
mongoose.connect(err => {
  const collection = mongoose.db("test").collection("devices");
  // perform actions on the collection object
  mongoose.close();
})
.then(db => console.log('DB is connected'))
.catch(err => console.error(err));

/*
mongoose.connect(database.URI, {
    useNewUrlParser: true
})
    .then(db => console.log('DB is connected'))
    .catch(err => console.error(err));
    */