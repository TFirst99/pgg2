const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const addBehaviorRoute = require('./src/routes/addBehavior');
const earningsRoute = require('./src/routes/earnings');
const finRoute = require('./src/routes/fin');
const getRoute = require('./src/routes/get');
const roundRedirectRoute = require('./src/routes/roundRedirect');
const statusRoute = require('./src/routes/status');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api', addBehaviorRoute);
app.use('/api', earningsRoute);
app.use('/api', finRoute);
app.use('/api', getRoute);
app.use('/api', roundRedirectRoute);
app.use('/api', statusRoute);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;