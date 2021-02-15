if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const app = express();
const cors = require('cors');
const routes = require('./routes');
const errorHandling = require('./helpers/errorHandling');


app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routing
app.use(routes);

// Error handling
app.use(errorHandling);

module.exports = app;