const { mongo } = require('mongoose');
const mongoose = require('../db/conn');
const {Schema } = mongoose;

const Movie = mongoose.model(
  'Movie',
  new Schema({
    name: {
      type: String,
      required: true
    },

    year: {
      type: Number,
      required: true
    },

    genre: {
      type: String,
      required: true
    },
    user: Object
  }, {timestamps: true})
);

module.exports = Movie