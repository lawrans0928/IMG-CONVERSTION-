const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const imageRoutes = require("./routes/image.routes");

const app = express();

app.use(helmet());
app.use(cors({
  origin: process.env.CLIENT_URL || "*",
  methods: ["GET", "POST"],
}));

app.use(express.json());

// health check
app.get("/", (req, res) => {
  res.send("API is running");
});

app.use("/api", imageRoutes);

// error middleware MUST be last
const errorHandler = require("./middlewares/error.middleware");
app.use(errorHandler);

module.exports = app;
