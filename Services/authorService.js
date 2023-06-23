const Author = require('../Models/authorModel.js');

async function createAuthor(authorData) {
  try {
    const newAuthor = new Author(authorData);
    const savedAuthor = await newAuthor.save();
    return savedAuthor;
  } catch (error) {
    throw error;
  }
}

async function getAllAuthors() {
  try {
    const authors = await Author.find({});
    return authors;
  } catch (error) {
    throw error;
  }
}

async function getAuthorById(authorId) {
  try {
    const author = await Author.findById(authorId);
    return author;
  } catch (error) {
    throw error;
  }
}

async function updateAuthorById(authorId, updatedData) {
  try {
    const updatedAuthor = await Author.findByIdAndUpdate(authorId, updatedData, { new: true });
    return updatedAuthor;
  } catch (error) {
    throw error;
  }
}

async function deleteAuthorById(authorId) {
  try {
    await Author.findByIdAndDelete(authorId);
    return;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createAuthor,
  getAllAuthors,
  getAuthorById,
  updateAuthorById,
  deleteAuthorById
};