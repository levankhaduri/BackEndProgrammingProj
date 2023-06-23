const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bookService = require('./Services/bookService.js');
const authorService = require('./Services/authorService.js');

const app = express();
const port = 3000;

app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/BooksDB', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
  });

app.post('/books', (req, res) => {
  const bookData = req.body;
  bookService.createBook(bookData)
    .then(createdBook => {
      res.json(createdBook);
    })
    .catch(error => {
      res.status(500).json({ error: 'Failed to create book' });
    });
});

app.get('/books', (req, res) => {
  bookService.getAllBooks()
    .then(books => {
      res.json(books);
    })
    .catch(error => {
      res.status(500).json({ error: 'Failed to retrieve books' });
    });
});

app.get('/books/:id', (req, res) => {
  const bookId = req.params.id;
  bookService.getBookById(bookId)
    .then(book => {
      if (!book) {
        res.status(404).json({ error: 'Book not found' });
      } else {
        res.json(book);
      }
    })
    .catch(error => {
      res.status(500).json({ error: 'Failed to retrieve book' });
    });
});

app.put('/books/:id', (req, res) => {
  const bookId = req.params.id;
  const updatedData = req.body;
  bookService.updateBookById(bookId, updatedData)
    .then(updatedBook => {
      if (!updatedBook) {
        res.status(404).json({ error: 'Book not found' });
      } else {
        res.json(updatedBook);
      }
    })
    .catch(error => {
      res.status(500).json({ error: 'Failed to update book' });
    });
});

app.delete('/books/:id', (req, res) => {
  const bookId = req.params.id;
  bookService.deleteBookById(bookId)
    .then(() => {
      res.sendStatus(204);
    })
    .catch(error => {
      res.status(500).json({ error: 'Failed to delete book' });
    });
});

app.post('/authors', (req, res) => {
  const authorData = req.body;
  authorService.createAuthor(authorData)
    .then(createdAuthor => {
      res.json(createdAuthor);
    })
    .catch(error => {
      res.status(500).json({ error: 'Failed to create author' });
    });
});

app.get('/authors', (req, res) => {
  authorService.getAllAuthors()
    .then(authors => {
      res.json(authors);
    })
    .catch(error => {
      res.status(500).json({ error: 'Failed to retrieve authors' });
    });
});

app.get('/authors/:id', (req, res) => {
  const authorId = req.params.id;
  authorService.getAuthorById(authorId)
    .then(author => {
      if (!author) {
        res.status(404).json({ error: 'Author not found' });
      } else {
        res.json(author);
      }
    })
    .catch(error => {
      res.status(500).json({ error: 'Failed to retrieve author' });
    });
});

app.put('/authors/:id', (req, res) => {
  const authorId = req.params.id;
  const updatedData = req.body;
  authorService.updateAuthorById(authorId, updatedData)
    .then(updatedAuthor => {
      if (!updatedAuthor) {
        res.status(404).json({ error: 'Author not found' });
      } else {
        res.json(updatedAuthor);
      }
    })
    .catch(error => {
      res.status(500).json({ error: 'Failed to update author' });
    });
});

app.delete('/authors/:id', (req, res) => {
  const authorId = req.params.id;
  authorService.deleteAuthorById(authorId)
    .then(() => {
      res.sendStatus(204);
    })
    .catch(error => {
      res.status(500).json({ error: 'Failed to delete author' });
    });
});

app.get('/search', async (req, res) => {
    try {
      const { title, authorName } = req.query;
      
      if (title) {
        const books = await bookService.getBooksByTitle(title);
        res.json(books);
      } else if (authorName) {
        const books = await bookService.getBooksByAuthor(authorName);
        res.json(books);
      } else {
        res.status(400).json({ error: 'Invalid request' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
