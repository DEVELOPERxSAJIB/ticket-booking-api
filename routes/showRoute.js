const express = require("express");
const verifyToken = require("../helper/verifyToken");
const {
  createShow,
  getAllShowByTheatre,
  getAllShow,
  deleteShowFromTheatre,
} = require("../controllers/showController");
const { showAddValidator } = require("../validation/show");
const { runValidation } = require("../validation");

// init router
const showRoute = express.Router();
showRoute.use(verifyToken);

// routes
showRoute.get("/", getAllShow);
showRoute.post("/", getAllShowByTheatre);
showRoute.post("/create-show", showAddValidator, runValidation, createShow);
showRoute.delete("/delete-show/:id", deleteShowFromTheatre);

// export user routes
module.exports = showRoute;
