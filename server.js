require("dotenv").config();
require("colors");
const express = require("express");
const errorHandaler = require("http-errors");
const connection = require("./config/dbConfig");
const userRoute = require("./routes/userRoute");
const movieRoute = require("./routes/movieRoute.js");
const theatreRoute = require("./routes/theatreRoute");
const showRoute = require("./routes/showRoute");
const { errorResponse } = require("./controllers/responseController");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const bookingRoute = require("./routes/bookingRoute.js");

// init app
const app = express();

// init express middlewares
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: [
      "https://ticket-booking-client-chi.vercel.app",
      "http://localhost:5173",
    ],
    credentials: true,
  })
);


// routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/movie", movieRoute);
app.use("/api/v1/theatre", theatreRoute);
app.use("/api/v1/show", showRoute);
app.use("/api/v1/booking", bookingRoute);

// error handaling middlewares
app.use((req, res, next) => {
  next(errorHandaler(404, "Routes Not found"));
});

// server error handler -> all kind of error
app.use((err, req, res, next) => {
  errorResponse(res, { statusCode: err.status, message: err.message });
});

// init port
const PORT = process.env.PORT;

// server listen
app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`.bgBlue.black);
  connection;
});
