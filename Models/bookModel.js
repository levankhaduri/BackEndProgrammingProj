const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true
    },
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Author',
      required: true
    },
    publicationYear: {
      type: Number,
      required: true
    },
    genre: {
      type: String,
      enum: ['Sports', 'Detective', 'Fantasy', 'Horror'],
      required: true
    },
    author: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author',
        required: true
      },
      name: {
        type: String,
        required: true
      },
      birthdate: {
        type: Date,
        required: true
      },
      gender: {
        type: String,
        enum: ['Male', 'Female'],
        required: true
      }
    }
  });
  

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;