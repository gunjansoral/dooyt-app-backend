const express = require('express');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swaggerOptions');
const bodyParser = require('body-parser');
require('dotenv').config();
const { readdirSync } = require('fs');
const { inject } = require("@vercel/analytics");

const PORT = process.env.PORT || '3000';

const app = express();
app.use(bodyParser.json());

// Database connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Database connected'))
  .catch(err => console.log(err));

// Routes - Prefix all routes with /api/v1
readdirSync('./routes').map(r => app.use('/api/v1', require('./routes/' + r)));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/', async (req, res) => {
  res.send('Welcome to Dooyt');
});

inject();

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Swagger Docs are available at http://localhost:${PORT}/api-docs`);
});

module.exports = app;
