const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

// Import your routers here

const connectDB = require('./config/db');

connectDB();

var app = express();
dotenv.config();

const usersRoutes = require('./routes/userRoutes');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Use your routers here
app.use('/',usersRoutes);


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('Connected!'))
  .catch((error) => console.log('error', error));

module.exports = app;
