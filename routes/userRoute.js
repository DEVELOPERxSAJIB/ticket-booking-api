const express = require("express");
const { userRegister, userLogin, loggedInUser, userLogOut} = require("../controllers/userController");
const { validateUserRegistration, validateUserLogin} = require("../validation/auth");
const { runValidation } = require("../validation");
const verifyToken = require("../helper/verifyToken");

// init router
const userRoute = express.Router();

// routes
userRoute.post("/register", validateUserRegistration, runValidation, userRegister);
userRoute.post("/login", validateUserLogin, runValidation, userLogin);
userRoute.get("/me", verifyToken, loggedInUser)
userRoute.post("/logout", userLogOut)

// export user routes
module.exports = userRoute;
