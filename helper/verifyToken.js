const { errorResponse } = require("../controllers/responseController");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const verifyToken = (req, res, next) => {
  try {
    // const token = req.headers.Authorization || req.headers.authorization;
    // const accessToken = token.replace("Bearer ", "")

    const { accessToken } = req.cookies

    if (!accessToken) {
      return errorResponse(res, {
        statusCode: 404,
        message: "Unauthorized",
      });
    }

    jwt.verify(
      accessToken,
      process.env.JWT_ACCESS_TOKEN_LOGIN,
      async (err, decode) => {
        if (err) {
          return errorResponse(res, {
            statusCode: 404,
            message: "Invalid Token",
          });
        }

        const user = await User.findOne({ email: decode.email }).select(
          "-password"
        );

        req.user = user;

        next();
      }
    );
  } catch (error) {
    next(error);
  }
};

module.exports = verifyToken;
