const { body } = require("express-validator");

const movieSaveValidator = [
  body(
    "title" ||
      "description" ||
      "duaration" ||
      "language" ||
      "releaseDate" ||
      "ganre" ||
      "poster" ||
      "category" ||
      "actors"
  )
    .notEmpty()
    .withMessage("All feilds are required"),

  body("title").trim().notEmpty().withMessage("Movie Title is required"),
  body("description").trim().notEmpty().withMessage("Description is required"),
  body("duration").trim().isNumeric().withMessage("Duration must be a number").notEmpty().withMessage("Duration is required"),
  body("language").trim().notEmpty().withMessage("please, select a language"),
  body("releaseDate").trim().notEmpty().withMessage("Release Date is required"),
  body("actors").trim().notEmpty().withMessage("cast names are rquired"),
  body("ganre").trim().notEmpty().withMessage("please, select a ganre"),
  body("category").trim().notEmpty().withMessage("please, select a category"),
  body("poster").trim().notEmpty().withMessage("please, add a movie poster"),
];

module.exports = {
  movieSaveValidator,
};
