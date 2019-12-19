const { Router } = require('express');
const Card = require('../models/Card');

module.exports = Router()
  .post('/', (req, res, next) => {
    Card
      .create(req.body)
      .then(movie => res.send(movie))
      .catch(next);
  });

