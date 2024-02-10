const express = require("express");
const verifyToken = require("../helper/verifyToken");
const {
  createMovie,
  getAllMovies,
  deleteMovie,
  updateMovie,
  getSingleMovies,
} = require("../controllers/movieController");
const { movieSaveValidator } = require("../validation/movie");
const { runValidation } = require("../validation");

// init router
const movieRoute = express.Router();

// routes
movieRoute.post(
  "/create-movie",
  movieSaveValidator,
  runValidation,
  verifyToken,
  createMovie
);
movieRoute.get("/all-movies", verifyToken, getAllMovies);
movieRoute.get("/single-movie/:id", getSingleMovies);
movieRoute.delete("/delete/:id", verifyToken, deleteMovie);
movieRoute.put("/update-movie/:id", verifyToken, updateMovie);

// export user routes
module.exports = movieRoute;
