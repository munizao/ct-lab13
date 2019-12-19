require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Card = require('../lib/models/Card');

describe('cards routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('creates a card', () => {
    return request(app)
      .post('/api/v1/movies')
      .send({
        name: 'Greatest Card',
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
});
