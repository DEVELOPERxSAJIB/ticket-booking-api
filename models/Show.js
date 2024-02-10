const mongoose = require("mongoose");

const showSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  date: {
    type: Date,
    trim: true,
    required: true,
  },
  time: {
    type: String,
    trim: true,
    required: true,
  },
  movie: {
    type: mongoose.Schema.Types.ObjectId,
    ref : "Movie",
  },
  ticketPrice: {
    type: Number,
    trim: true,
    required: true,
  },
  totalSeats: {
    type: Number,
    trim: true,
    required: true,
  },
  bookedSeats: {
    type: Array,
    default : []
  },
  theatre : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "Theatre",
  }
});

module.exports = mongoose.model("Show", showSchema)