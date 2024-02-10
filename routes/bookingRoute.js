const express = require("express");
const verifyToken = require("../helper/verifyToken");
const {
  makePayment,
  bookShowTickets,
  userBookedShows,
} = require("../controllers/bookingController");

// init router
const bookingRoute = express.Router();
bookingRoute.use(verifyToken);

// routes
bookingRoute.post("/make-payment", makePayment);
bookingRoute.post("/book-show", bookShowTickets);
bookingRoute.get("/user-booked-shows", userBookedShows);

// export user routes
module.exports = bookingRoute;
