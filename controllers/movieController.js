const Movie = require("../models/Movie");
const { successResponse, errorResponse } = require("./responseController");

/**
 * @DESC Get Movies
 * @ROUTE /api/v1/movie/all-movie
 * @method GET
 * @access private
 */
const getAllMovies = async (req, res, next) => {
  try {
    const movie = await Movie.find();

    if (!movie) {
      errorResponse(res, {
        statusCode: 404,
        message: "can't get all movies",
      });
    }

    successResponse(res, {
      statusCode: 200,
      message: null,
      payload: { movie },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @DESC Get single Movie
 * @ROUTE /api/v1/movie/single-movie
 * @method GET
 * @access private
 */
const getSingleMovies = async (req, res, next) => {
  try {
    const id = req.params.id;

    const movie = await Movie.findById(id);

    if (!movie) {
      errorResponse(res, {
        statusCode: 404,
        message: "Can't get your movie",
      });
    }

    successResponse(res, {
      statusCode: 200,
      message: "Single movie found",
      payload: { movie },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @DESC Add Movie
 * @ROUTE /api/v1/movie/create-movie
 * @method POST
 * @access private
 */
const createMovie = async (req, res, next) => {
  try {
    const {
      title,
      description,
      duration,
      language,
      releaseDate,
      ganre,
      poster,
      category,
      actors,
      banner,
      trailer
    } = req.body;

    const data = {
      title,
      description,
      duration,
      language,
      releaseDate,
      ganre,
      poster,
      category,
      actors,
      banner,
      trailer
    };

    const existsMovie = await Movie.findOne({ title });
    if (existsMovie) {
      return errorResponse(res, {
        statusCode: 200,
        message: "This movie already exists",
      });
    }

    const movie = await Movie.create(data);

    successResponse(res, {
      statusCode: 200,
      message: "Movie added successfully",
      payload: { movie },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @DESC Update Movie
 * @ROUTE /api/v1/movie/update-movie
 * @method put
 * @access private
 */
const updateMovie = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      duration,
      language,
      releaseDate,
      ganre,
      poster,
      category,
      actors,
    } = req.body;

    const data = {
      title,
      description,
      duration,
      language,
      releaseDate,
      ganre,
      poster,
      category,
      actors,
    };

    const existsMovie = await Movie.findById(id);

    if (!existsMovie) {
      return errorResponse(res, {
        statusCode: 200,
        message: "No movie found",
      });
    }

    const movie = await Movie.findByIdAndUpdate(
      id,
      {
        ...data,
      },
      { new: true }
    );

    successResponse(res, {
      statusCode: 200,
      message: "Movie updated successfully",
      payload: { movie },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @DESC Delete Movie
 * @ROUTE /api/v1/movie/delete-movie
 * @method DELETE
 * @access private
 */
const deleteMovie = async (req, res, next) => {
  try {
    const { id } = req.params;

    const movie = await Movie.findByIdAndDelete(id);

    successResponse(res, {
      statusCode: 200,
      message: "Movie Deleted",
      payload: { movie },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllMovies,
  createMovie,
  updateMovie,
  deleteMovie,
  getSingleMovies
};
