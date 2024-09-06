// models/bookRequest.js
const mongoose = require('mongoose');

const bookRequestSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('BookRequest', bookRequestSchema);

// bookapi.js
const BookRequest = require('../models/bookRequest');

exports.requestBook = async (req, res) => {
  try {
    const { bookId } = req.body;
    const { user } = req;

    const newRequest = new BookRequest({
      user: user._id,
      book: bookId
    });

    await newRequest.save();
    return res.status(200).json({ msg: "Book request submitted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};