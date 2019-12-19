require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Card = require('../lib/models/Card');


describe('cards routes', () => {
  let card;

  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  beforeEach(async() => {
    card = await Card.create({
      name: 'Greatest Card',
      set: 'lol',
      setType: 'expansion',
      cmc: 3,
      releaseDate: '2020-01-24T08:00:00.000Z',
      types: ['Creature'],
      subtypes: ['Human', 'Warrior'],
      colors: ['G']
    });
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('creates a card', () => {
    return request(app)
      .post('/api/v1/cards')
      .send({
        name: 'Next Greatest Card',
        set: 'lol',
        setType: 'expansion',
        cmc: 3,
        releaseDate: '2020-01-24T08:00:00.000Z',
        types: ['Creature'],
        subtypes: ['Human', 'Warrior'],
        colors: ['G']
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'Next Greatest Card',
          set: 'lol',
          setType: 'expansion',
          cmc: 3,
          releaseDate: '2020-01-24T08:00:00.000Z',
          types: ['Creature'],
          subtypes: ['Human', 'Warrior'],
          colors: ['G'],
          __v: 0
        });
      });
  });

  it('gets a card by id', () => {
    return request(app)
      .get(`/api/v1/cards/${card.id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: card.id,
          name: 'Greatest Card',
          set: 'lol',
          setType: 'expansion',
          cmc: 3,
          releaseDate: '2020-01-24T08:00:00.000Z',
          types: ['Creature'],
          subtypes: ['Human', 'Warrior'],
          colors: ['G'],
          __v: 0
        });
      });
  });

  it('get all cards', () => {
    return request(app)
      .get('/api/v1/cards')
      .then(res => {
        expect(res.body).toEqual([
          {
            _id: card.id,
            name: 'Greatest Card',
            set: 'lol',
            setType: 'expansion',
            cmc: 3,
            releaseDate: '2020-01-24T08:00:00.000Z',
            types: ['Creature'],
            subtypes: ['Human', 'Warrior'],
            colors: ['G'],
            __v: 0
          }
        ]);
      });
  });
});
