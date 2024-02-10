const Show = require("../models/Show");
const { successResponse, errorResponse } = require("./responseController");

/**
 * @DESC Get all Show
 * @ROUTE api/v1/show
 * @method GET
 * @access Private
 */
const getAllShow = async (req, res, next) => {
  try {
    const show = await Show.find().populate("movie");

    successResponse(res, {
      statusCode: 200,
      payload: {
        show,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @DESC Get Show
 * @ROUTE api/v1/show
 * @method POST
 * @access Private
 */
const getAllShowByTheatre = async (req, res, next) => {
  try {
    const { theatreId } = req.body;

    const show = await Show.find({ theatre: theatreId }).populate("movie");

    if (show.length <= 0) {
      return errorResponse(res, {
        statusCode: 400,
        message: "No Shows Found",
      });
    }

    successResponse(res, {
      statusCode: 200,
      message: "Showing all shows",
      payload: {
        show,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @DESC Create Show
 * @ROUTE api/v1/show/create-show
 * @method POST
 * @access Private
 */
// create a show
const createShow = async (req, res, next) => {
  try {
    const { name, date, time, ticketPrice, movie, totalSeats, theatre } =
      req.body;

    const show = await Show.create({
      name,
      date,
      time,
      movie,
      ticketPrice,
      totalSeats,
      theatre,
    });

    await show.populate('movie')

    successResponse(res, {
      statusCode: 200,
      message: "Shows added successfully",
      payload: { show },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @DESC Delete Show
 * @ROUTE api/v1/show/delete-show/:id
 * @method DELETE
 * @access Private
 */
const deleteShowFromTheatre = async (req, res, next) => {
  try {
    const { id } = req.params;

    const show = await Show.findByIdAndDelete(id);

    successResponse(res, {
      statusCode: 200,
      message: "Show successfully deleted",
      payload: {
        show,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createShow,
  getAllShowByTheatre,
  getAllShow,
  deleteShowFromTheatre,
};
