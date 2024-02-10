const Booking = require("../models/Booking");
const Show = require("../models/Show");
const User = require("../models/User");
const { successResponse } = require("./responseController");
const stripe = require("stripe")(process.env.STRIPE_SECRET);

/**
 * @DESC make payment
 * @ROUTE /api/v1/booking/make-payment
 * @method POST
 * @access private
 */
const makePayment = async (req, res, next) => {
  try {
    const { token, amount } = req.body;

    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    // create a charge
    const charge = await stripe.charges.create(
      {
        amount: amount * 100,
        currency: "BDT",
        customer: customer.id,
        description: `purchased the movie tickets`,
      },
      { idempotencyKey: Math.random().toString(36).substring(7) }
    );

    const transactionID = charge.id;

    successResponse(res, {
      statusCode: 200,
      message: "Payment successfull",
      payload: transactionID,
    });
  } catch (error) {
    console.log(error.message);
  }
};

/**
 * @DESC book ticket
 * @ROUTE /api/v1/booking/book-show
 * @method POST
 * @access private
 */
const bookShowTickets = async (req, res, next) => {
  try {
    const { show, seats, transactionId, user } = req.body;

    // save booking
    const newBooking = await Booking.create({
      show,
      seats,
      transactionId,
      user,
    });

    // update seat
    const findShow = await Show.findById(show);

    await Show.findByIdAndUpdate(req.body.show, {
      bookedSeats: [...findShow.bookedSeats, ...req.body.seats],
    });

    // update user
    const findUser = await User.findById(user);

    await User.findByIdAndUpdate(user, {
      $push: { ...findUser.userBookings, userBookings: newBooking._id },
    });

    successResponse(res, {
      statusCode: 201,
      message: "Seat booked successfully",
      payload: newBooking,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @DESC booked data for user
 * @ROUTE /api/v1/booking/user-booked-show
 * @method POST
 * @access private
 */
const userBookedShows = async (req, res, next) => {
  try {
    const user = req.user;

    const booking = await Booking.find({ user: user._id })
      .populate({
        path: "user",
        select: "-password",
      })
      .populate("show")
      .populate({
        path: "show",
        populate: {
          path: "movie",
          model: "Movie",
        },
      })
      .populate({
        path: "show",
        populate: {
          path: "theatre",
          model: "Theatre",
        },
      });

    successResponse(res, {
      statusCode: 200,
      message: null,
      payload: booking,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  makePayment,
  bookShowTickets,
  userBookedShows,
};
