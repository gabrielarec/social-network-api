const mongoose = require("mongoose");

const DB = "mongodb://localhost:27017/social-network-api";

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Database connected!");
  })
  .catch((err) => console.log("Database not connected"));
