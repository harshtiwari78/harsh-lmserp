import React, { useState } from 'react';
import axios from 'axios';

const AddBook = () => {
  const [bookData, setBookData] = useState({
    BibNum: '',
    Title: '',
    ItemCount: '',
    Author: '',
    ISBN: '',
    Publisher: '',
    Genre: ''
  });

  const handleChange = (e) => {
    setBookData({ ...bookData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/add-new-book', bookData);
      alert('Book added successfully');
      setBookData({
        BibNum: '',
        Title: '',
        ItemCount: '',
        Author: '',
        ISBN: '',
        Publisher: '',
        Genre: ''
      });
    } catch (error) {
      console.error('Error adding book:', error);
      alert('Failed to add book');
    }
  };

  return (
    <div>
      <h2>Add New Book</h2>
      <form onSubmit={handleSubmit}>
        {/* Add input fields for each book property */}
        <input name="BibNum" value={bookData.BibNum} onChange={handleChange} placeholder="BibNum" required />
        <input name="Title" value={bookData.Title} onChange={handleChange} placeholder="Title" required />
        {/* Add more input fields for other properties */}
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
};

export default AddBook;