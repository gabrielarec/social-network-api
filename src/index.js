const express = require("express");
const app = express();
const PORT = 2000;

//MONGODB CONNECTION
require("./db/connection");

const userRoutes = require("./routes/user");
const thoughtRoutes = require("./routes/thought");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("social network api is up and running !!!");
});

app.use("/api", userRoutes);
app.use("/api", thoughtRoutes);

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
