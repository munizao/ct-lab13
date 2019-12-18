const Card = require('./models/card');
const moment = require('moment');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/cards', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
});

const fs = require('fs').promises;

fs.readFile(__dirname + '/../../json/scryfall-default-cards.json')
  .then(rawdata => JSON.parse(rawdata))
  .then(cards => {
    cards.map(card => {
      Card.create({
        name: card.name,
        set: card.set,
        setType: card.set_type,
        cmc: card.cmc,
        releaseDate: moment(card.released_at, 'YYYY-MM-DD').toISOString(),
        typeLine: card.type_line
      });
    });
  });


