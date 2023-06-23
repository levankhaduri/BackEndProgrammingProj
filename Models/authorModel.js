const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  nationality: String,
  birthdate: {
    type: Date,
    required: true
  },  
  description: String,
  gender: {
    type: String,
    enum: ['Male', 'Female'],
    required: true
  }
});

const Author = mongoose.model('Author', authorSchema);

module.exports = Author;
