require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Card = require('../lib/models/Card');


describe('cards routes', () => {
  let card;
  let card1;
  let card2;

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
    card1 = await Card.create({
      name: 'Card 1',
      set: 'lol',
      setType: 'expansion',
      cmc: 3,
      releaseDate: '2020-01-24T08:00:00.000Z',
      types: ['Creature'],
      subtypes: ['Human', 'Warrior'],
      colors: ['G']
    });
    card2 = await Card.create({
      name: 'Card 2',
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

  it('gets subtypes', () => {
    return request(app)
      .get('/api/v1/cards/subtypes/')
      .then(res => {
        expect(res.body).toEqual([
          {
            _id: 'Warrior',
            avgCmc: 3,
            total: 3,
          },
          {
            _id: 'Human',
            avgCmc: 3,
            total: 3,
          },
        ]);
      });
  });

  it('gets sets', () => {
    return request(app)
      .get('/api/v1/cards/sets/')
      .then(res => {
        expect(res.body).toEqual([{
          _id: 'lol',
          avgCmc: 3,
          maxCmc: 3,
          total: 3,
          releaseDate: '2020-01-24T08:00:00.000Z'
        }]);
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

  it('gets all cards', () => {
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
          },
          {
            _id: card1.id,

            name: 'Card 1',
            set: 'lol',
            setType: 'expansion',
            cmc: 3,
            releaseDate: '2020-01-24T08:00:00.000Z',
            types: ['Creature'],
            subtypes: ['Human', 'Warrior'],
            colors: ['G'],
            __v: 0

          },
          {
            _id: card2.id,
            name: 'Card 2',
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

  it('updates a card', () => {
    return request(app)
      .patch(`/api/v1/cards/${card.id}`)
      .send({ name: 'Bad Card' })
      .then(res => {
        expect(res.body).toEqual({
          _id: card.id,
          name: 'Bad Card',
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

  it('deletes a card', () => {
    return request(app)
      .delete(`/api/v1/cards/${card.id}`)
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
});
