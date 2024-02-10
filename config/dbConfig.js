const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URL);

const connection = mongoose.connection;

connection.on(`connected`, () => {
    console.log(`mongoDB connected successfully`.bgCyan.black);
})

connection.on(`error`, (err) => {
    console.log(`mongodb connection failed :`.bgRed.black.bold, err.message);
} )

module.exports = connection