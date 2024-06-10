
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import BookSearchPage from './BookSearchPage';
import PersonalBookshelfPage from './PersonalBookshelfPage';
import './App.css';

const App = () => {
  const [bookshelf, setBookshelf] = useState([]);

  useEffect(() => {
    const storedBookshelf = JSON.parse(localStorage.getItem('bookshelf')) || [];
    setBookshelf(storedBookshelf);
  }, []);

  const addToBookshelf = (book) => {
    const updatedBookshelf = [...bookshelf, book];
    setBookshelf(updatedBookshelf);
    localStorage.setItem('bookshelf', JSON.stringify(updatedBookshelf));
  };

  return (
    <Router>
      <div className="app">
        <nav>
          <Link to="/">Search Books</Link>
          <Link to="/bookshelf">My Bookshelf</Link>
        </nav>
        <Routes>
          <Route
            path="/"
            element={<BookSearchPage addToBookshelf={addToBookshelf} />}
          />
          <Route
            path="/bookshelf"
            element={<PersonalBookshelfPage bookshelf={bookshelf} setBookshelf={setBookshelf} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
