const express = require('express');

const app = express();

// app.get('/', (req, res) => {
//     res.send('Hit roote route');
//   });

// Built in middleware
app.use(express.json());

// App routes
app.use('/api/v1/butterflies', require('./controllers/butterflies'));
app.use('/api/v1/cats', require('./controllers/cats'));
// app.use('/api/v1/chickens', require('./controllers/chickens'));
// app.use('/api/v1/rocks', require('./controllers/rocks'));
// app.use('/api/v1/flowers', require('./controllers/flowers'));

// Error handling & 404 middleware for when
// a request doesn't match any app routes
app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
