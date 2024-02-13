const User = require("../models/User");
const errorHandler = require("http-errors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { successResponse, errorResponse } = require("./responseController");

/**
 * @DESC Registration of user
 * @ROUTE /api/v1/user/register
 * @method POST
 * @access public
 */
const userRegister = async (req, res, next) => {
  try {
    const { name, email, password, confirmPassword, phone, gender } = req.body;

    // existing mail check
    const checkMail = await User.findOne({ email });

    if (checkMail) {
      return errorResponse(res, {
        statusCode: 400,
        message: "User with this mail already registered. please login.",
      });
    }

    // phone number check
    const checkPhone = await User.findOne({ phone });
    if (checkPhone) {
      return errorResponse(res, {
        statusCode: 400,
        message: "user with this phone already exists. please login.",
      });
    }

    if (gender == "undifinde") {
      return errorResponse(res, {
        statusCode: 400,
        message: "Please, Select Your Gender",
      });
    }
    // confirm password match
    if (password !== confirmPassword.toString()) {
      return errorResponse(res, {
        statusCode: 400,
        message:
          "confirm password is incorrect. please enter the right password",
      });
    }

    const data = {
      name,
      email,
      password,
      confirmPassword,
      phone,
      gender,
    };

    // create user
    const user = await User.create(data);

    // res send
    successResponse(res, {
      statusCode: 200,
      message: "user register successfully. Login Here",
      payload: { user },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @DESC User Login
 * @ROUTE /api/v1/user/login
 * @method POST
 * @access public
 */
const userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw errorHandler(400, "all feilds are required");
    }

    // validate email
    const validateEmail = await User.findOne({ email });

    if (!validateEmail) {
      throw errorHandler(404, "user with this email is not found");
    }

    // match password
    const matchPass = bcrypt.compareSync(password, validateEmail.password);
    if (!matchPass) {
      throw errorHandler(400, "wrong password. please try again");
    }

    // generate accessToken
    const accessToken = jwt.sign(
      {
        email: validateEmail.email,
      },
      process.env.JWT_ACCESS_TOKEN_LOGIN,
      {
        expiresIn: "7d",
      }
    );

    // set token to cookie memory as accessToken
    res
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.ENV_MODE === "Development" ? false : true,
        sameSite: "strict",
        path: "/",
        maxAge: 1000 * 60 * 60 * 24 * 7,
      })
      .status(200)
      .json({
        token: accessToken,
        message: "user successfully logged in",
        payload: { user: validateEmail },
      });

  } catch (error) {
    next(error);
  }
};

/**
 * @DESC User LogOut
 * @ROUTE /api/v1/user/logout
 * @method POST
 * @access private
 */
const userLogOut = (req, res, next) => {
  try {
    res.clearCookie("accessToken");

    // send res
    successResponse(res, {
      statusCode: 200,
      message: "logged out",
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @DESC LoggedIn User Data
 * @ROUTE /api/v1/user/me
 * @method GET
 * @access private
 */
const loggedInUser = (req, res, next) => {
  res.json({ user: req.user });
};

module.exports = {
  userRegister,
  userLogin,
  loggedInUser,
  userLogOut,
};
