const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: String,
  set: String,
  setType: String,
  cmc: Number,
  releaseDate: Date,
  typeLine: String
});

module.exports = mongoose.model('Card', schema);
