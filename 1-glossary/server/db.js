require("dotenv").config();
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

// 1. Use mongoose to establish a connection to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/' + process.env.DB_NAME);

// 2. Set up any schema and models needed by the app
const wordSchema = new mongoose.Schema({
  name: { type: String, unique: true, dropDubs: true },
  definition: String
});

const Word = mongoose.model('Word', wordSchema);

const retrieve = (callback) => {
  Word.find()
    .then(result => callback(null, result))
    .catch(err => callback(err, null))
};

const insert = (data, callback) => {
  Word.create(data)
  .then(result => callback(null, result))
  .catch(err => callback(err, null))
};

const update = (filter, data, callback) => {
  Word.findOneAndUpdate(filter, data)
    .then(result => callback(null, result))
    .catch(err => callback(err, null))
};

const remove = (filter, callback) => {
  Word.deleteOne(filter)
    .then((result) => callback(null, result))
    .catch(err => callback(err, null))
};

// 3. Export the models
module.exports.retrieve = retrieve;
module.exports.insert = insert;
module.exports.update = update;
module.exports.remove = remove;


// 4. Import the models into any modules that need them
