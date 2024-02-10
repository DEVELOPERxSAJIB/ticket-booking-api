const Show = require("../models/Show");
const Theatre = require("../models/Theatre");
const { successResponse, errorResponse } = require("./responseController");

/**
 * @DESC All Theatre
 * @ROUTE /api/v1/theatre/
 * @method GET
 * @access private
 */
const getAllTheatre = async (req, res, next) => {
  try {
    const theatre = await Theatre.find().populate("owner");

    if (theatre.length == 0) {
      return errorResponse(res, {
        statusCode: 404,
        message: "No theatre found",
      });
    }

    successResponse(res, {
      statusCode: 200,
      message: null,
      payload: { theatre },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @DESC All Theatre by owner
 * @ROUTE /api/v1/theatre/get-theatre-by-owner
 * @method GET
 * @access private
 */
const getTheatreByOwner = async (req, res, next) => {
  try {
    const { ownerId } = req.body;

    const theatre = await Theatre.find({ owner: ownerId });

    if (theatre.length == 0) {
      return errorResponse(res, {
        statusCode: 404,
        message: "No theatre found",
      });
    }

    successResponse(res, {
      statusCode: 200,
      message: "Geted all theatres",
      payload: { theatre },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @DESC Create Theatre
 * @ROUTE /api/v1/theatre/create-theatre
 * @method POST
 * @access private
 */
const createTheatre = async (req, res, next) => {
  try {
    const { name, address, phone, email, owner } = req.body;

    if (!name || !address || !phone || !email) {
      return errorResponse(res, {
        statusCode: 404,
        message: "All feilds are required",
      });
    }

    // existing theate check
    const existsTheatre = await Theatre.findOne({ name });
    if (existsTheatre) {
      return errorResponse(res, {
        statusCode: 400,
        message: "Theatre already exists",
      });
    }

    const options = {
      name,
      email,
      address,
      phone,
      owner,
    };

    const theatre = await Theatre.create(options);

    if (!theatre) {
      return errorResponse(res, {
        statusCode: 404,
        message: "Can't create theater",
      });
    }

    successResponse(res, {
      statusCode: 200,
      message: "Theatre created. Pending for approvement",
      payload: { theatre },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @DESC Delete Theatre
 * @ROUTE /api/v1/theatre/delete-theatre/:id
 * @method delete
 * @access private
 */
const deleteTheatre = async (req, res, next) => {
  try {
    const { id } = req.params;

    const theatre = await Theatre.findByIdAndDelete(id);

    successResponse(res, {
      statusCode: 200,
      message: "Theatre deleted",
      payload: { theatre },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @DESC Get Single Theatre
 * @ROUTE /api/v1/theatre/single-theatre/:id
 * @method get
 * @access private
 */
const getSingleTheatre = async (req, res, next) => {
  try {
    const { id } = req.params;

    const theatre = await Theatre.findById(id);

    successResponse(res, {
      statusCode: 200,
      message: "",
      payload: { theatre },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @DESC Theatre Status Updae
 * @ROUTE /api/v1/theatre/change-theatre-status/:id
 * @method PUT
 * @access private
 */
const statusChangeTheatre = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { isActive } = req.body;

    const theatre = await Theatre.findByIdAndUpdate(
      id,
      {
        isActive: !isActive,
      },
      {
        new: true,
      }
    );

    successResponse(res, {
      statusCode: 200,
      message: "Theatre status updated",
      payload: { theatre },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @DESC Unique Theatre Find
 * @ROUTE /api/v1/theatre/find-unique-theatre
 * @method PUT
 * @access private
 */
const findUniqueTheatre = async (req, res, next) => {
  try {
    const { movie, date,  } = req.body;

    // find all show of a movie
    const shows = await Show.find({ movie, date })
      .populate("theatre")
      .sort({ createdAt: -1 });

    // find unique theatres
    let uniqueTheatre = [];

    shows.forEach((show) => {
      const theatre = uniqueTheatre.find(
        (data) => data._id == show.theatre._id
      );

      if (!theatre) {
        const showsForThisTheatre = shows.filter(
          (data) => data.theatre._id == show.theatre._id
        );

        uniqueTheatre.push({
          ...show.theatre._doc,
          show : showsForThisTheatre
        });
      }

    });

    successResponse(res, {
      statusCode: 200,
      message: "Theatre fetched",
      payload: uniqueTheatre,
    });

  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllTheatre,
  createTheatre,
  statusChangeTheatre,
  deleteTheatre,
  getSingleTheatre,
  getTheatreByOwner,
  findUniqueTheatre,
};
