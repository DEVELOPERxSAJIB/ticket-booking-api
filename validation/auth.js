const { body } = require("express-validator");

const validateUserRegistration = [
  body("name" || "email" || "password" || "gender")
    .notEmpty()
    .withMessage("All feilds are required"),
  body("name")
    .trim()
    .notEmpty()
    .withMessage("name is required")
    .isLength({ min: 3, max: 32 })
    .withMessage("name should contain at least 3 to maximum 32 character"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email address"),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 4, max: 32 })
    .withMessage("password should contain at least 4 to maximum 32 character"),

  body("gender").trim().notEmpty().withMessage("Gender is required"),
];

const validateUserLogin = [
    body("email" || "password")
      .trim()
      .notEmpty()
      .withMessage("All feilds are required"),
    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Invalid email address"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("password is required")
      .isLength({ min: 4, max: 32 })
      .withMessage("password should contain at least 4 to maximum 32 character"),
  ]

module.exports = { validateUserRegistration, validateUserLogin };
