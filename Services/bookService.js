const Book = require('../Models/bookModel.js');
const authorService = require('./authorService');

// Function to create a new book
async function createBook(bookData) {
  try {
    // Fetch the author using authorService
    const author = await authorService.getAuthorById(bookData.authorId);

    if (!author) {
    throw new Error('Author not found');
    }

    // Create the book with the author details
    const newBook = new Book({
    title: bookData.title,
    authorId: author._id,
    publicationYear: bookData.publicationYear,
    genre: bookData.genre,
    author: {
        id: author._id,
        name: author.name,
        birthdate: author.birthdate,
        gender: author.gender
    }
    });

    const savedBook = await newBook.save();
    return savedBook;
  } catch (error) {
    throw error;
  }
}

async function getAllBooks() {
  try {
    const books = await Book.find({});
    return books;
  } catch (error) {
    throw error;
  }
}

async function getBookById(bookId) {
  try {
    const book = await Book.findById(bookId);
    return book;
  } catch (error) {
    throw error;
  }
}

async function updateBookById(bookId, updatedData) {
  try {
    const updatedBook = await Book.findByIdAndUpdate(bookId, updatedData, { new: true });
    return updatedBook;
  } catch (error) {
    throw error;
  }
}

async function deleteBookById(bookId) {
  try {
    await Book.findByIdAndDelete(bookId);
    return;
  } catch (error) {
    throw error;
  }
}

async function getBooksByAuthor(authorName) {
    try {
      const books = await Book.find({ 'author.name': { $regex: authorName, $options: 'i' } }).exec();
      return books;
    } catch (error) {
      throw error;
    }
  }
  
  async function getBooksByTitle(title) {
    try {
      const books = await Book.find({ title: { $regex: title, $options: 'i' } }).exec();
      return books;
    } catch (error) {
      throw error;
    }
  }

module.exports = {
  createBook,
  getAllBooks,
  getBookById,
  updateBookById,
  deleteBookById,
  getBooksByTitle,
  getBooksByAuthor
};
