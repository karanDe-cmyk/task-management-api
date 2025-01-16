const mongoose = require('mongoose');

const mongoUri = process.env.MONGO_URI;

mongoose.connect(mongoUri)
  .then(() => {
    console.log(`Connection successful to mongodb atlas ${mongoose.connection.host}`);
  })
  .catch((err) => {
    console.error('Connection error:', err.message);
  });