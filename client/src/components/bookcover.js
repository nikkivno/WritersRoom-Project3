import React from 'react';

const BookCover = ({ title, author, coverUrl }) => {
  return (
    <div className="book-cover">
      <img src={coverUrl} alt={`Cover for ${title}`} />
      <h2>{title}</h2>
      <p>Author: {author}</p>
    </div>
  );
};

export default BookCover;