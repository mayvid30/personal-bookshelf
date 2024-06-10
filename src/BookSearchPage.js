// src/BookSearchPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BookSearchPage.css';

const BookSearchPage = ({ addToBookshelf }) => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [defaultBooks, setDefaultBooks] = useState([]);

  useEffect(() => {
    const fetchDefaultBooks = async () => {
      try {
        const response = await axios.get('https://openlibrary.org/search.json?q=javascript&limit=10&page=1');
        setDefaultBooks(response.data.docs);
      } catch (error) {
        console.error('Error fetching default books:', error);
      }
    };

    fetchDefaultBooks();
  }, []);

  const handleSearch = async (e) => {
    const query = e.target.value;
    setQuery(query);

    if (query.length > 0) {
      try {
        const response = await axios.get(`https://openlibrary.org/search.json?q=${query}&limit=10&page=1`);
        setSearchResults(response.data.docs);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    } else {
      setSearchResults([]);
    }
  };

  const booksToDisplay = query.length > 0 ? searchResults : defaultBooks;

  return (
    <div>
      <input type="text" value={query} onChange={handleSearch} placeholder="Search for a book..." />
      <div className="book-cards-container">
        {booksToDisplay.map((book) => (
          <div className="book-card" key={book.key}>
            <div className="book-title">{book.title}</div>
            <button onClick={() => addToBookshelf(book)}>Add to Bookshelf</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookSearchPage;
