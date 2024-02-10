const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      unique: true,
      validate: {
        validator: function (v) {
          return /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(v);
        },
        message: "please, enter a valide email address",
      },
    },
    phone: {
      type: String,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      trim: true,
      minlength: [4, "password can't less then 4 charecter"],
      set: (v) => bcrypt.hashSync(v, bcrypt.genSaltSync(10)),
    },
    gender: {
      type: String,
      enum: ["male", "female", "others", "undifined"],
      required: [true, "Gender is required"],
    },
    image: {
      type: String,
      default: null,
    },
    userBookings: [{
      type : mongoose.Schema.Types.ObjectId,
      ref : "Booking",
    }],
    isAdmin: {
      type: Boolean,
      default: false,
    },
    status: {
      type: Boolean,
      default: false,
    },
    trash: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// export schema
module.exports = mongoose.model("User", userSchema);
