const express = require('express');
const app = express();

app.use(express.json());

app.use('/api/v1/cards', require('./routes/cards'));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
