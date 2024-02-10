const { body } = require("express-validator");

const showAddValidator = [
  body(
    "name" ||
      "date" ||
      "time" ||
      "movie" ||
      "ticketPrice" ||
      "totalSeats"
  )
    .notEmpty()
    .withMessage("All feilds are required"),

  body("name").trim().notEmpty().withMessage("Enter a Shows Name"),
  body("date").trim().notEmpty().withMessage("Shows date is required"),
  body("time").trim().notEmpty().withMessage("Add a time of your show"),
  body("movie").trim().notEmpty().withMessage("Please, select a movie"),
  body("ticketPrice").trim().notEmpty().withMessage("Ticket Price is required"),
  body("totalSeats").trim().notEmpty().withMessage("Please, add total seats number"),
];

module.exports = {
    showAddValidator,
};
