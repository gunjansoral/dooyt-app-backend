const express = require('express');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swaggerOptions');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const { readdirSync } = require('fs');
const { inject } = require("@vercel/analytics");

const PORT = process.env.PORT || '3000';

const app = express();

const MONGODB_URI = process.env.MONGODB_URI

// Parse URL-encoded form data
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// app.use(cookieParser());

// CORS configuration
app.use(
  cors({
    origin: '*',
    // methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    // credentials: true,
  })
);

// Connect to MongoDB
mongoose.connect(MONGODB_URI);

mongoose.connection.on("connected", () => {
  console.log("Database is connected");
});

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

// Default route
app.get("/", (req, res) => {
  res.send("Welcome to the university management App");
});

// Routes - Prefix all routes with /api/v1
readdirSync('./routes').map(r => app.use('/api/v1', require('./routes/' + r)));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

inject();

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Swagger Docs are available at http://localhost:${PORT}/api-docs`);
});

module.exports = app;

