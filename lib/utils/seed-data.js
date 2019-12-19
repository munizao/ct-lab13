const Card = require('../models/Card');
const moment = require('moment');
const mongoose = require('mongoose');

function parseTypeLine(typeline, part) {
  if(typeof typeline === 'string' && typeline !== '') {
    const parts = typeline.split(' — ');
    if(part < parts.length) {
      return parts[part].split(' ');
    } 
  }  
  return [];
}

function seedData() {
  // mongoose.connect('mongodb://localhost:27017/cards', {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    // useFindAndModify: false,
    // useCreateIndex: true
  // });
  
  const fs = require('fs').promises;
  return fs.readFile(__dirname + '/../../json/scryfall-default-cards.json')
    .then(rawdata => JSON.parse(rawdata))
    .then(cards => {
      console.log(cards[0]);
      const fixedCards = cards.map(card => {
        return {
          name: card.name,
          set: card.set,
          setType: card.set_type,
          cmc: card.cmc,
          releaseDate: moment(card.released_at, 'YYYY-MM-DD').toISOString(),
          types: parseTypeLine(card.type_line, 0),
          subtypes: parseTypeLine(card.type_line, 1),
          colors: card.colors
        };
      });
      console.log(fixedCards[0]);
      return fixedCards;
    })
    .then(cards => Card.create(cards));
}



module.exports = { seedData, parseTypeLine };


