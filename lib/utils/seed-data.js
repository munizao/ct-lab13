const Card = require('../models/Card');
const moment = require('moment');

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
  const fs = require('fs').promises;
  return fs.readFile(__dirname + '/../../json/scryfall-default-cards.json')
    .then(rawdata => JSON.parse(rawdata))
    .then(cards => {
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
      return fixedCards;
    })
    .then(cards => Card.create(cards));
}



module.exports = { seedData, parseTypeLine };


