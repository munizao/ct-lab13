const { Router } = require('express');
const Card = require('../models/Card');

module.exports = Router()
  .post('/', (req, res, next) => {
    Card
      .create(req.body)
      .then(card => res.send(card))
      .catch(next);
  })

  .get('/subtypes', (req, res, next) => {
    const { page = 1, perPage = 40, order = -1 } = req.query;
    Card
      .getSubtypes(Number(page), Number(perPage), Number(order))
      .limit(Number(perPage))
      .skip((Number(page) - 1) * Number(perPage))
      .then(subtypes => res.send(subtypes))
      .catch(next);
  })

  .get('/sets', (req, res, next) => {
    const { page = 1, perPage = 40, order = -1 } = req.query;    
    Card
      .getSets(Number(page), Number(perPage), Number(order))
      .then(subtypes => res.send(subtypes))
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    Card
      .findById(req.params.id)
      .then(card => res.send(card))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    const { page = 1, perPage = 40 } = req.query;
    Card
      .find()
      .limit(Number(perPage))
      .skip((Number(page) - 1) * Number(perPage))
      .then(cards => res.send(cards))
      .catch(next);
  })

  .patch('/:id', (req, res, next) => {
    Card
      .findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(card => res.send(card))
      .catch(next);
  })

  .delete('/:id', (req, res, next) => {
    Card
      .findByIdAndDelete(req.params.id)
      .then(card => res.send(card))
      .catch(next);
  });

