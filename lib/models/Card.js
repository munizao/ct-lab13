const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: String,
  set: String,
  setType: String,
  cmc: Number,
  releaseDate: Date,
  types: [String],
  subtypes: [String],
  colors: [String]
});

schema.statics.getSubtypes = function(page, perPage, order = -1) {
  return this.aggregate(
    [
      {
        '$unwind': {
          'path': '$subtypes'
        }
      }, {
        '$group': {
          '_id': '$subtypes', 
          'total': {
            '$sum': 1
          }, 
          'avgCmc': {
            '$avg': '$cmc'
          }
        }
      }, {
        '$sort': {
          'total': order
        }
      }, {
        '$skip': (page - 1) * perPage 
      }, {
        '$limit': perPage
      }
    ]
  );
};

schema.statics.getSets = function(page, perPage, order = -1) {
  return this.aggregate(
    [
      {
        '$match': {
          '$or': [
            {
              'setType': 'expansion'
            }, {
              'setType': 'core'
            }
          ]
        }
      }, {
        '$group': {
          '_id': '$set', 
          'total': {
            '$sum': 1
          }, 
          'avgCmc': {
            '$avg': '$cmc'
          }, 
          'maxCmc': {
            '$max': '$cmc'
          }, 
          'releaseDate': {
            '$min': '$releaseDate'
          }
        }
      }, {
        '$sort': {
          'releaseDate': order
        }
      }, {
        '$skip': (page - 1) * perPage 
      }, {
        '$limit': perPage
      }
    ]
  );
};

module.exports = mongoose.model('Card', schema);
