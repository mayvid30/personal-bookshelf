
import React from 'react';
import './PersonalBookshelfPage.css';

const PersonalBookshelfPage = ({ bookshelf, setBookshelf }) => {
  const removeFromBookshelf = (bookToRemove) => {
    const updatedBookshelf = bookshelf.filter((book) => book.key !== bookToRemove.key);
    setBookshelf(updatedBookshelf);
    localStorage.setItem('bookshelf', JSON.stringify(updatedBookshelf));
  };

  return (
    <div>
      <h2>My Bookshelf</h2>
      <div className="book-cards-container">
        {bookshelf.map((book) => (
          <div className="book-card" key={book.key}>
            <div className="book-title">{book.title}</div>
            <button onClick={() => removeFromBookshelf(book)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PersonalBookshelfPage;
