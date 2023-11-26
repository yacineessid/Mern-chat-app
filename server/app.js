const express = require('express');
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const routerUsers = require('./routes/users.routes');
const chatRoutes=require('./routes/chatRoutes')
const messageRoutes=require('./routes/messageRoute')
// Define your custom middleware function
const customMiddleware = (req, res, next) => {
  // Your middleware logic here
  console.log('Custom middleware is running');
  next(); // Don't forget to call next to continue to the next middleware or route handler
};

// Connect to the database
mongoose.connect(process.env.MONGO_URI,
   {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,  // Adjust the timeout value
  })
  .then(() => console.log('DB connected'))
  .catch(err => console.error(err, 'error connection'));

// Enable CORS
app.use(cors());

// Parse JSON requests
app.use(express.json());

// Use your custom middleware
app.use(customMiddleware);

// API routes
app.use('/api', routerUsers);
app.use('/api/chat', chatRoutes);
app.use('/api/message', messageRoutes);


app.get('/', (req, res) => {
  res.send('Hello World!');
});

const PORT = process.env.PORT || 3701;

const server = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

module.exports = server;
